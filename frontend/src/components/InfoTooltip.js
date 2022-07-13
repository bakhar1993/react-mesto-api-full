function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_type_info">
        <button
          type="button"
          className={`popup__close popup__close_type_info`}
          onClick={props.onClose}
        ></button>

        <img src={props.message.image} alt="Статус"></img>
        <h2 className={`popup__title popup__title_type_info`}>
          {props.message.title}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
