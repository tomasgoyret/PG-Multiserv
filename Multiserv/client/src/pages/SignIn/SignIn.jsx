import React, { useState, useEffect } from 'react'
import { signUp, signWithGoogle } from '../../Firebase'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const [mail, setMail] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    const [password, setPassword] = useState('')
    const [disabledSignUp, setDisabledSignUp] = useState(true)
    const handlePasswordChanges = (text) => {
        setPassword(text)
    }
    const [sesion, setSesion] = useState({
        sesion : false,
        usuario : ""
    })
    useEffect(() => {
        const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailValid.test(mail) && password.length >= 6) {
            setDisabledSignUp(true)
        } else {
            setDisabledSignUp(false)
        }
    }, [mail, password])
    var user = ""
    const signIn = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth,mail, password)
            .then(userCredential => {
                user = userCredential.user
                alert("Iniciaste sesión como "+ user.email)
                setSesion({
                    ...sesion,
                    sesion : true,
                    usuario : user.email
                })
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert( errorCode , errorMessage)
              });
    }

    // const googleRegister = () => {
    //     signWithGoogle()
    //         .then((result) => {
    //             /* const credential = GoogleAuthProvider.credentialFromResult(result) */
    //             console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
    return (
        <div><div>
            {sesion.sesion? (<div> Bienvenido! {sesion.usuario} </div>) : (<div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg">
                <div className="px-4 pt-6 pb-4">
                    <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Bienvenido a multiservicios!</h1>
                </div>
                {/* <div className="px-4 py-2">
                    <Button
                        type="white"
                        icon={<FcGoogle className="text-2xl mr-3" />}
                        text="Registrarme con Google"
                        full
                        action={googleRegister}
                    />
                </div> */}
                <form
                    onSubmit={(e) => { e.preventDefault() }}
                >
                    <div className="mb-4">
                        <Input
                            type="email"
                            id="user_mail"
                            theme="#164E63"
                            label="Email:"
                            placeholder="Escribe tu correo"
                            flexed
                            callBack={handleMailChanges}
                        />
                    </div>
                    <div className="mb-4">
                        <Input type="password"
                            id="user_password"
                            theme="#164E63"
                            label="Contraseña:"
                            flexed
                            placeholder="Crea una contraseña"
                            callBack={handlePasswordChanges}
                        />
                    </div>
                    <div className="px-4 py-2">
                        <Button
                            submit
                            theme="#155E75"
                            customTextColor="#FFFFF"
                            text="Iniciar Sesion"
                            full
                            disabled={!disabledSignUp}
                            action={signIn}
                        />
                        {/* <div className="my-4">
                            <p className="text-gray-500 leading-tight text-sm font-sans">Al hacer click en <span className="font-medium">Crear cuenta</span>, aceptas nuestros <span className="font-semibold text-indigo-800 cursor-pointer">términos y condiciones <HiOutlineArrowNarrowRight className="inline-block" /> </span></p>
                        </div> */}
                    </div>
                </form>
            </div>
                    
        </div>)}
        </div>
        
        </div>
    )
}

export default SignIn
