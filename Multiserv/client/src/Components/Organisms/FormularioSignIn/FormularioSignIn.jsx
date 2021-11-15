import React, { useEffect, useState } from "react";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { useNavigate } from "react-router";
import { signWithGoogle } from '../../../Firebase';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SeparadorO from "../../Atoms/SeparadorO/SeparadorO";
import Swal from 'sweetalert2';

const FormularioSignIn = () => {
    const [disabledSignIn, setDisabledSignIn] = useState(true)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    // Handles
    const handleMailChanges = (text) => {
        setMail(text)
    }
    
    const handlePasswordChanges = (text) => {
        setPassword(text)
    }


    useEffect(() => {
        const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailValid.test(mail) && password.length >= 6) {
            setDisabledSignIn(true)
        } else {
            setDisabledSignIn(false)
        }
    }, [mail, password])


    // Funciones
    const redirectToHome = () => {
        navigate('/home')
    }

    var user;
    const signIn = async (e) => {
        e.preventDefault();
        console.log("hola1")
        const auth = getAuth()
      
        signInWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                user = userCredential.user
                localStorage.setItem("datoSesion",JSON.stringify(user))
                redirectToHome()
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Swal.fire({
                    title: 'Error!',
                    text: 'Los datos no son validos',
                    icon: 'error',
                    confirmButtonText: 'X'
                  })
                console.log(errorCode, errorMessage)
            });
    }

    const googleSignIn = (e) => {
        e.preventDefault();
        console.log("hola2")
        signWithGoogle()
            .then((result) => {
                localStorage.setItem("datoSesion",JSON.stringify(result.user))
                redirectToHome()
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Los datos no son validos',
                    icon: 'error',
                    confirmButtonText: 'X'
                  })
            })
    }

    
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const cerrarSesion = () =>{
        localStorage.removeItem("datoSesion")
        navigate("/")
    }



    return (
        <div className="items-center">
            {
            datosSesionFromLocalStorage ?
            (<div> 
                Sesion Iniciada con : {datosSesionFromLocalStorage.email} 
                <div className="px-4 py-2">
                        <button type="button" onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
                <img src={`${datosSesionFromLocalStorage.photoURL}`} />
            </div> ) 
            :
            <form>
                <Encabezado2
                    clases="pt-4 pb-3 flex justify-center"
                    titulo="Sign In"
                />
                <div className="px-4 py-2">
                    <Button
                        type="white"
                        icon={<FcGoogle className="text-2xl mr-3" />}
                        text="Continuar con Google"
                        full
                        action={googleSignIn}
                    />
                </div>
                {/* <div className="px-4 py-2">
                    <Button
                        icon={<FaFacebook className="text-2xl mr-3" />}
                        theme="#1877f2"
                        customTextColor="#fffff"
                        text="Continuar con Facebook"
                        full
                        action={() => { console.log('hola') }}
                    />
                </div> */}
                <SeparadorO />
                <Input
                    type="email"
                    id="user_mail"
                    theme="#164E63"
                    label="Email:"
                    placeholder="Ingresa tu Correo"
                    flexed
                    callBack={handleMailChanges}
                />
                <Input type="password"
                    id="user_password"
                    theme="#164E63"
                    label="Contraseña:"
                    flexed
                    placeholder="Ingresa tu Contraseña"
                    callBack={handlePasswordChanges}
                />
                <div className="px-4 py-2">
                    <Button
                        className="px-4 py-2"
                        submit
                        theme="#155E75"
                        customTextColor="#FFFFF"
                        text="Ingresar"
                        full
                        disabled={!disabledSignIn}
                        action={signIn}
                    />
                </div>
                <div className="px-4 py-2">
                    <p className="text-gray-500 leading-tight text-sm font-sans">¿Olvidaste tu contraseña? 
                    <span className="font-medium">Recuerda</span> que puedes restablecerla en el siguiente enlace 
                    <span className="font-semibold text-indigo-800 cursor-pointer">
                    <a href="/PasswordReset">Restablecer Contraseña </a></span></p>
                </div>
            </form>}

        </div>
    )
}

export default FormularioSignIn;