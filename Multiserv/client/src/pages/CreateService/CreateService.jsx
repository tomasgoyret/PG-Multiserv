import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Input from '../../Components/Atoms/Input/Input';
import ReactCountryFlag from "react-country-flag"
import ListBox from '../../Components/HeadLess/ListBox/ListBox';

const CreateService = () => {
    const navigate = useNavigate();
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))

    const [service, setService] = useState({
        title: '',
        description: '',
        categorias: [],
        min: '',
        max: '',
        currency: 'MXN'
    })
    const handleSetService = (cat) => {
        return (text) => {
            setService({
                ...service,
                [cat]: text
            })
        }
    }
    const monedas = [
        {
            name: 'MXN',
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
            name: 'ARS',
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
            name: 'COP',
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
    const categorias = [
        {
            name: 'categoria 1'
        },
        {
            name: 'categoria 2'
        },
        {
            name: 'categoria 3'
        },
        {
            name: 'categoria 4'
        },
        {
            name: 'categoria 5'
        },
    ]
    const handleCurrency = (obj) => {
        setService({
            ...service,
            currency: obj.name
        })
    }
    useEffect(() => {
        if (!localStorage.length || !datosSesionFromLocalStorage.emailVerified) {
            navigate('/')
        }
    }, [])

    const { uid } = useParams()

    return (
        <div className="contianer flex justify-center items-center mx-auto w-full bg-gray-400">
            <div
                className="rounded-md bg-white mx-8 py-4 px-6 flex flex-col lg:flex-row justify-center items-center w-full h-96">
                <div className="mx-4 border w-full">
                    <div className="mb-4">
                        <Input
                            type="text"
                            id="title"
                            theme="#164E63"
                            label="Escribe un título para tu servicio:"
                            placeholder="Título"
                            flexed
                            callBack={handleSetService('title')}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="textarea"
                            height='120px'
                            id="description"
                            theme="#164E63"
                            label="Escribe una descripción atractiva:"
                            flexed
                            placeholder="Ingresa tus apellidos"
                            callBack={handleSetService('description')}
                        />
                    </div>
                </div>
                <div className="mx-4 border w-full">
                    <div className="mb-4 flex justify-between">
                        <div className="w-1/3 self-center">
                            <Input
                                type="number"
                                id="min"
                                theme="#164E63"
                                label="Precio mínimo:"
                                placeholder="Precio"
                                flexed
                                callBack={handleSetService('min')}
                            />
                        </div>
                        <div className="w-1/3 self-center">
                            <Input
                                type="number"
                                id="max"
                                theme="#164E63"
                                label="Precio máximo:"
                                placeholder="Precio"
                                flexed
                                callBack={handleSetService('max')}
                            />
                        </div>
                        <div className="w-1/3 self-center pt-3">
                            <div className="relative mx-4">
                                <span className={`absolute -top-6 text-sm font-semibold text-gray-600 select-none cursor-pointer`}>Moneda local:</span>

                                <div className="flex flex-row mt-3">
                                    <ListBox
                                        customBorder="#9CA3AF"
                                        className="self-center"
                                        width='10rem'
                                        options={monedas}
                                        callBack={handleCurrency}
                                        text="..."
                                        theme="#0C4A6E"
                                        includeIconOnDesc
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between mx-4">
                            <div className="mr-4">
                                <ListBox
                                    customBorder="#9CA3AF"
                                    className="self-center"
                                    width='15rem'
                                    options={categorias}
                                    callBack={(object) => { console.log(object.name) }}
                                    text="..."
                                    theme="#0C4A6E"
                                    includeIconOnDesc
                                />
                            </div>
                            <div className="">
                                <ListBox
                                    customBorder="#9CA3AF"
                                    className="self-center"
                                    width='15rem'
                                    options={categorias}
                                    callBack={(object) => { console.log(object.name) }}
                                    text="..."
                                    theme="#0C4A6E"
                                    includeIconOnDesc
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateService
