import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { signUp } from '../../Firebase'
import { useNavigate } from "react-router-dom";
import SignInWithSocial from '../../Components/Molecules/SignInWithSocial/SignInWithSocial';
import SeparadorO from '../../Components/Atoms/SeparadorO/SeparadorO';
import EmailPasswordForm from '../../Components/Organisms/EmailPasswordForm/EmailPasswordForm';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import UserRegister from '../../Components/Organisms/UserRegister/UserRegister';
import Swal from 'sweetalert2';

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
    useEffect(() => {
        if (loading) {
            axios.post('http://localhost:3005/agregar-usuario', user)
                .then(response => {
                    const newUser = response.data.user
                    localStorage.setItem("datoSesion", JSON.stringify(newUser))
                    setLoading(false)
                    console.log(newUser);
                    Swal.fire({
                        title:'Bienvenido a Multiservicios',
                        text:' Tu cuenta ha sido creada exitosamente',
                        icon:'success',
                        showConfirmButton: false
                        //timer: 1500
                      })
                    redirectToHome()
            })
            .catch(error => {
                setLoading(false)
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
                    console.log(error.response)
                }
            })
        }
    }, [user, loading])
    return (
        <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
            <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg transition-all ease-out duration-300">
                {step === 1 && (
                    <div className="">
                        <div className="mb-4 flex justify-center">
                            <button onClick={() => { navigate("/") }} className="inline-flex text-cyan-800 transition-all ease-out duration-200 hover:text-cyan-900 px-4 py-2">
                                <HiOutlineArrowNarrowLeft
                                    className="self-center"
                                />
                                <span className="font-semibold ml-2">Volver</span>
                            </button>
                        </div>
                        <div className="px-4 pt-6 pb-4">
                            <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Multiservicios!</h1>
                        </div>
                        <SignInWithSocial afterLogin={redirectToHome} />
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
                        <UserRegister
                            loading={loading}
                            callBack={register} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignUp
