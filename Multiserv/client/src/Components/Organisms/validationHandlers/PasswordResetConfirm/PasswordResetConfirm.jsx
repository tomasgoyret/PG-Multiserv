/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../../../Atoms/Button/Button'
import Input from '../../../Atoms/Input/Input'
import { ImSpinner9 } from "react-icons/im";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { handleConfirmPasswordReset, handlePasswordReset } from '../../../../Firebase';
import { getErrorMessage } from '../../../../Firebase/errorMessages';

const PasswordResetConfirm = ({ validationCode }) => {
    const navigate = useNavigate()
    const [error, setError] = useState({
        type: '',
        message: ''
    })
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [successfull, setSuccessfull] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabledReset, setdisabledReset] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handlePassword = (text) => {
        setPassword(text)
    }
    const handleConfirmPassword = (text) => {
        setConfirmPassword(text)
    }

    useEffect(() => {
        handlePasswordReset(validationCode)
            .then((email) => {
                setEmail(email)
                setLoadingStatus(false)
                setShowForm(true)
            })
            .catch(error => {
                setSuccessfull(false)
                setMessage(getErrorMessage(error.code))
                setLoadingStatus(false)
                setShowForm(false)
            })
    }, [])

    const resetPassword = (password) => {
        handleConfirmPasswordReset(validationCode, password)
            .then(response => {
                setSuccessfull(true)
                setLoadingStatus(false)
                setShowForm(false)
                console.log(response);
                setMessage('Se restableció tu contraseña. Ahora puedes iniciar sesión con tu nueva contraseña')
            })
            .catch(error => {
                setSuccessfull(false)
                setLoadingStatus(false)
                setShowForm(false)
                console.log(error);
                setMessage(getErrorMessage(error.code))
            })
    }


    useEffect(() => {
        if (password.length > 0 && password.length < 6) {
            setError({
                type: 'password',
                message: 'La contraseña debe de contener al menos 6 caracteres'
            })
            setdisabledReset(true)
        }
        if (password.length >= 6 && password !== confirmPassword) {
            setError({
                type: 'Password equality',
                message: 'Las contraseñas no coinciden'
            })
            setdisabledReset(true)
        }
        if (password.length >= 6 && password === confirmPassword) {
            setError({
                type: '',
                message: ''
            })
            setdisabledReset(false)
        } else {
            setdisabledReset(true)
        }
    }, [disabledReset, password, confirmPassword])
    return (
        <div className="container mx-auto flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-semibold mb-6">Restablecer contraseña</h1>
            <div
                style={{
                    width: '24rem',
                    height: '375px'
                }}
                className="rounded-md bg-white text-cyan-900 flex px-4 py-6 shadow-xl">
                {
                    loadingStatus ? (
                        <div className="flex flex-col h-full w-full  justify-center items-center">
                            <AiOutlineLoading3Quarters className={`text-5xl text-cyan-900 animate-spin self-center`} />
                        </div>
                    ) : showForm ?
                        (<form
                            className="w-full"
                            onSubmit={(e) => {
                                e.preventDefault()
                                setLoading(true)
                                resetPassword(password)
                            }}>
                            <div className="flex flex-col justify-start items-start my-2 px-4">
                                <label
                                    htmlFor="user_mail"
                                    className="text-sm mb-2 font-semibold text-gray-400 select-none cursor-pointer">
                                    Correo electrónico:
                                </label>
                                <input
                                    disabled
                                    width="100%"
                                    type="email"
                                    name="user_mail"
                                    id="user_mail"
                                    key="user_mail"
                                    value={email}
                                    autoComplete="true"
                                    className="w-full border border-gray-400 p-2 rounded-md font-medium bg-gray-50 text-gray-400 select-none cursor-not-allowed"

                                />
                            </div>
                            <div className="my-4">
                                <Input type="password"
                                    id="user_password"
                                    theme="#164E63"
                                    label="Crea una contraseña:"
                                    flexed
                                    placeholder="Crea una contraseña"
                                    callBack={handlePassword}
                                />
                            </div>
                            <div className="my-4">
                                <Input type="password"
                                    id="user_confirm_password"
                                    theme="#164E63"
                                    label="Confirma tu contraseña:"
                                    flexed
                                    placeholder="Confirma tu contraseña"
                                    callBack={handleConfirmPassword}
                                />
                            </div>
                            <p className="px-4 font-semibold text-sm text-red-800">{error.message}</p>
                            <div className="px-4 py-2">
                                <Button
                                    icon={loading && <ImSpinner9 className="mr-2 animate-spin" />}
                                    submit
                                    theme="#155E75"
                                    customTextColor="#FFFFF"
                                    text={loading ? 'Restaleciendo contraseña...' : 'Restablecer contraseña'}
                                    full
                                    disabled={disabledReset || loading}
                                />
                            </div>
                        </form>)
                        : (
                            <div className="flex flex-col h-full w-full  justify-center items-center">
                                <span className="font-semibold text-xl text-center">
                                    {message}
                                </span>
                                {successfull && (
                                    <div className="my-6">
                                        <Button
                                            type="success"
                                            text="Volver al sitio"
                                            action={() => {
                                                navigate('/')
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default PasswordResetConfirm
