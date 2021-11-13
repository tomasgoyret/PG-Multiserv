import React, { useState } from 'react'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button'
import { FcGoogle } from "react-icons/fc";

const Components = () => {
    const [miTexto, setMiTexto] = useState('')

    const funcionCualquiera = (texto) => {
        setMiTexto(texto)
    }
    const [mail, setMail] = useState('')
    const [mail2, setMail2] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    const handleMailChanges2 = (text) => {
        setMail2(text)
    }
    function btnAction() {
        alert('hola')
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl">Components</h1>
            <div className="flex flex-col md:flex-row justify-between mt-6">
                <div className="w-full md:w-1/2 mr-1 my-2">
                    <h3 className="text-center text-xl font-semibold">Inputs y buttons con ancho fijo</h3>
                    <div className="rounded-md border border-gray-400">
                        <h2 className="text-center font-semibold text-xl">Button</h2>
                        <div className="mt-4 px-4 py-2 border-b border-gray-200 flex overflow-x-auto">
                            <div className="self-center mr-4">
                                <Button
                                    type="white"
                                    icon={<FcGoogle className="text-2xl mr-3" />}
                                    text="Registrarme con Google"
                                    action={btnAction}
                                />
                            </div>
                            <div className="self-center mr-4">
                                <Button
                                    type="success"
                                    text="Success"
                                    action={btnAction}
                                />
                            </div>
                            <div className="self-center mr-4">
                                <Button
                                    type="warning"
                                    text="warning"
                                    action={btnAction}
                                />
                            </div>
                            <div className="self-center mr-4">
                                <Button
                                    type="danger"
                                    text="danger"
                                    action={btnAction}
                                />
                            </div>
                            <div className="self-center mr-4">
                                <Button
                                    type="standard"
                                    text="standard"
                                    action={btnAction}
                                />
                            </div>
                            <div className="self-center mr-4">
                                <Button
                                    submit
                                    theme="#155E75"
                                    customTextColor="#FFFFF"
                                    text="Custom"
                                    action={btnAction}
                                />
                            </div>
                        </div>
                        <h2 className="text-center font-semibold text-xl">Input</h2>
                        <div className="mb-4 mt-4 px-4 py-2">
                            <Input
                                type="email"
                                id="mail_input_1"
                                theme="#164E63"
                                label="Email:"
                                placeholder="Escribe tu correo"
                                callBack={handleMailChanges}
                            />
                            <span className="font-semibold mx-auto">{mail}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 ml-1 my-2">
                    <h3 className="text-center text-xl font-semibold">Inputs y buttons tipo flex</h3>
                    <div className="rounded-md border border-gray-400">
                        <h2 className="text-center font-semibold text-xl">Button</h2>
                        <div className="mt-4 px-4 py-2 border-b border-gray-200 ">
                            <Button
                                full
                                type="white"
                                icon={<FcGoogle className="text-2xl mr-3" />}
                                text="Registrarme con Google"
                                action={btnAction}
                            />
                        </div>
                        <h2 className="text-center font-semibold text-xl">Input</h2>
                        <div className="mb-4 mt-4 px-4 py-2">
                        <Input
                            type="email"
                                id="mail_input_2"
                            theme="#164E63"
                            label="Email:"
                                flexed
                                placeholder="Escribe tu correo"
                                callBack={handleMailChanges2}
                            />
                            <span className="font-semibold mx-auto">{mail2}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Input
                type="text"
                id="mi_texto"
                theme="#164E63"
                label="un texto"
                placeholder="escribe algo"
                flexed
                callBack={funcionCualquiera}
            />
            <span>{miTexto}</span>

        </div>
    )
}

export default Components
