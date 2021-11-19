/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignInWithSocial from '../../Components/Molecules/SignInWithSocial/SignInWithSocial';
import SeparadorO from '../../Components/Atoms/SeparadorO/SeparadorO';
import EmailPasswordForm from '../../Components/Organisms/EmailPasswordForm/EmailPasswordForm';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import UserRegister from '../../Components/Organisms/UserRegister/UserRegister';
import Swal from 'sweetalert2';
import { auth, verifyEmailAddress } from '../../Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        mail: '',
        password: '',
        name: '',
        lastName: '',
        phone: ''
    })
    const [step, setStep] = useState(1)
    const nextStep = (mail, password) => {
        setUser({
            ...user,
            mail,
            password
        })
        setStep(2)
    }
    const register = (name, lastName, phone) => {
        setUser({
            ...user,
            name,
            lastName,
            phone
        })
        setLoading(true)
    }
    const redirectToHome = () => {
        navigate('/home')
    }

    const formStyle = {
        width: '350px',
        backgroundColor: '#fdfdfd',
        height: step === 1 ? '545px' : '525px',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        transitionDuration: '300ms',
    }

    useEffect(() => {
        if (loading) {
            axios.post('agregar-usuario', user)
                .then(response => {
                    const newUser = response.data.user
                    localStorage.setItem("datoSesion", JSON.stringify(newUser))
                    setLoading(false)
                    console.log(newUser);
                    Swal.fire({
                        title:'Bienvenido a Multiservicios',
                        text:' Tu cuenta ha sido creada exitosamente',
                        icon:'success',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    return signInWithEmailAndPassword(auth, user.mail, user.password)
                })
                .then(() => {
                    verifyEmailAddress()
                        .then(() => {
                            navigate('/email-verification')
                        })
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
                if (error.response) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.code === 'app/network-error' ? "No pudimos conectarnos a internet" : error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'X'
                    })
                    console.log(error.response);
                } else if (error.request) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Ocurrió un error. Vuelve a intentarlo",
                        icon: 'error',
                        confirmButtonText: 'X'
                    })
                }
            })
        }
    }, [user, loading])

    return (
        <div style={{ backgroundColor: '#21515f' }} className="flex flex-col lg:flex-row lg:h-screen justify-center items-center overflow-y-auto">
            <div className="px-12 pb-8 lg:px-8 flex flex-col text-center lg:text-left w-full lg:w-7/12">
                <div className="mb-4 lg:mb-8 mt-4 flex justify-center lg:justify-start">
                    <button onClick={() => { navigate("/") }} className="inline-flex text-white transition-all ease-out duration-200 hover:text-gray-200 py-2 text-xl md:text-2xl lg:text-3xl">
                        <HiOutlineArrowNarrowLeft
                            className="self-center"
                        />
                        <span className="font-semibold ml-2">Regresar</span>
                    </button>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-none filter drop-shadow-xl">
                    Lleva tu negocio a un siguiente nivel
                </h1>
                <div className="mt-4 md:mt-8 inline-flex w-max self-center place-self-center lg:place-self-start border-b-8 border-gray-800">
                    <span className="text-gray-50 text-2xl md:text-3xl lg:text-4xl font-semibold">
                        Empieza hoy mismo
                    </span>
                </div>
            </div>
            <div css={formStyle} className="self-center mb-4 md:my-4 rounded-md shadow-lg flex flex-col">
                <div>

                    {step === 1 && (<div>

                        <div className="px-4 pt-6 pb-4">
                            <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Multiservicios!</h1>
                        </div>
                        <SignInWithSocial afterLogin={redirectToHome} />
                        <SeparadorO />
                        <EmailPasswordForm callBack={nextStep} />
                    </div>)}

                    {step === 2 && (<div className={`flex flex-col py-6 px-4 justify-center items-center`}>
                        <div className="mb-4">
                            <button onClick={() => { setStep(1) }} className="inline-flex text-cyan-800 transition-all ease-out duration-200 hover:text-cyan-900 px-4 py-2">
                                <HiOutlineArrowNarrowLeft
                                    className="self-center"
                                />
                                <span className="font-semibold ml-2">Volver</span>
                            </button>
                        </div>
                        <h3 className="text-center font-semibold text-2xl text-cyan-900">Información adicional</h3>
                        <UserRegister
                            loading={loading}
                            callBack={register} />
                    </div>)}

                </div>
            </div>
        </div>
    )
}

export default SignUp
