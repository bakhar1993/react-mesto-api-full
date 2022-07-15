import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { getContent, authorize, register } from "../utils/Auth";
import resOk from "../images/reg-ok.svg";
import resErr from "../images/reg-err.svg";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [infoMessage, setInfoMessage] = React.useState({
    image: resOk,
    title: "Вы успешно зарегистрировались!",
  });

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }
  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      getContent(token)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((error) => console.log(error));
    }
  }
  function outProfile() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  function auth(email, pass) {
    authorize(email, pass)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((error) => console.log(error));
  }

  // Регистрация
  function reg(email, pass) {
    register(email, pass)
      .then((res) => {
        if (!res.ok) {
          setInfoMessage({
            image: resErr,
            title: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          setIsInfoTooltipOpen(true);
        } else {
          setInfoMessage({
            image: resOk,
            title: "Вы успешно зарегистрировались!",
          });
          setIsInfoTooltipOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    loggedIn && uploadDate();
  }, [loggedIn]);

  //Загрузка данных юзера и карточек
  function uploadDate() {
    const token = localStorage.getItem("token");
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(error));
    api
      .getInitialCards(token)
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    const token = localStorage.getItem("token");
    api
      .setUserInfo({ userData },token)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }
  function handleUpdateAvatar(data) {
    const token = localStorage.getItem("token");
    api
      .editAvatar(data,token)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar  });
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleAddCard(data) {
    const token = localStorage.getItem("token");
    api
      .addCards(data,token)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const token = localStorage.getItem("token");
    api
      .changeLikeCardStatus(card._id, !isLiked,token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem("token");
    api
      .deleteCard(card._id,token)
      .then(() => {
        setCards((state) => state.filter((elem) => elem !== card));
      })
      .catch((error) => console.log(error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header loggedIn={loggedIn} email={email} outProfile={outProfile} />
        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          ></ProtectedRoute>

          <Route path="/sign-in">
            <Login auth={auth} />
          </Route>

          <Route path="/sign-up">
            <Register reg={reg} />
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={infoMessage}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
