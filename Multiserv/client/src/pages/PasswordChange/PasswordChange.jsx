import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
//import Button from '../../Components/Atoms/Button/Button'
//_----------------------------------------------------------------------------------------
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
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
    const [input, setInput] = useState({
        //correo: "",
        user_mail:"",
        user_password:"",
        user_newPassword:""
    })
    function handleChange(e) {
      setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }

      //________________________________________
      async function handleSubmit(e) {
        let {user_mail, user_password,user_newPassword} = input
       alert("email"+user_mail+
       "password"+user_password+
       "new password"+user_newPassword
       )
        console.log(user_mail)
        e.preventDefault()
        setInput({
          user_mail: "",
          user_password:"",
          user_newPassword:""
          })
        }




    return (
        <div>
            <div className="container mx-auto flex flex-col justify-center items-center">
             <h1  className="text-4xl"  >Cambiar Contraseña</h1>
             <form onSubmit={handleSubmit}>
                <div className="self-center">
                    <Input type="text"
                    name="user_mail"
                    theme="#3730A3"
                    placeholder="Escribe tu correo"
                    value={input.user_mail} 
                    onChange={handleChange}
                    required/>
                </div>
        
                <div className="self-center">
                    <Input type="text"
                    name="user_password"
                    theme="#3730A3"
                    placeholder="contraseña actual" 
                    value={input.user_password} 
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="self-center">
                    <Input type="text"
                    name="user_newPassword"
                    theme="#3730A3"
                    placeholder="nueva contraseña " 
                    value={input.user_newPassword} 
                    onChange={handleChange}
                    required/>
                </div>
                <Input 
                placeholder="enviar"
                type="submit"
                className="inline-flex bg-blue-800 text-white px-4 py-2 rounded-md">  
                </Input>
                </form>
            </div>
        </div>
    )
}
export default PasswordChange
