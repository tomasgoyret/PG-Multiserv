import React, { useState, useEffect } from 'react'
import { signUp, signWithGoogle } from '../../Firebase'
import { GoogleAuthProvider } from '@firebase/auth'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const [mail, setMail] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    const [password, setPassword] = useState('')
    const [disabledSignUp, setDisabledSignUp] = useState(true)
    const handlePasswordChanges = (text) => {
        setPassword(text)
    }
    useEffect(() => {
        const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailValid.test(mail) && password.length >= 6) {
            setDisabledSignUp(true)
        } else {
            setDisabledSignUp(false)
        }
    }, [mail, password])

    const signUpUser = () => {
        signUp(mail, password)
            .then(userCreated => {
                console.log(userCreated)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const googleRegister = () => {
        signWithGoogle()
            .then((result) => {
                /* const credential = GoogleAuthProvider.credentialFromResult(result) */
                console.log(result)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg">
                <div className="px-4 pt-6 pb-4">
                    <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Bienvenido a multiservicios!</h1>
                </div>
                <div className="px-4 py-2">
                    <Button
                        type="white"
                        icon={<FcGoogle className="text-2xl mr-3" />}
                        text="Registrarme con Google"
                        full
                        action={googleRegister}
                    />
                </div>
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
                            text="Crear cuenta"
                            full
                            disabled={!disabledSignUp}
                            action={signUpUser}
                        />
                        <div className="my-4">
                            <p className="text-gray-500 leading-tight text-sm font-sans">Al hacer click en <span className="font-medium">Crear cuenta</span>, aceptas nuestros <span className="font-semibold text-indigo-800 cursor-pointer">términos y condiciones <HiOutlineArrowNarrowRight className="inline-block" /> </span></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
