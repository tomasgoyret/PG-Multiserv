import React, { useState, useEffect } from 'react'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button';
import { ImSpinner9 } from "react-icons/im";
import {
  sendPasswordResetEmail,
} from 'firebase/auth'
import Swal from 'sweetalert2';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { getErrorMessage } from '../../Firebase/errorMessages';

const PasswordReset = () => {
  const navigate = useNavigate()
  const [disabledSubmit, setDisabledSubmit] = useState(true)
  const [mail, setMail] = useState("")
  const [loading, setLoading] = useState(false)
//____________-capturar
const handleMail = (text) => {
  setMail(text)
}
  useEffect(() => {
    document.title = "Reestablece tu contraseña"
  }, [])
  useEffect(() => {
    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailValid.test(mail)) {
      setDisabledSubmit(false)
    } else {
      setDisabledSubmit(true)
    }
  }, [mail])

  function resetPassword(e) {
    e.preventDefault()
    setLoading(true)
  sendPasswordResetEmail(auth, mail)
    .then(() => {
      setLoading(false)
      Swal.fire({
        title: 'Reestablecer contraseña',
        text: `Se envió un correo a ${mail}`,
        icon: 'success'
      })
    })
    .catch((error) => {
      setLoading(false)
      const errorCode = error.code;
      // ..
      Swal.fire({
        title: '¡Error!',
        text: `${getErrorMessage(errorCode)}`,
        icon: 'error',
        confirmButtonText: 'X'
      })
    });
}

  return (
    <div>
      <div style={{ backgroundColor: '#21515f' }} className="h-screen flex flex-col justify-center items-center">
        <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center py-6 px-4 my-12 rounded-md shadow-lg transition-all ease-out duration-300">
          <div className="flex flex-row justify-center items-center mb-4">
            <button onClick={() => { navigate("/") }} className="inline-flex text-cyan-800 transition-all ease-out duration-200 hover:text-cyan-900 px-4 py-2 text-lg self-center">
              <HiOutlineArrowNarrowLeft
                className="self-center"
              />
              <span className="font-semibold ml-2">Volver</span>
            </button>
          </div>
          <div className="px-4 pt-2 pb-4">
            <h1 className="source-sans text-center text-4xl font-semibold text-cyan-800">MultiServicios!</h1>
            <h2 className="text-center text-lg mt-0.5 font-semibold text-gray-600">Reestablecer contraseña</h2>
          </div>
          <form onSubmit={resetPassword}>
            <div className="self-center mt-6">
            <Input
                label='Escribe tu dirección de correo: '
              type="text"
              flexed
              id="user_mail"
              theme="#3730A3"
              placeholder="Escribe tu correo"
              callBack={handleMail}
            />
            </div>
            <div className="mt-4 h-10 mx-4">
              {mail && (<p className="text-left text-sm leading-tight font-semibold text-gray-600">Se enviará un correo con instrucciones a <span className=" text-indigo-800">{mail}</span></p>)}
            </div>
            <div className="px-4 mt-2 mb-4">
              <Button
                icon={loading && <ImSpinner9 className="mr-2 animate-spin" />}
                disabled={disabledSubmit || loading}
                submit
                full
                type="standard"
                text={loading ? 'Enviando correo...' : 'Enviar correo de recuperación'}
              />
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}
export default PasswordReset
