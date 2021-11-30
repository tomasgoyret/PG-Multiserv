import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getCats } from '../../redux/actions/actions';
import Input from '../../Components/Atoms/Input/Input';
import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from "react-country-flag"
import ListBox from '../../Components/HeadLess/ListBox/ListBox';
import SimpleProgressBar from '../../Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import Button from '../../Components/Atoms/Button/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BiLoader } from "react-icons/bi";
import Swal from 'sweetalert2';
import { MapContainer, MapConsumer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { ImSpinner6 } from "react-icons/im";
import { FaSearchLocation } from "react-icons/fa";
import { BsStars, BsExclamationLg } from "react-icons/bs";


const CreateService = () => {
    /* espacio para mapa en la linea 405 */
    const markerRef = useRef(null)
    const [draggable, setDraggable] = useState(false)
    const [disabledNext, setDisabledNext] = useState(true)
    const categoriasDb = useSelector((state) => state.categories)
    const [loadingSave, setLoadingSave] = useState(false);
    const [uploadImg, setuploadImg] = useState(false);
    const [imageOnCloud, setImageOnCloud] = useState(false)
    const [failedUpload, setFailedUpload] = useState(false)
    const [position, setPosition] = useState(null)
    const [relocationPos, setRelocationPos] = useState(null)
    const [address, setAddress] = useState('')
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [aDomicilio, setADomicilio] = useState(false)
    const [searchLocationStatus, setSearchLocationStatus] = useState({ status: 'not searching' })
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const [service, setService] = useState({
        title: '',
        description: '',
        categorias: ['Limpieza'],
        min: '',
        max: '',
        currency: 'MXN',
        photos: [],
        location: '',
        address: '',
    })

    const handleAddres = (e) => {
        setAddress(e.target.value)
    }
    const onClickAddress = (e) => {
        setDraggable(false)
        setDisabledNext(true)
        setSearchLocationStatus({ status: 'searching' })
        e.preventDefault();
        axios(`https://api.geoapify.com/v1/geocode/search?text=${address}&limit=1&format=json&apiKey=7418c78b799b47df808b6aae89a65898`)
            .then((response) => {
                setDraggable(true)
                const pos = response.data.results[0];
                setPosition([pos.lat, pos.lon]);
                setSearchLocationStatus({ status: 'success' })
                setAddress(pos.formatted)
                setService({
                    ...service,
                    location: [pos.lat, pos.lon],
                    address: pos.formatted
                })
                setDisabledNext(false)
            })
            .catch((error) => {
                setDraggable(true)
                setDisabledNext(false)
                setSearchLocationStatus({ status: 'failed', result: error })
            });
    };

    const searchLatLng = (lat, lon) => {
        if (searchLocationStatus.status !== 'not searching') {
            setSearchLocationStatus({ status: 'searching' })
        }
        setDraggable(true)
        axios(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=7418c78b799b47df808b6aae89a65898`)
            .then((response) => {
                const pos = response.data.results[0];
                setRelocationPos([pos.lat, pos.lon]);
                setAddress(pos.formatted)
                setService({
                    ...service,
                    location: [pos.lat, pos.lon],
                    address: pos.formatted
                })
                setDraggable(false)
                setDisabledNext(false)
                setRelocationPos(null)
                setSearchLocationStatus({ status: 'success' })
            })
            .catch((error) => {
                setDraggable(true)
                setDisabledNext(false)
                setRelocationPos(null)
                setSearchLocationStatus({ status: 'failed', result: error })
            });
    }

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setRelocationPos(marker.getLatLng())
                }
            },
        }),
        [],
    )

    useEffect(() => {
        if (relocationPos !== null) {
            //console.log(relocationPos);
            searchLatLng(relocationPos.lat, relocationPos.lng)
        }

    }, [relocationPos])

    useEffect(() => {
        if (draggable) {
            toast.success('Si lo deseas, arrastra el marcador azul para modificar la dirección', {
                position: "top-center",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
    }, [draggable])
    const handleCheck = () => {
        setADomicilio((aDomicilio) => !aDomicilio)
    }

    const [stepForm, setStepForm] = useState(0)
    const handleSetService = (cat) => {
        return (text) => {
            setService({
                ...service,
                [cat]: text
            })
        }
    }
    useEffect(() => {
        document.title = "Crear un servicio"
        if (!localStorage.length || !datosSesionFromLocalStorage.emailVerified) {
            navigate('/')
        }
        dispatch(getCats())
        const delay = setTimeout(() => {
            setStepForm(1)
        }, 500)
        return () => clearTimeout(delay)
    }, [])

    useEffect(() => {
        const properties = Object.keys(service)
        for (let i = 0; i < properties.length; i++) {
            if (properties[i] !== 'address' && properties[i] !== 'photos' && properties[i] !== 'location') {
                if (service[properties[i]].length === 0) {
                    setDisabledNext(true)
                    break;
                } else {
                    if (Number(service.max) <= Number(service.min)) {
                        setDisabledNext(true)
                    } else {
                        setDisabledNext(false)
                    }
                }
            }
        }
        if (stepForm === 2) {
            if (!service.address) {
                setDisabledNext(true)
            } else {
                setDisabledNext(false)
            }
        }
    }, [service, stepForm, disabledNext])

    const renderMap = () => {
        if (stepForm === 2) {
            return (<div className="w-full h-full">
                <MapContainer
                    center={position === null ? [51.50084939698666, -0.12458248633773235] : position}
                    zoom={20}
                    scrollWheelZoom={true}
                >
                    <MapConsumer>
                        {(map) => {
                            map.flyTo(position === null ? [51.50084939698666, -0.12458248633773235] : position);
                            map.zoom = 15;
                            return null;
                        }}
                    </MapConsumer>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        position !== null ? <Marker draggable={draggable}
                            eventHandlers={eventHandlers}
                            ref={markerRef} position={position}>
                            <Tooltip direction="top" permanent offset={[-13, -10]}>
                                Ubicación encontrada:<br />
                                <span className="font-semibold text-purple-900">{address}</span>
                            </Tooltip>
                        </Marker> : <div></div>
                    }
                </MapContainer>
            </div>)
        }
    }
    const resumeMap = () => {
        if (stepForm === 3) {
            return (!Array.isArray(service.location) ? <span>Trabajo a domicilio</span>
                : <div className='w-full h-80 bg-gray-500 rounded-xl'>
                    <MapContainer
                        center={service.location}
                        zoom={19}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={service.location} >
                            <Tooltip direction="top" permanent offset={[-13, -10]}>
                                {service.title}:<br />
                                <span className="font-semibold text-purple-900">{service.address}</span>
                            </Tooltip>
                        </Marker>
                    </MapContainer>
                </div>)
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


    const handleCurrency = (obj) => {
        setService({
            ...service,
            currency: obj.name
        })
    }

    const { uidClient } = useParams()

    const addStep = () => {
        if (stepForm < 3) {
            setStepForm(stepForm + 1)
        }
    }
    const decreaseStep = () => {
        if (stepForm > 1) {
            setStepForm(stepForm - 1)
        }
    }

    const [nuevServ, setnuevoServ] = useState(null)

    useEffect(async () => {
        if (stepForm === 3) {
            setLoadingSave(true)
            if (!nuevServ) {
                let nuevoServ = {
                    title: service.title,
                    currency: service.currency,
                    category: service.categorias,
                    description: service.description,
                    max: service.max,
                    min: service.min,
                    uidClient: uidClient,
                    photos: service.photos,
                    location: service.location,
                    address: service.address,
                    homeService: aDomicilio
                }
                try {
                    let serv = await axios.post(`newservice`, nuevoServ)
                    setLoadingSave(false)
                    setnuevoServ(serv.data.servicio)
                } catch (err) {
                    setLoadingSave(false)
                    console.log(err)
                }
            } else {
                setLoadingSave(false)
            }
        }
    }, [stepForm])

    const [link, setLink] = useState("")

    const linkPago = async (uid) => {
        setLoadingPayment(true)
        try {
            let link = await axios.post(`pay-service`, { id: `${uid}` })
            setLink(link.data)
            setLoadingPayment(false)
            //window.open(link.data)
            window.location.href = link.data
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.data,
                icon: 'error',
                confirmButtonText: 'X'
            })
            console.log(err)
        }

    }

    return (
        <div className="container flex justify-center items-center mx-auto w-full bg-gray-400 px-8 py-4">
            <div
                style={{ height: '100%', width: '100%' }}
                className="rounded-md bg-white py-4 px-6 flex flex-col justify-between items-center overflow-y-auto custom-scrollbar">
                <div id="status" className="w-full text-center">
                    <h1 className="text-4xl font-semibold text-cyan-900 mb-6 border-b border-gray-100">Crear un nuevo servicio</h1>
                    <div id="progress-description" className="flex flex-row mb-2">
                        <div id="step1" className="w-full flex justify-center" >
                            <div className={`px-4 rounded-full font-semibold text-white bg-cyan-900 ${stepForm >= 1 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'}`}>
                                <span>Información del servicio</span>
                            </div>
                        </div>
                        <div id="step2" className="w-full flex justify-center" >
                            <div className={`px-4 -ml-3 rounded-full font-semibold text-white bg-cyan-900 ${stepForm >= 2 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'}`}>
                                <span>Ubicación del servicio</span>
                            </div>
                        </div>
                        <div id="step3" className="w-full flex justify-center" >
                            <div className={`px-4 -ml-3 rounded-full font-semibold text-white bg-cyan-900 ${stepForm === 3 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'} transition-all duration-300 inline-flex flex-row`}>
                                {loadingSave && <BiLoader className="self-center animate-spin mr-2" />}
                                <span className="self-center" >Pagar y finalizar</span>
                            </div>
                        </div>
                    </div>
                    <div id='progress' className="w-full flex flex-row transition-all ease-out duration-300 ">
                        <div className="z-40 relative flex w-full h-max">
                            <div className={`z-10 absolute right-0 left-0 m-auto flex justify-center items-center w-8 h-8 rounded-full ${stepForm >= 1 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'} transition-all ease-in-out duration-200`}>
                                <span className="text-center font-semibold self-center">1</span>
                            </div>
                            <div className="absolute -bottom-3 z-0 w-full self-center -my-2">
                                <SimpleProgressBar color="#164E63" status={stepForm >= 1 ? '100%' : '0%'} />
                            </div>
                        </div>

                        <div style={{ marginLeft: '-5px' }} className="z-30 relative flex w-full h-max">
                            <div className={`z-10 absolute right-0 left-0 m-auto flex justify-center items-center w-8 h-8 rounded-full ${stepForm >= 2 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'} transition-all ease-in-out duration-200`}>
                                <span className="text-center font-semibold self-center">2</span>
                            </div>
                            <div className="absolute -bottom-3 z-0 w-full self-center -my-2">
                                <SimpleProgressBar color="#164E63" status={stepForm >= 2 ? '100%' : '0%'} />
                            </div>
                        </div>

                        <div style={{ marginLeft: '-5px' }} className="z-20 relative flex w-full h-max">
                            <div className={`z-10 absolute right-0 left-0 m-auto flex justify-center items-center w-8 h-8 rounded-full ${stepForm >= 3 ? 'bg-cyan-900 text-white' : 'bg-purple-200 text-cyan-900'} transition-all ease-in-out duration-200`}>
                                <span className="text-center font-semibold self-center">3</span>
                            </div>
                            <div className="absolute -bottom-3 z-0 w-full self-center -my-2">
                                <SimpleProgressBar color="#164E63" status={stepForm >= 3 ? '100%' : '0%'} />
                            </div>
                        </div>


                    </div>
                </div>
                <div id='content' className="flex flex-row justify-center items-between mt-9 w-full h-full  px-8">

                    <div id="step1" className={`${stepForm === 0 || stepForm === 1 ? 'flex mt-3' : 'hidden'} w-full`}>
                        <div className="border-r mx-auto w-1/2 pr-6">
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
                                    placeholder="Ingresa una descripción atractiva para vender tu servicio"
                                    callBack={handleSetService('description')}
                                />
                            </div>
                        </div>

                        <div className="w-1/2 mx-auto pl-6">
                            <div className="mb-4 flex w-full">
                                <div className="self-center">
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
                                <div className="self-center">
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

                            </div>
                            <div className="mt-4">
                                <div className="flex mx-4">
                                    <div className="self-center pt-3">
                                        <div className="relative mr-4">
                                            <span className={`absolute -top-5 text-sm font-semibold text-gray-600 select-none cursor-pointer`}>Moneda local:</span>

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

                                    <div className="mx-4">
                                        <span className="font-semibold text-gray-600 text-sm ">Seleccione una categoría:</span>
                                        <div style={{ zIndex: '9999' }}>
                                            {
                                                categoriasDb.length
                                                    ?
                                                    (
                                                        <ListBox
                                                            customBorder="#9CA3AF"
                                                            className="self-center"
                                                            width='15rem'
                                                            options={categoriasDb}
                                                            callBack={(text) => {
                                                                setService({
                                                                    ...service,
                                                                    categorias: [text.name]
                                                                })
                                                            }}
                                                            text="..."
                                                            theme="#0C4A6E"
                                                            includeIconOnDesc
                                                        />
                                                    ) :

                                                    (
                                                        <div style={{ width: '15rem' }} className=" self-center mt-1 px-4 py-2 bg-gray-100 text-black font-semibold rounded-md border-gray-300">
                                                            <span>Cargando...</span>
                                                        </div>
                                                    )}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="step2" className={`${stepForm === 2 ? 'flex flex-col mt-1 justify-start items-center' : 'hidden'} w-full`}>
                        <div className="flex flex-row w-full justify-center">

                            <div className="w-96 lg:w-1/2">
                                <div className="flex flex-col mb-2">
                                    <label htmlFor="editAddres" className={`text-sm mb-2' font-semibold text-gray-600 mr-4 select-none cursor-pointer transition-all ease-in-out duration-300 mb-1`}>
                                        Busca una dirección
                                    </label>
                                    <input

                                        onChange={(e) => { setAddress(e.target.value) }}
                                        value={address}
                                        type="text"
                                        name="editAddress"
                                        id="editAddres"
                                        placeholder="[CALLE Y NO. DE CASA], CIUDAD, ESTADO/PROVINCIA"
                                        className="border border-gray-400 px-2 py-2 overflow-x-auto rounded-md font-medium focus:outline-cyan"
                                />
                                </div>
                            </div>
                            <div className="flex py-2 self-center place-self-center justify-center items-center h-full">
                                <button
                                    onClick={onClickAddress}
                                    className="px-2 bg-cyan-800 hover:bg-cyan-900 inline-flex flex-shrink-0 ml-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-in-out duration-300 text-white">
                                    {searchLocationStatus.status === 'searching' ?
                                        <>
                                            <ImSpinner6 className="mr-2 self-center animate-spin" />
                                            <span className="font-semibold">Buscando...</span></>
                                        :
                                        <><FaSearchLocation className="mr-2 self-center" />
                                            <span className="font-semibold">Buscar ubicación</span></>}
                                </button >
                                <label className="type_option self-center">
                                    <input type="checkbox" name='check'
                                        id='check'
                                        onChange={handleCheck}
                                        value={aDomicilio}
                                        checked={aDomicilio}
                                        disabled={false}
                                    />
                                    <span className="custom_check"></span>
                                    <label htmlFor="check" className="typeText select-none cursor-pointer font-semibold text-gray-900">Disponible para ir a domicilio</label>
                                </label>
                            </div>
                        </div>
                        {/* 51.50084939698666, -0.12458248633773235 */}

                        {renderMap()}

                    </div>
                    <div id="step3" className={`${stepForm === 3 ? 'flex mt-3 justify-start items-start' : 'hidden'} w-full`}>
                        <div className="w-1/2 flex flex-col justify-start items-start  pr-4 border-r border-gray-300">
                            <div className="mb-6 border-b border-gray-300 w-full flex flex-row">
                                <span className='text-xl text-gray-700 font-semibold'>Datos del servicio <span><HiOutlineArrowNarrowRight className="ml-3 inline-flex" /></span></span>
                            </div>
                            <div className="pb-2 mb-2 w-full border-b border-gray-100">
                                <span className='text-md font-semibold text-lg text-cyan-900 mr-3'>Categoría:</span>
                                <span className='text-md text-gray-50 bg-sky-700 px-4 py-0.5 rounded-full font-semibold'>{service.categorias[0]}</span>
                            </div>
                            <div className="pb-2 mb-2 w-full border-b border-gray-100">
                                <span className='text-md font-semibold text-lg text-cyan-900 mr-3'>Titulo:</span>
                                <span className='text-md text-gray-700 font-semibold'>{service.title}</span>
                            </div>
                            <div className="pb-2 mb-2 w-full border-b border-gray-100">
                                <span className='text-md font-semibold text-lg text-cyan-900 mr-3'>Descripción:</span>
                                <span className='text-md text-gray-700 font-semibold'>{service.description}</span>
                            </div>
                            <div className="pb-2 mb-2 w-full border-b border-gray-100 flex flex-row">
                                <div className="mr-4">
                                    <span className='text-md font-semibold text-lg text-cyan-900 mr-3'>Precio mínimo:</span>
                                    <span className='text-md text-gray-700 font-semibold'>${service.min} <span className="text-gray-400">({service.currency})</span> </span>
                                </div>
                                <div className="">
                                    <span className='text-md font-semibold text-lg text-cyan-900 mr-3'>Precio máximo:</span>
                                    <span className='text-md text-gray-700 font-semibold'>${service.max} <span className="text-gray-400">({service.currency})</span> </span>
                                </div>
                            </div>
                            <div className="pb-2 mb-2 w-full border-b border-gray-100 flex flex-row">
                                <div className={`flex flex-row my-0.5 rounded-md px-4 py-1 ${aDomicilio ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'}`}>
                                    {aDomicilio ? <>
                                        <BsStars className="text-lg mr-2 self-center" />
                                        <span className='text-md font-semibold text-lg  mr-3'>Ofreces servicio a domicilio
                                        </span>
                                    </>
                                        :
                                        <>
                                            <BsExclamationLg className="text-lg mr-2  self-center" />
                                            <span className="font-semibold  self-center">
                                                No ofreces servicio a domicilio
                                            </span>
                                        </>}
                                </div>

                            </div>

                            <div className="mt-2 flex flex-row">
                                <span className="font-semibold text-purple-900">- Una vez creada la publicación, puedes modificarla cuando quieras en <span className=" underline">mis servicios</span></span>
                            </div>

                        </div>
                        <div className="w-1/2 pl-4 ">
                            <div className="flex flex-col h-full">
                                {resumeMap()}

                            </div>
                        </div>
                    </div>
                </div>
                <div id="buttons" className="flex w-full flex-row justify-between px-48 border-t border-gray-200 mt-4 pt-4">

                    <Button
                        text="Atrás"
                        customTextColor='#155E75'
                        theme="#E5E7EB"
                        action={decreaseStep}
                        disabled={stepForm === 1 || stepForm === 3}
                    />
                    {stepForm !== 3 && <Button
                        disabled={disabledNext}
                        text="Siguiente"
                        customTextColor="#FFFFF"
                        theme="#155E75"
                        action={addStep}

                    />}
                    {stepForm === 3 && <Button
                        icon={loadingPayment && <BiLoader className="self-center animate-spin mr-2" />}
                        disabled={loadingPayment}
                        text="Continuar en MercadoPago"
                        customTextColor="#FFFFF"
                        theme="#00a5ec"
                        action={() => { linkPago(nuevServ?.id) }}
                    />}

                </div>
            </div>
        </div>
    )
}

export default CreateService
