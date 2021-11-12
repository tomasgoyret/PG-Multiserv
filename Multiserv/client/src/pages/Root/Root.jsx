import React, { useState } from 'react'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/HeadLess/Button/Button'
import { FcGoogle } from "react-icons/fc";

const Root = () => {
    const [mail, setMail] = useState('')
    const handleMailChanges = (text) => {
        setMail(text)
    }
    function btnAction() {
        alert('hola')
    }
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl">Bienvenido a multiservices!</h1>
        </div>
    )
}

export default Root
