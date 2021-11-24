import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getCats } from '../../redux/actions/actions';
import Input from '../../Components/Atoms/Input/Input';
import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from "react-country-flag"
import ListBox from '../../Components/HeadLess/ListBox/ListBox';
import SimpleProgressBar from '../../Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import Button from '../../Components/Atoms/Button/Button';
import { FaPlus, FaTimes } from "react-icons/fa";
import Image from '../../Components/Atoms/Image/Image';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BiLoader } from "react-icons/bi";
import Swal from 'sweetalert2';
import { ImSpinner9 } from "react-icons/im";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { BsCloudArrowUpFill, BsCloudCheckFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";

const CreateService = () => {
    const [disabledNext, setDisabledNext] = useState(true)
    const categoriasDb = useSelector((state) => state.categories)
    const [loadingSave, setLoadingSave] = useState(false);
    const [uploadImg, setuploadImg] = useState(false);
    const [imageOnCloud, setImageOnCloud] = useState(false)
    const [failedUpload, setFailedUpload] = useState(false)
    const [loadingPayment, setLoadingPayment] = useState(false);
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
        img:[]
    })

    const [imageToLoad, setImageToLoad] = useState('');
    const [loadedImg, setLoadedImg] = useState(false)
    const [img, setImg] = useState(null)
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
        const isFalsy = Object.values(service).some(value => {
            if (!value) {
                return true;
            }
            return false;
        });
        if (isFalsy) {
            setDisabledNext(true)
        } else {
            setDisabledNext(false)
        }
    }, [service])
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

    const handleImage = async (e) => {
        //detectar el archivo
        setImageToLoad(e.target.files[0]);
        setImg(URL.createObjectURL(e.target.files[0]));  
        setLoadedImg(true); 

    }
    const handleUpload= async () => {
          // cargarlo a firebase storage
          setuploadImg(true)

        try {
            const fileRef= ref(storage, `/PhotosServices/${imageToLoad.name}`);
            await uploadBytes(fileRef, imageToLoad);
            //obtener url de descarga
            const urlDownload = await getDownloadURL(fileRef);   
            setImageOnCloud(true)
            setFailedUpload(false)
            setService({
                ...service,
                img: [urlDownload]
            })   
            setuploadImg(false);
            setDisabledNext(false)
            } catch(err){
               console.log(err)
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error. Vuelve a intentarlo',
                icon: 'error',
                confirmButtonText: 'X'
            })
            setImageOnCloud(false)
            setFailedUpload(true)
            }

    }
    
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

    useEffect(async ()=>{
            if (stepForm === 3){
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
                        photos: [service.img]
                    }
                    try {
                        let serv = await axios.post(`newservice`, nuevoServ)
                        setLoadingSave(false)
                        setnuevoServ(serv.data.servicio)
                        console.log("se creó el servicio")
                    } catch (err) {
                        setLoadingSave(false)
                        console.log(err)
                    }
                } else {
                    setLoadingSave(false)
                }
            }
    },[stepForm])
    useEffect(() => {
        if (stepForm === 2 && !loadedImg) {
            setDisabledNext(true)
        }
    }, [disabledNext, stepForm, loadedImg])
    const [link, setLink] = useState("")

    const linkPago = async (uid) => {
        setLoadingPayment(true)
        try {
            let link = await axios.post(`pay-service`, {id : `${uid}`})
            setLink(link.data)
            setLoadingPayment(false)
            //window.open(link.data)
            window.location.href = link.data
            console.log(link.data)
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
                                <span>Imagen de portada</span>
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
                <div id='content' className="flex flex-row justify-center items-between mt-9 w-full h-full px-8">

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
                                    placeholder="Ingresa tus apellidos"
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
                                                    
                    <div id="step2" className={`${stepForm === 2 ? 'flex mt-3 justify-center items-center' : 'hidden'} w-full`}>
                        {loadedImg ?
                        <div className="flex flex-col">
                                <div className="h-full overflow-y-hidden relative">
                                    <div className="absolute top-0 right-0">
                                        {!uploadImg && !imageOnCloud && <button
                                            className="p-2"
                                            onClick={() => {
                                                setLoadedImg(false)
                                                setImg(null)
                                            }}
                                        >
                                            <FaTimes className="text-lg text-white" />
                                        </button>}
                                    </div>
                                    <div className="absolute w-1/2 h-1/2 flex justify-center items-center m-auto top-0 left-0 bottom-0 right-0">
                                        <div className="relative">
                                            <div style={{ animation: uploadImg ? 'spin 5s linear infinite' : 'none' }} className={`border-2 ${uploadImg && 'border-dashed'} w-16 h-16 rounded-full`}>
                                            </div>
                                            <button
                                                onClick={handleUpload}
                                                disabled={uploadImg || imageOnCloud}
                                                className={`flex justify-center items-center absolute w-16 h-16 m-auto top-0 left-0 rounded-full text-white text-3xl ${uploadImg || imageOnCloud && 'cursor-not-allowed'} `}>
                                                {imageOnCloud ? <BsCloudCheckFill className="self-center" />
                                                    : <BsCloudArrowUpFill className="self-center" />}
                                                {failedUpload && <AiFillExclamationCircle />}
                                            </button>
                                        </div>
                                    </div>
                                    <Image
                                        name="photo1"
                                        imagen={img}
                                        imgClass={`object-cover rounded-lg h-72`}
                                    />
                                </div>


                                <div className="flex flex-row justify-center items-center">
                                    <div
                                        className={`inline-flex flex-nowrap py-0.5 px-4 mt-1 justify-center items-center rounded-md font-semibold ${!uploadImg && !failedUpload && 'bg-blue-900'} ${uploadImg && 'bg-green-800 '} ${failedUpload && 'bg-red-800 '} text-gray-50`}
                                    >
                                        {uploadImg && <> <ImSpinner9 className="mr-2 animate-spin" /> Cargando foto...</>}
                                        {!uploadImg && !failedUpload && !imageOnCloud && <> <IoMdInformationCircle className="mr-2" /> Haz click en el botón para cargar imagen</>}
                                        {imageOnCloud && <> <IoMdInformationCircle className="mr-2" /> Se cargó con éxito, haz click en siguiente</>}
                                        {failedUpload && <> <IoMdInformationCircle className="mr-2" /> No se pudo cargar la imagen</>}
                                    </div>
                                </div>
                            </div>
                            :
                            (
                                <>
                        <input
                                        onChange={handleImage}
                            type="file"
                            name="foto5"
                            id="foto5"
                            accept="image/jpeg"
                            className="inputfile" />

                        <label htmlFor="foto5" className="hover:border-transparent hover:shadow-lg hover:bg-white focus:outline-none rounded-lg border-2 border-dashed text-indigo-300 border-indigo-200 hover:text-green-600 flex flex-col items-center justify-center p-4 mx-0 sm:mr-4 mb-2 sm:mb-0 transition-all duration-500 ease-in-out cursor-pointer w-full h-full">
                            <FaPlus className="text-4xl" />
                            <span className="google-sans font-semibold block">Haz click para agregar una foto</span>
                        </label>
                                </>
                            )}
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

                        </div>
                        <div className="w-1/2 pl-4 ">
                            <div className="flex flex-col h-full">
                                <div className="mb-3 border-b border-gray-300 flex flex-row">
                                    <span className='text-md font-semibold text-xl text-cyan-900'>Imagen de portada <HiOutlineArrowNarrowRight className="ml-3 inline-flex" /></span>
                                </div>
                                <div className="">
                                    <Image
                                        name="photo1"
                                        imagen={img}
                                        imgClass={`object-cover rounded-lg h-64 `}
                                    />
                                </div>
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
                        disabled={stepForm === 1}
                    />
                    {stepForm !== 3 && <Button
                        disabled={disabledNext || (stepForm === 2 && img === null)}
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
                        action={()=>{linkPago(nuevServ.id)}}
                    />}

                </div>
            </div>
        </div>
    )
}

export default CreateService
