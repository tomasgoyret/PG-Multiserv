import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../../Components/Atoms/Button/Button';
import { RiLoaderLine } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";
import { auth, verifyEmailAddress } from '../../Firebase';
import Swal from 'sweetalert2';

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [resended, setResended] = useState(false)
    const [disableVerification, setDisableVerification] = useState(true)
    const [timer, setTimer] = useState(60)
    const [userStatus, setUserStatus] = useState(JSON.parse(localStorage.getItem("datoSesion")))

    useEffect(() => {
        let mounted = true
        if (mounted) {
            if (!userStatus || userStatus.emailVerified) {
                navigate('/home')
            }
            if (userStatus) {
                const emailFromUser = userStatus.email
                setEmail(emailFromUser)
            }

            auth.onAuthStateChanged(() => {
                if (auth.currentUser) {
                    const checkIfVerified = setInterval(() => {
                        auth.currentUser.reload().then(() => {
                            if (auth.currentUser.emailVerified) {
                                navigate('/home')
                                localStorage.setItem("datoSesion", JSON.stringify(auth.currentUser))
                                clearInterval(checkIfVerified)
                            }
                        })
                    }, 3000)
                }
            })
        }

        return () => {
            mounted = false
        }
    }, [])
    const reset = () => {
        setTimer(60)
        setDisableVerification(false)
    }
    useEffect(() => {
        let disableTimer = null
        if (disableVerification && timer > 0) {
            setTimeout(() => {
                setTimer(timer => timer - 1)
            }, 1000)
        }
        if (timer === 0) {
            reset();
        }
    }, [disableVerification, timer])
    const logout = () => {
        navigate("/")
        localStorage.removeItem("datoSesion")
    }
    const sendConfirmMail = () => {
        verifyEmailAddress().then(() => {
            setDisableVerification(true)
            Swal.fire(
                '¡Listo!',
                `Se reenvió el email de verificación a ${email}`,
                'success'
            )
        }).catch((error) => {
            Swal.fire(
                'Oops!',
                'Inténtalo de nuevo en un minuto',
                'error'
            )
        })
    }
    return (
        <div className="bg-indigo-900 text-white h-screen flex">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className="font-semibold text-6xl">Multiservicios!</h1>
                <div className="my-8 text-center">
                    <h2 className="font-semibold text-2xl text-gray-50">Verificación de email</h2>
                    <h4 className="lato mt-4 mb-8 text-gray-50">Se ha enviado un email de confirmación a <span className="font-bold">{email}</span> </h4>
                    <div className="flex flex-row justify-center">
                        <RiLoaderLine className="self-center mr-2 animate-spin text-xl" />
                        <span className="self-center font-medium">
                            Esperando verificación...
                        </span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h4 className="mb-3 font-semibold text-lg">¿No recibiste el email?</h4>
                    <Button
                        disabled={disableVerification}
                        text={`${disableVerification ? `Espere ${timer} segundos` : 'Reenviar link de verificación'}`}
                        theme="#fafafa"
                        customTextColor="#4C1D95"
                        action={sendConfirmMail}
                    />
                    <div className="inline-flex flex-row mt-6 pt-4 px-8 border-t border-gray-400">
                        <span className="font-semibold self-center">¿No es tu email?</span>
                        <button
                            onClick={logout}
                            className="font-semibold py-0.5 px-4 inline-flex self-center bg-indigo-700 ml-4 rounded-full transition-all ease-in-out duration-300 hover:bg-indigo-600 hover:shadow-lg">
                            <span className="self-center">Salir</span>
                            <FaLongArrowAltRight className="self-center ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
