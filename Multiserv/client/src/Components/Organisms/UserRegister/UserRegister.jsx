import React, { useState, useEffect } from 'react'
import Button from '../../Atoms/Button/Button'
import Input from '../../Atoms/Input/Input'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const UserRegister = ({ callBack }) => {
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
            onSubmit={(e) => { e.preventDefault() }}
        >
            <div className="mb-4">
                <Input
                    type="text"
                    id="user_first_name"
                    theme="#164E63"
                    label="Nombre(s):"
                    placeholder="Ingresa tu nombre"
                    flexed
                    callBack={handleMailChanges}
                />
            </div>
            <div className="mb-4">
                <Input type="text"
                    id="user_last_name"
                    theme="#164E63"
                    label="Apellido(s):"
                    flexed
                    placeholder="Ingresa tus apellidos"
                    callBack={handlePasswordChanges}
                />
            </div>
            <div className="mb-4">
                <Input type="tel"
                    id="user_phone"
                    theme="#164E63"
                    label="Teléfono:"
                    flexed
                    placeholder="Tu número telefónico"
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
                    action={() => {
                        callBack(mail, password)
                    }}
                />
                <div className="my-4">
                    <p className="text-gray-700 leading-tight text-sm font-sans">Al hacer click en <span className="font-medium">Continuar</span>, aceptas nuestros <span className=" font-bold text-cyan-800 cursor-pointer">términos y condiciones <HiOutlineArrowNarrowRight className="inline-block" /> </span></p>
                </div>
            </div>
        </form>
    )
}

export default UserRegister
