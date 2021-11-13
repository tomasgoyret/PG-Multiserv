import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import { FcGoogle } from "react-icons/fc";
import { AiFillCaretRight } from "react-icons/ai";

import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Button from '../../Components/Atoms/Button/Button';
const PasswordReset = () => {
const [mail, setMail] = useState("")
//____________-capturar
const handleMail = (text) => {
  setMail(text)
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
               <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Recuperar Contraseña!</h1>
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
export default PasswordReset
