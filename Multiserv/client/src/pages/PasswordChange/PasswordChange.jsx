import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import { FcGoogle } from "react-icons/fc";
import { AiFillCaretRight } from "react-icons/ai";
import { getAuth, updatePassword } from "firebase/auth";
//_----------------------------------------------------------------------------------------
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Button from '../../Components/Atoms/Button/Button';

//_----------------------------------------------------------------------------------------
const PasswordChange = () => {
    // const [input, setInput] = useState({
    //     user_mail:""
    // })
  const [mail, setMail] = useState("")
  //const [password, setPassword] = useState("")
  const [newPassword1, setNewPassword1] = useState("")
  //____________-capturar
  const handleMail = (text) => {
    setMail(text)
  }
  // const handlePassword = (text) => {
  //   setPassword(text)
  // }
  const handleNewPassword = (text) => {
    setNewPassword1(text)
  }
  //________________________________________
//   function handleSubmit (e){
//     e.preventDefault()
//     const auth = getAuth();

//     const user = mail;
//     const newPassword = newPassword1;
    
//     updatePassword(user, newPassword).then(() => {
//       // Update successful.
//     }).catch((error) => {
//       // An error ocurred
//       // ...
//     });

// alert('correo: ' + mail+'nueva contraseña: ' + newPassword1)
// }
function handleResetPassword(auth, actionCode, continueUrl, lang, e) {
  e.preventDefault();
  alert('correo: ' + mail+'nueva contraseña: ' + newPassword1)
  
//Localizar la interfaz de usuario al idioma seleccionado según lo determine el idioma parameter.Verifique que el código de restablecimiento de contraseña sea válido.
  verifyPasswordResetCode(auth, actionCode).then((mail) => {
    lang = 'es';
    const accountEmail = mail;
    // TODO: Mostrar la pantalla de reinicio con el correo electrónico del usuario y pedirle al usuario  the new password.
    const newPassword = newPassword1 ;
    // Save the new password.
    confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
      // Password reset has been confirmed and new password updated.
      // TODO: Display a link back to the app, or sign-in the user directly if the page belongs to the same domain as the app:
      auth.signInWithEmailAndPassword(accountEmail, newPassword);
    // TODO: si hay una URL de continuación disponible, muestra un botón que al hacer clic redirige al usuario a la aplicación a través de continueUrl con
      // estado adicional determinado a partir de los parámetros de esa URL.
    }).catch((error) => {
      // Se produjo un error durante la confirmación. Es posible que el código haya caducado o que la contraseña sea demasiado débil.
    });
  }).catch((error) => {
    // Código de acción no válido o caducado. Pídale al usuario que intente restablecer la contraseña nuevamente.
  });
}
    return (
        <div>
            <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div className="px-4 pt-6 pb-4">
                 <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Cambiar Contraseña!</h1>
            </div>
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg transition-all ease-out duration-300">
            <form onSubmit={handleResetPassword}>
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
                {/* <div className="self-center">
              <Input
                flexed
                label="contraseña"
                type="password"
                    id="user_password"
                    theme="#3730A3"
                placeholder="Escribe tu contraseña actual"
                callBack={handlePassword}
                    />
                </div> */}
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
