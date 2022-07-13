import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [url, setUrl] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      link: url,
      name: place,
    });
  }
  React.useEffect(() => {
    setPlace("");
    setUrl("");
  }, [props.isOpen]);

  function changePlace(evt) {
    setPlace(evt.target.value);
  }

  function changeUrl(evt) {
    setUrl(evt.target.value);
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      onSubmit={handleSubmit}
      name = {'add_card'}
    >
      {
        <>
          {" "}
          <input
            id="place-input"
            type="text"
            name="name"
            className="popup__input popup__input_type-place"
            placeholder="Название"
            onChange={changePlace}
            value={place}
            required
          />
          <span className="place-input-error popup__input-error"></span>
          <input
            id="url-input"
            type="url"
            name="link"
            className="popup__input popup__input_type-link"
            placeholder="Ссылка на картинку"
            onChange={changeUrl}
            value={url}
            required
          />
          <span className="url-input-error popup__input-error"></span>
        </>
      }
    </PopupWithForm>
  );
}

export default AddPlacePopup;
