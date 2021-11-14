import React, { useState, useEffect } from 'react'
import Button from '../../Atoms/Button/Button'
import Input from '../../Atoms/Input/Input'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const EmailPasswordForm = ({ callBack }) => {
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

        if (emailValid.test(mail) && password.length >= 6 && password === confirmPassword) {
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
            <div className="mb-4">
                <Input type="password"
                    id="confirm_password"
                    theme="#164E63"
                    label="Confirmar contraseña:"
                    flexed
                    placeholder="Confirmar contraseña"
                    callBack={handleConfirmChanges}
                />
            </div>
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
