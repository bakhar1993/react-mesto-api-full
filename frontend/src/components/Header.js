import { Link, useHistory, withRouter } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn ? (
        <div className="header__info">
          {" "}
          <p className="header__email">{props.email}</p>{" "}
          <button className="header__link" onClick={props.outProfile}>
            {" "}
            Выйти{" "}
          </button>
        </div>
      ) : (
        <>
          {history.location.pathname === "/sign-in" ? (
            <Link className="header__link" to="/sign-up">
              {" "}
              Регистрация{" "}
            </Link>
          ) : (
            <Link className="header__link" to="/sign-in">
              {" "}
              Войти{" "}
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default withRouter(Header);
