import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};
export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const loginSybmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticacion", errorMessage.msg, "error");
    }
  }, [errorMessage]);

  return (
    <div className="contenedorPrincipal">
      <div className="contenedorPadre">
        <div className="contenedorHijo">
          <div className="contenedorIzquierda">
            <div className="condivtitle">
              <span className="titleTec">TECNOGENIA</span>
              <span className="titleTecGe">Tecnologia Genial</span>
            </div>
          </div>
          <div className="contenedorDerecha">
            <form className="login-form" onSubmit={loginSybmit}>
              <span className="login-form-title">Inicio Sesion</span>
              <div className="wrap-input">
                <input
                  className="input"
                  type="text"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  placeholder="Usuario"
                  required
                />
                <span className="focus-input"></span>
                <span className="symbol-input">
                  <FaUser className="" />
                </span>
              </div>
              <div className="wrap-input">
                <input
                  type="password"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  className="input"
                  placeholder="Contraseña"
                  required
                />
                <span className="focus-input"></span>
                <span className="symbol-input">
                  <RiLockPasswordFill className="" />
                </span>
              </div>
              <div className="login-form-btn-container">
                <button type="submit" className="login-form-btn">
                  Iniciar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
