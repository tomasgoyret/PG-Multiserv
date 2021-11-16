import React, { useState, useEffect } from 'react'
import ReactCountryFlag from "react-country-flag"
import Button from '../../Atoms/Button/Button'
import Input from '../../Atoms/Input/Input'
import { ImSpinner9 } from "react-icons/im";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ListBox from '../../HeadLess/ListBox/ListBox';

const UserRegister = ({ loading, callBack }) => {
    const [countryCode, setCountryCode] = useState('+52')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState(null)
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
        if (name && lastName) {
            setDisabledSignUp(false)
        } else {
            setDisabledSignUp(true)
        }
    }, [name, lastName])
    const handleCountry = (obj) => {
        setCountryCode(obj.name)
    }
    const options = [
        {
            name: '+52',
            icon: <ReactCountryFlag

                countryCode="MX"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
        {
            name: '+54',
            icon: <ReactCountryFlag

                countryCode="AR"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
        {
            name: '+57',
            icon: <ReactCountryFlag

                countryCode="CO"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
    ]
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                callBack(name, lastName, phone && `${countryCode}${phone}`)
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
                <div className="pt-2 pl-4">
                    <div className="flex flex-col relative w-full">
                        <span className={`absolute -top-3 text-sm font-semibold text-gray-600 mr-4 select-none cursor-pointer`}>Teléfono</span>
                        <div className="flex flex-row mt-1">
                            <ListBox
                                customBorder="#9CA3AF"
                                className="self-center"
                                width='6.4rem'
                                options={options}
                                callBack={handleCountry}
                                text="..."
                                theme="#0C4A6E"
                                includeIconOnDesc
                            />
                            <div className="self-center">
                                <Input
                                    type="tel"
                                    id="user_phone"
                                    theme="#164E63"
                                    flexed
                                    placeholder="Tu número telefónico"
                                    callBack={handlePhone}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-2">
                <Button
                    icon={loading && <ImSpinner9 className="mr-2 animate-spin" />}
                    submit
                    theme="#155E75"
                    customTextColor="#FFFFF"
                    text={loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    full
                    disabled={disabledSignUp || loading}
                />
                <div className="my-4">
                    <p className="text-gray-700 leading-tight text-sm font-sans">Al hacer click en <span className="font-medium">Crear cuenta</span>, aceptas nuestros <span className=" font-bold text-cyan-800 cursor-pointer">términos y condiciones <HiOutlineArrowNarrowRight className="inline-block" /> </span></p>
                </div>
            </div>
        </form>
    )
}

export default UserRegister
