import React, { useEffect, useState } from "react";
import ButtonXartiago from "../../Atoms/ButtonXartiago/ButtonXartiago";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
// import { signUp, signWithGoogle } from '../../Firebase'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import SignInWithSocial from "../../Molecules/SignInWithSocial/SignInWithSocial";
import { useNavigate } from "react-router";

const FormularioSignIn = () => {
    const [disabledSignIn, setDisabledSignIn] = useState(true)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [sesion, setSesion] = useState({
        sesion : false,
        usuario : ""
    })
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

        // Login

        var user;
        const signIn = async (e) => {
            e.preventDefault();
            const auth = getAuth()
            // setPersistence(auth, browserLocalPersistence)
            // .then( () => {
            //     return signInWithEmailAndPassword(auth, mail, password);
            // }) nueva prueba otra otra
            signInWithEmailAndPassword(auth, mail, password)
                .then(userCredential => {
                    e.preventDefault()
                    user = userCredential.user
                    localStorage.setItem("datoSesion",JSON.stringify(user))
                    navigate("/home")
                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    alert(errorCode, errorMessage)
    
                });
        }

    const redirectToHome = () => {
        navigate('/')
    }

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const cerrarSesion = () =>{
        localStorage.removeItem("datoSesion")
        navigate("/")
    }


    return (
        <div className="items-center">
            {datosSesionFromLocalStorage? (<div> 
                Sesion Iniciada con : {datosSesionFromLocalStorage.email} 
                <div className="px-4 py-2">
                        <button type="button" onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
                <img src={`${datosSesionFromLocalStorage.photoURL}`} />
                </div> ) : <form onSubmit={signIn}>
                <Encabezado2
                    clases="pt-4 pb-3 flex justify-center"
                    titulo="Sign In"
                />
                <SignInWithSocial
                    afterLogin={redirectToHome}
                />
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
                    />
                </div>
                <div className="px-4 py-2">
                    <p className="text-gray-500 leading-tight text-sm font-sans">Olvidaste tu contraseña? <span className="font-medium">Recuerda</span>, que puedes restablecerla en el siguiente enlace <span className="font-semibold text-indigo-800 cursor-pointer">Restablecer Contraseña</span></p>
                </div>
            </form>}

        </div>
    )
}

export default FormularioSignIn;