import React, { useState, useEffect } from 'react'
import { signUp } from '../../Firebase'
import SignInWithSocial from '../../Components/Molecules/SignInWithSocial/SignInWithSocial';
import SeparadorO from '../../Components/Atoms/SeparadorO/SeparadorO';
import EmailPasswordForm from '../../Components/Organisms/EmailPasswordForm/EmailPasswordForm';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import UserRegister from '../../Components/Organisms/UserRegister/UserRegister';

const SignUp = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [step, setStep] = useState(1)
    /* const signUpUser = () => {
        signUp(mail, password)
            .then(userCreated => {
                console.log(userCreated)
            })

            .catch(e => {
                console.log(e)
            })
    } */
    const nextStep = (mail, password) => {
        setMail(mail)
        setPassword(password)
        setStep(2)
    }
    return (
        <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg transition-all ease-out duration-300">
                {step === 1 && (
                    <div className="">
                        <div className="px-4 pt-6 pb-4">
                            <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Multiservicios!</h1>
                        </div>
                        <SignInWithSocial />
                        <SeparadorO />
                        <EmailPasswordForm callBack={nextStep} />
                    </div>
                )}
                {step === 2 && (
                    <div className="flex flex-col py-6 px-4 justify-center items-center">
                        <div className="mb-4">
                            <button onClick={() => { setStep(1) }} className="inline-flex text-cyan-800 transition-all ease-out duration-200 hover:text-cyan-900 px-4 py-2">
                                <HiOutlineArrowNarrowLeft
                                    className="self-center"
                                />
                                <span className="font-semibold ml-2">Volver</span>
                            </button>
                        </div>
                        <h3 className="text-center font-semibold text-2xl text-cyan-900">Información adicional</h3>
                        <UserRegister />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignUp
