import React, { useState } from 'react'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button'
import { FcGoogle } from "react-icons/fc";

const Components = () => {
    const [mail, setMail] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    function btnAction() {
        alert('hola')
    }

    return (
        <div>
            <h1 className="text-4xl">Bienvenido a multiservices!</h1>
            <div className="flex justify-between">
                <div className="w-1/2">
                    <div className="px-4 py-2">
                        <Button
                            type="standard"
                            icon={<FcGoogle className="text-2xl mr-3" />}
                            text="Registrarme con Google"
                            action={btnAction}
                        />
                    </div>
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
                </div>
                <div className="w-1/2"></div>
            </div>
        </div>
    )
}

export default Components
