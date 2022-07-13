function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_open-pic ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container-pic">
        <button
          type="button"
          className="popup__close popup__close_type_open-pic"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__pic popup__pic_type_open-pic"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__title popup__title_type_open-pic">
          {props.card.name}
        </p>
      </div>
    </div>
  );
}
export default ImagePopup;
