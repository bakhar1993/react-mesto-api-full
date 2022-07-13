import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function changeEmail(evt) {
    setEmail(evt.target.value);
  }

  function changePass(evt) {
    setPass(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.reg(email, pass);
  }

  useEffect(()=>{
    setEmail("");
    setPass("");
  },[])

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input
          id="email-input"
          type="email"
          name="email"
          className="popup__input popup__input_type-name popup__input_type_auth"
          onChange={changeEmail}
          value={email || ""}
          placeholder="Email"
          required
        />
        <span className="email-input-error popup__input-error"></span>
        <input
          id="pass-input"
          type="password"
          name="pass"
          className="popup__input popup__input_type-job popup__input_type_auth"
          onChange={changePass}
          value={pass || ""}
          placeholder="Пароль"
          required
        />
        <span className="pass-input-error popup__input-error"></span>

        <button type="submit" className="auth__submit">
          Зарегистрироваться
        </button>
        <Link to={"/sign-in"} className={"auth__link"}>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
