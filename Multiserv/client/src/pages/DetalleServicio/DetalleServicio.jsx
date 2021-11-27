import React, { useState, useEffect } from 'react'
import Img from '../../assets/Icons/profile.png'
import Image from '../../Components/Atoms/Image/Image'
import { AiOutlineLoading3Quarters, AiTwotonePhone, AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai"
import { BsShareFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import s from "../../Components/Organisms/UserProfile/UserProfile.module.css"
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
import StarRating from '../../Components/Atoms/StarRating/StarRating';
import { useParams } from "react-router-dom";
import ReviewService from "../../Components/Organisms/ReviewService/ReviewService";
import WP from '../../assets/images/WhatsApp.png';
import LD from '../../assets/images/LinkedIn.png';
import FB from '../../assets/images/Facebook.png';
import TW from '../../assets/images/Twitter.png';
import { useLocation } from 'react-router'
import axios from 'axios'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import { services, users } from '../../redux/actions/actions'
import ModalAllReviews from '../../Components/Organisms/ModalAllReviews/ModalAllReviews';

const DetalleServicio = () => {
    let { id } = useParams();
    var uid = ""
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    useEffect(() => {
        dispatch(services())
        dispatch(users())
        if (datosSesionFromLocalStorage !=null) {
            name = datosSesionFromLocalStorage.displayName
            uid = datosSesionFromLocalStorage.uid
        }
        if (servicio[0] !== undefined) {
            document.title = `Detalles de ${servicio[0].title}`
        }
        document.title = `Detalle del servcio`

    }, [])

    var idFav = '';
    var value = false;
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const [verPerfil, setVerPerfil] = useState(false)
    const [modalReviews, setModalReviews] = useState(false)
    let loading = useSelector((state) => state.loadingServices)
    const servicios = useSelector((state) => state.servicios)
    const usuarios = useSelector((state) => state.usuarios)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const text = 'El servicio que estabas buscando! Entra y checkea para mas info ';
    const [isFavorite, setIsFavorite] = useState(false)
    const [compartirModal, setCompartirModal] = useState(false)
    const url = `https://pg-multiserv.vercel.app/home/detalleServicio/${id}`;
    const hashTag = 'Servicios ';
    const location = useLocation()
    const current = location.pathname.replace(/\D/g, '')
    let servicio = servicios.filter(serv => serv.id === Number(id))
    let usuario = usuarios.filter(usuario => usuario.uidClient === servicio[0].usuarioUidClient)[0]

    var foto = Img
    if (datosSesionFromLocalStorage != null) {
        foto = datosSesionFromLocalStorage.photoURL
    }

    if (usuario && usuario.phoneNumber) {
        if (usuario.phoneNumber[0] === '+')
            var numberWhastapp = usuario.phoneNumber.slice(1)
    }

    // si necesitan datos de la sesión se encuentran en la variable datosSesionFromLocalStorage

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("datoSesion")
        navigate("/")
    }
    const validarLogitudNombre = (nombre) => {
        let nombres = nombre.split(" ")
        return nombres;
    }
    var name = "Inicia Sesión "
    var uid = ""
    if (datosSesionFromLocalStorage != null) {
        name = datosSesionFromLocalStorage.displayName
        uid = datosSesionFromLocalStorage.uid
    }
    // const contGrad = {
    //     background: 'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)'
    // }
    // const userProfile = {

    //     // backgroundImage: `url(${usuarioID.data.photoURL})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'top center'
    // }
    const seteoFav = () => {
        value = !value;
        agregarFav()
    }
    const agregarFav = async () => {

        if (value === true) {
            const res = await axios.post('agregar-fav', {
                idService: current,
                uidClient: uid
            });
            idFav = res.data.id || res.data[0].id;
            return toast.success('¡Se agregó a tus favoritos!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
        else {
            await axios.delete(`eliminar-fav?id=${idFav}&uidClient=${uid}`)
            return toast.error('Se eliminó de tus favoritos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }

    }
    const resultadoNombre = validarLogitudNombre(name)
    const modal = (
        verPerfil ?
            <div className={s.UserProfile__OnClick}>
                {/* <img src={usuarioID.data.photoURL} alt="" /> */}
                <span>{`${resultadoNombre[0]} ${resultadoNombre[1]}`}</span>
                <br />
                {datosSesionFromLocalStorage ? (<button onClick={logout}>Logout</button>) : (<ButtonXartiago
                    btn="Regresar"
                    page=""
                    clase="w-2/5"
                    btnClass="font-semibold text-gray-50 flex w-full flex-nowrap bg-green-700 p-2 py-2 px-4 justify-center items-center rounded-md"
                />)}
            </div>
            :
            null)

    //let idProveedor = servicioID[0].usuarioUidClient

    const handleModalReviews = () => {
        setModalReviews(!modalReviews);
    }

    return (
        <div className="w-full">
            <div className="flex flex-col">
                {
                    modalReviews &&
                    <div className="w-full h-screen z-10 absolute top-0 left-0" onClick={handleModalReviews}>
                        <ModalAllReviews />
                    </div>
                }

                {modal}
                {
                    loading ? (
                        <div className="w-full flex flex-col h-screen justify-center items-center">
                            <AiOutlineLoading3Quarters className={`text-5xl text-indigo-900 animate-spin`} />
                            <h1 className="text-xl font-semibold text-gray-800 mt-2">Buscando servicios disponibles en tu zona...</h1>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col overflow-y-auto h-screen pb-10">
                            <div className="pt-6 pb-4">
                                <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles de Servicios</h1>
                            </div>

                            <div className="flex border-t border-gray-200 my-4 pt-4 w-full">
                                <div className="bg-white relative flex flex-col rounded-b-lg w-full">
                                    <div className=" absolute -top-5 px-4 flex justify-between">
                                        <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                                            <span className="text-white">{servicio[0].categorias[0] === undefined ? "Sin definir" : servicio[0].categorias[0].title} </span>
                                        </div>
                                    </div>
                                    <Image
                                        loadedHandler={() => {
                                            setLoadingImg(false)
                                            setFailedImg(false)
                                        }}
                                        failedHandler={() => {
                                            setLoadingImg(false)
                                            setFailedImg(true)
                                        }}
                                        name="photo1"
                                        imagen={servicio[0].photos[0]}
                                        imgClass={`object-cover rounded-t-lg w-full h-80 ${loadingImg || failedImg ? 'hidden' : ''}`}
                                    />
                                    <div className='flex flex-row pt-6 px-4 w-full' >
                                        <div className="flex ">
                                            <div className='flex w-96 h-auto border px-4 py-1 mr-5 rounded-lg border-gray-300 shadow-md' >
                                                <div className='w-28 mr-4' >
                                                    <Image
                                                        imagen={usuario && usuario.photoURL}
                                                        name={usuario && usuario.displayName}
                                                        imgClass='rounded-full my-4'
                                                    />
                                                </div>
                                                <div className='flex flex-col justify-center' >
                                                    <span className='text-gray-800 font-bold text-xl font-sans' >{usuario && usuario.displayName}</span><br />
                                                    <div className='w-14 mr-4 flex flex-row space-x-2'>
                                                        {
                                                            datosSesionFromLocalStorage && usuario && usuario.phoneNumber ?
                                                                <a
                                                                    className="flex flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-full font-semibold bg-cyan-700 hover:bg-cyan-800 text-gray-50"
                                                                    href={`tel:${usuario.phoneNumber}`}
                                                                ><AiTwotonePhone className={`text-3xl`} />
                                                                </a> : null}
                                                        {
                                                            datosSesionFromLocalStorage && usuario && usuario.phoneNumber ? <a
                                                                className="flex flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-full font-semibold bg-green-400 hover:bg-green-500 text-gray-50"
                                                                href={` https://wa.me/${numberWhastapp}?text=Me%20interesa%20el%20servicio%20${servicio[0].title}`} target="_blank"

                                                            > <AiOutlineWhatsApp className={`text-3xl`} />
                                                            </a> : null}
                                                        {
                                                            datosSesionFromLocalStorage && usuario && usuario.email ? <a
                                                                className="flex flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-full font-semibold bg-green-700 hover:bg-green-800 text-gray-50"
                                                                href={`mailto:${usuario.email}`}

                                                            > <AiOutlineMail className={`text-3xl`} />
                                                            </a> : null}
                                                    </div>
                                                    {/* <span className='text-gray-800 text-sm font-semibold'>Numero: {usuario && usuario.phoneNumber ? usuario.phoneNumber : 'No especificado'}</span><br />
                                                    <span className='text-gray-800 text-sm font-semibold'>E-mail: {usuario && usuario.email}</span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="mb-2">
                                                <div className="flex justify-between">
                                                    <span className="self-center text-xl font-semibold text-gray-800 w-3/6" >{servicio[0].title}</span>
                                                    <div className="self-center inline-flex">
                                                        <StarRating rating={servicio[0].rating} />
                                                    </div>
                                                </div>
                                                <span className="self-center text-sm font-medium text-gray-500">{`Desde ${servicio[0].min} ${servicio[0].currency} a ${servicio[0].max} ${servicio[0].currency}`}</span>
                                            </div>
                                            <div className="max-h-40 mt-4 overflow-hidden">
                                                <  p className="text-gray-500 font-normal leading-tight tracking-wide">{`Descripcion :  ${servicio[0].description}`}</p>
                                            </div>
                                            <div className="flex mt-4">

                                                {/* Modal de compartir */}
                                                {
                                                    compartirModal &&
                                                    <div className="w-96 h-48  z-10 absolute -top-5 flex flex-col border border-gray-200 bg-white shadow-xl rounded-lg py-5" onMouseLeave={() => setCompartirModal(false)}>
                                                        <div className="w-full flex justify-center h-2/6">
                                                            <span className="text-3xl font-semibold font-sans">MultiServ</span>
                                                        </div>
                                                        <div className="w-full flex justify-center pb-5 h-1/6">
                                                            <span className="text-md font-semibold text-gray-600">comparte en tus redes favoritas!</span>
                                                        </div>
                                                        <div className="w-full flex justify-center items-center h-3/6">
                                                            <a className='mr-2' rel="noopener noreferrer" href={`https://api.whatsapp.com/send?text=${text}${url}`} target="_blank" >
                                                                <Image name="whatsappShareServices" imagen={WP} imgClass={`object-cover rounded-t-lg w-10 h-10 rounded-2xl ${loadingImg || failedImg ? 'hidden' : ''}`} />
                                                            </a>
                                                            <a className='mr-2' rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashTag}`} target="_blank" >
                                                                <Image name="twitterShareServices" imagen={TW} imgClass={`object-cover rounded-t-lg w-10 h-10 ${loadingImg || failedImg ? 'hidden' : ''}`} />
                                                            </a>
                                                            <a className='mr-2' rel="noopener noreferrer" href={`https://www.facebook.com/sharer.php?u=${url}&t=${text}`} target="_blank" >
                                                                <Image name="facebookShareServices" imagen={FB} imgClass={`object-cover rounded-t-lg w-10 h-10 ${loadingImg || failedImg ? 'hidden' : ''}`} />
                                                            </a>
                                                            <a className='mr-2' rel="noopener noreferrer" href={`https://www.linkedin.com/shareArticle?url=${url}`} target="_blank" >
                                                                <Image name="linkedInShareServices" imagen={LD} imgClass={`object-cover rounded-t-lg w-10 h-10 ${loadingImg || failedImg ? 'hidden' : ''}`} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                }
                                                <div>
                                                    <button
                                                        className="flex justify-center items-center mx-2 font-semibold  w-auto text-lg px-4 bg-blue-500 text-gray-50 hover:bg-blue-700 focus:bg-blue-700 rounded-md transition-all ease-in-out duration-300 py-2"
                                                        onClick={() => setCompartirModal(!compartirModal)}
                                                    >
                                                        <BsShareFill className="mx-2" /> Compartir
                                                    </button>
                                                </div>
                                                {
                                                    datosSesionFromLocalStorage &&
                                                    <div className="flex">
                                                        <button className='flex justify-center mx-2 font-semibold  w-auto text-lg px-4 py-2 bg-green-500 text-gray-50 hover:bg-green-700 active:bg-green-600 rounded-md transition-all ease-in-out duration-300' onClick={()=> {return navigate(`/home/${id}/ver-horarios`)}}>
                                                            Pedir Turno
                                                        </button>

                                                        <button
                                                            onClick={seteoFav}
                                                            className="text-3xl text-purple-900 active:outline-none p-2 transition-all ease-in-out duration-300 transform hover:scale-110">
                                                            {isFavorite ?
                                                                <BsSuitHeartFill />
                                                                :
                                                                <BsSuitHeart />
                                                            }
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReviewService handleModalReviews={handleModalReviews} verMasReviews={true} mostrarComentariosReviews={true} limitarRenderizadoEnDetalleServicio={true}/>
                            </div>
                        </div>
                    )}

            </div>

            {/* Modal Compartir */}

        </div>
    )
}

export default DetalleServicio
