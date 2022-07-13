import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function changeName(evt) {
    setName(evt.target.value);
  }

  function changeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Редактировать профиль"}
      onSubmit={handleSubmit}
      name = {'edit_profile'}
    >
      {
        <>
          <input
            id="name-input"
            type="text"
            name="name"
            className="popup__input popup__input_type-name"
            onChange={changeName}
            value={name || ""}
            required
          />
          <span className="name-input-error popup__input-error"></span>
          <input
            id="job-input"
            type="text"
            name="about"
            className="popup__input popup__input_type-job"
            onChange={changeDescription}
            value={description || ""}
            required
          />
          <span className="job-input-error popup__input-error"></span>
        </>
      }{" "}
    </PopupWithForm>
  );
}
export default EditProfilePopup;
