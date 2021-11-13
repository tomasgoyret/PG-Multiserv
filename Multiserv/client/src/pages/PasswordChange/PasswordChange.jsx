import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import { FcGoogle } from "react-icons/fc";
import { AiFillCaretRight } from "react-icons/ai";
//_----------------------------------------------------------------------------------------
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Button from '../../Components/Atoms/Button/Button';
function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // Localizar la interfaz de usuario al idioma seleccionado según lo determine el idioma
  // parameter.
  // Verify the password reset code is valid.
  // Verifique que el código de restablecimiento de contraseña sea válido.
  verifyPasswordResetCode(auth, actionCode).then((email) => {
    const accountEmail = email;
    // TODO: Show the reset screen with the user's email and ask the user for
    // TODO: Mostrar la pantalla de reinicio con el correo electrónico del usuario y pedirle al usuario
    // the new password.
    const newPassword = "...";
    // Save the new password.
    confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
      // Password reset has been confirmed and new password updated.
      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      // auth.signInWithEmailAndPassword(accountEmail, newPassword);
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch((error) => {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
    });
  }).catch((error) => {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
  });
}
//_----------------------------------------------------------------------------------------
const PasswordChange = () => {
    // const [input, setInput] = useState({
    //     //correo: "",
    //     user_mail:"",
    //     user_password:"",
    //     user_newPassword:""
    // })
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  //____________-capturar
  const handleMail = (text) => {
    setMail(text)
  }
  const handlePassword = (text) => {
    setPassword(text)
  }
  const handleNewPassword = (text) => {
    setNewPassword(text)
  }
  //________________________________________
  const handleSubmit = (e) => {
    e.preventDefault()
alert('correo: ' + mail)
}

    return (
        <div>
            <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div className="px-4 pt-6 pb-4">
                 <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Cambiar Contraseña!</h1>
            </div>
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg transition-all ease-out duration-300">
            <form onSubmit={handleSubmit}>
                <div  className="self-center">

              <Input
                label='Correo'
                type="text"
                flexed
                id="user_mail"
                theme="#3730A3"
                placeholder="Escribe tu correo"
                callBack={handleMail}
              />
              </div>
        <div className="self-center">
              <Input
                flexed
                label="contraseña"
                type="password"
                    id="user_password"
                    theme="#3730A3"
                placeholder="Escribe tu contraseña actual"
                callBack={handlePassword}
                    />
                </div>
                <div className="self-center">
              <Input
                label="Nueva contraseña"
                type="password"
                flexed
                    id="user_newPassword"
                    theme="#3730A3"
                    placeholder="Escribe tu nueva contraseña " 
                callBack={handleNewPassword}
              />
                </div>
            <Button
              submit
              full
              icon={<AiFillCaretRight className="mr-2" />}

              type="standard"
              text="Enviar"
            />
                </form>
   

            </div>
         </div>
        </div>
    )
}
export default PasswordChange
