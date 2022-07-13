function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__close popup__close_type_${props.name}`}
          onClick={props.onClose}
        ></button>
        <form
          action="/"
          method="post"
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className={`popup__title popup__title_type_${props.name}`}>
            {props.title}
          </h2>
          {props.children}
          <button
            type="submit"
            className={`popup__submit popup__submit_type_${props.name}`}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
