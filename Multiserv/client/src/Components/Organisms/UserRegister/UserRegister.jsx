import React, { useState, useEffect } from 'react'
import Button from '../../Atoms/Button/Button'
import Input from '../../Atoms/Input/Input'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const UserRegister = ({ callBack }) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [disabledSignUp, setDisabledSignUp] = useState(true)

    const handleName = (text) => {
        setName(text)
    }
    const handleLastName = (text) => {
        setLastName(text)
    }
    const handlePhone = (text) => {
        setPhone(text)
    }

    useEffect(() => {
        if (name && lastName && phone) {
            setDisabledSignUp(true)
        } else {
            setDisabledSignUp(false)
        }
    }, [name, lastName, phone])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                callBack(name, lastName, phone)
            }}
        >
            <div className="mb-4">
                <Input
                    type="text"
                    id="user_first_name"
                    theme="#164E63"
                    label="Nombre(s):"
                    placeholder="Ingresa tu nombre"
                    flexed
                    callBack={handleName}
                />
            </div>
            <div className="mb-4">
                <Input type="text"
                    id="user_last_name"
                    theme="#164E63"
                    label="Apellido(s):"
                    flexed
                    placeholder="Ingresa tus apellidos"
                    callBack={handleLastName}
                />
            </div>
            <div className="mb-4">
                <Input type="tel"
                    id="user_phone"
                    theme="#164E63"
                    label="Teléfono:"
                    flexed
                    placeholder="Tu número telefónico"
                    callBack={handlePhone}
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
                />
                <div className="my-4">
                    <p className="text-gray-700 leading-tight text-sm font-sans">Al hacer click en <span className="font-medium">Crear cuenta</span>, aceptas nuestros <span className=" font-bold text-cyan-800 cursor-pointer">términos y condiciones <HiOutlineArrowNarrowRight className="inline-block" /> </span></p>
                </div>
            </div>
        </form>
    )
}

export default UserRegister
