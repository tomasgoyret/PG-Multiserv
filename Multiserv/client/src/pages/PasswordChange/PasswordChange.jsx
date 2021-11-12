import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
//_----------------------------------------------------------------------------------------
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Button from '../../Components/Atoms/Button/Button';

//import Button from '../../Components/Atoms/Button/Button'
//_----------------------------------------------------------------------------------------
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  function handleMail(text) {
    setMail(text)
  }
  function handlePassword(text) {
    setPassword(text)
  }
  function handleNewPassword(text) {
    setNewPassword(text)
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
        setMail('')
        setPassword('')
        setNewPassword('')

        }




    return (
        <div>
            <div className="container mx-auto flex flex-col justify-center items-center">
             <h1  className="text-4xl"  >Cambiar Contraseña</h1>
             <form onSubmit={handleSubmit}>
                <div className="self-center">
              <Input
                label='Correo'
                type="text"
                flexed
                    name="user_mail"
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
                    name="user_password"
                    theme="#3730A3"
                placeholder="contraseña actual"
                callBack={handlePassword}
                    />
                </div>
                <div className="self-center">
              <Input
                label="Nueva contraseña"
                type="password"
                flexed
                    name="user_newPassword"
                    theme="#3730A3"
                    placeholder="nueva contraseña " 
                callBack={handleNewPassword}
              />
                </div>
            <Button
              submit
              full
              icon={<AiFillApple className="mr-2" />}
              type="standard"
              text="Enviar"
            />
                </form>
            </div>
        </div>
    )
}
export default PasswordChange
