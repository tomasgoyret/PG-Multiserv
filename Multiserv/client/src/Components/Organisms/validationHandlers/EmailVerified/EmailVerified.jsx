import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonXartiago from '../../../Atoms/ButtonXartiago/ButtonXartiago'
import { handleEmailVerification } from '../../../../Firebase'
import s from './EmailVerified.module.css'

const EmailVerified = ({ validationCode }) => {
    const navigate = useNavigate()
    const [inProcess, setInProcess] = useState(false)
    const [validationResult, setValidationResult] = useState(null)
    const [countDown, setCountDown] = useState(5)
    const [triggeredTimer, setTriggeredTimer] = useState(false)
    const [showTimer, setShowTimer] = useState(false)

    useEffect(() => {
        setInProcess(true)
        //return (() => status())
    }, [])
    useEffect(() => {
        if (inProcess) {
            handleEmailVerification(validationCode)
                .then(response => {
                    console.log(response);
                    setInProcess(false)
                    setShowTimer(true)
                    setValidationResult({
                        success: true
                    })
                }).catch(error => {
                    console.log(error)
                    setInProcess(false)
                    setValidationResult({
                        failed: error.code
                    })
                })
        }
    }, [inProcess])

    useEffect(() => {
        let mounted = true
        if (showTimer) {
            let timer = null
            if (!triggeredTimer) setTriggeredTimer(true)
            if (countDown >= 0) {
                if (triggeredTimer) {
                    timer = setTimeout(() => {
                        setCountDown(countDown => countDown - 1)
                    }, 1000)
                }
            }
            if (countDown === -1) {
                clearTimeout(timer)
                navigate('/')
            }
        }
        return () => {
            mounted = false
        }
    }, [showTimer, countDown, triggeredTimer])

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/expired-action-code':
                return 'El enlace de verificación ha expirado'
            case 'auth/invalid-action-code':
                return 'Es probable que ya se haya usado este enlace de verificación anteriormente o no es un enlace válido'
            case 'auth/user-disabled':
                return 'El usuario se encuentra deshabilidato. Crea otra cuenta'
            case 'auth/user-not-found':
                return 'No se encontró un usuario asociado a este enlace'
            default:
                return '';
        }
    }

    return (
        <div className="container mx-auto flex flex-col items-center justify-center h-screen">
            {inProcess && <h1 className="text-4xl">Validando email...</h1>}
            {validationResult && validationResult.success && (
                <div className="my-6 flex flex-col justify-center items-center text-center">
                    <h2 className="text-3xl font-medium">¡Se verificó tu email!</h2>
                    <div className="my-12">
                        <h4 className="text-xl">En breve serás redirigido al inicio...</h4>
                    </div>
                    <div className={`${s.message} mb-6`}>
                        {showTimer && (
                            <div className={s.countdown}>
                                <div className={s.countdown_number}>
                                    <span className={s.counter}>{countDown}</span>
                                </div>
                                <svg className={s.svg}>
                                    <circle className={`${s.circle} ${s.animation}`} r="18" cx="20" cy="20"></circle>
                                </svg>
                            </div>
                        )}
                    </div>
                    <ButtonXartiago
                        btn="Volver a inicio"
                        page="home"
                        btnClass="px-4 py-2 rounded-md bg-white text-cyan-900 font-semibold text-lg hover:bg-gray-200 transition-all ease-in-out duration-300"
                    />
                </div>
            )}
            {validationResult && validationResult.failed && (
                <div className="text-center md:w-9/12 lg:w-1/2">
                    <h1 className="font-semibold text-6xl">Error</h1>
                    <div className="my-8">
                        <h2 className="text-3xl">{getErrorMessage(validationResult.failed)}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmailVerified
