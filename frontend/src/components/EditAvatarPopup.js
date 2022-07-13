import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Обновить аватар"}
      onSubmit={handleSubmit}
      name={"edit_avatar"}
    >
      {
        <>
          <input
            ref={avatarRef}
            id="avatar-input"
            type="url"
            name="avatar"
            className="popup__input popup__input_type-avatar-edit"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="avatar-input-error popup__input-error"></span>
        </>
      }
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
