import React, { useState, useEffect } from 'react'
import Button from '../../Atoms/Button/Button'
import Input from '../../Atoms/Input/Input'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const EmailPasswordForm = ({ callBack }) => {
    const [error, setError] = useState({
        type: '',
        message: ''
    })
    const [mail, setMail] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabledSignUp, setDisabledSignUp] = useState(true)

    const handlePasswordChanges = (text) => {
        setPassword(text)
    }
    const handleConfirmChanges = (text) => {
        setConfirmPassword(text)
    }

    useEffect(() => {
        const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (password.length === 0) {
            setError({
                type: '',
                message: ''
            })
        }
        if (mail.length && !emailValid.test(mail)) {
            setError({
                type: 'email',
                message: 'Escribe un email válido'
            })
        }
        if (password.length > 0 && password.length < 6) {
            setError({
                type: 'password',
                message: 'La contraseña debe de contener al menos 6 caracteres'
            })
        }
        if (password.length >= 6 && password !== confirmPassword) {
            setError({
                type: 'Password equality',
                message: 'Las contraseñas no coinciden'
            })
        }
        if (emailValid.test(mail) && password.length >= 6 && password === confirmPassword) {
            setError({
                type: '',
                message: ''
            })
            setDisabledSignUp(true)
        } else {
            setDisabledSignUp(false)
        }
    }, [mail, password, confirmPassword])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                callBack(mail, password)
            }}
        >
            <div className="mb-4">
                <Input
                    type="email"
                    id="user_mail"
                    theme="#164E63"
                    label="Email:"
                    placeholder="Escribe tu correo"
                    flexed
                    error={error.type === 'email' || false}
                    callBack={handleMailChanges}
                />
            </div>
            <div className="mb-4">
                <Input type="password"
                    id="user_password"
                    theme="#164E63"
                    label="Contraseña:"
                    flexed
                    error={error.type === 'password' || false}
                    placeholder="Crea una contraseña"
                    callBack={handlePasswordChanges}
                />
            </div>
            <div className="mb-4">
                <Input type="password"
                    id="confirm_password"
                    theme="#164E63"
                    label="Confirmar contraseña:"
                    flexed
                    error={error.type === 'Password equality' || false}
                    placeholder="Confirmar contraseña"
                    callBack={handleConfirmChanges}
                />
            </div>
            <p className="px-4 font-semibold text-sm text-red-800">{error.message}</p>
            <div className="px-4 py-2">
                <Button
                    submit
                    theme="#155E75"
                    customTextColor="#FFFFF"
                    text="Continuar"
                    full
                    disabled={!disabledSignUp}
                />
                <div className="w-full h-1 my-4">
                </div>
            </div>
        </form>
    )
}

export default EmailPasswordForm
