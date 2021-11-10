import React from 'react'
import Input from '../../Components/Atoms/Input/Input'
const SignUp = () => {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            <div className="self-center">
                <h2 className="text-3xl">Sign Up</h2>
                <Input type="text"
                    name="user_mail"
                    theme="#3730A3"
                    placeholder="Escribe tu correo" />
            </div>
        </div>
    )
}

export default SignUp
