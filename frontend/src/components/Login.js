import { useState, useEffect } from "react";

function Login(props) {
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
    props.auth(email, pass);
  }

  useEffect(()=>{
    setEmail("");
    setPass("");
  },[])

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Войти</h2>
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
        <span className="name-input-error popup__input-error"></span>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
