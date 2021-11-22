/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import Img from '../../assets/Icons/profile.png'
import Image from '../../Components/Atoms/Image/Image'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
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

const DetalleServicio = () => {
    let { id } = useParams();
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const [verPerfil, setVerPerfil] = useState(false)
    const loading = useSelector((state) => state.loadingServices)
    const servicios = useSelector((state) => state.servicios)
    const usuarios = useSelector((state) => state.usuarios)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const text = 'El servicio que estabas buscando! Entra y checkea para mas info ';
    /* const url = `https://pg-multiserv-1tjesmtjz-tomasgoyret.vercel.app/home/detalleServicio/${id}`; */
    const url = `https://pg-multiserv-1tjesmtjz-tomasgoyret.vercel.app/home`;
    const hashTag = 'Servicios ';
    const location = useLocation()
    const current = location.pathname.replace(/\D/g, '')

    console.log(id) // Esto es lo mismo
    console.log(current) // Esto es lo mismo

    const servicio = servicios.filter(serv => serv.id === Number(id))
    const usuario = usuarios.filter(usuario => usuario.uidClient === servicio[0].usuarioUidClient)[0]

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    var foto = Img
    if (localStorage.length > 0 && datosSesionFromLocalStorage.photoURL) {
        foto = datosSesionFromLocalStorage.photoURL
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
    if (localStorage.length > 0 && datosSesionFromLocalStorage.displayName) {
        name = datosSesionFromLocalStorage.displayName
    }
    const contGrad = {
        background: 'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)'
    }
    const userProfile = {

        // backgroundImage: `url(${usuarioID.data.photoURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    }
    const agregarFav = async () => {
        await axios.post('http://localhost:3005/agregar-fav', {
            idService: current,
            uidClient: usuario.uidClient
        })
        return alert('Agregado a Favoritos')

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

    return (
        <div>
            <div className="flex">
                {modal}
                {
                    loading ? (
                        <div className="w-full flex flex-col h-screen justify-center items-center">
                            <AiOutlineLoading3Quarters className={`text-5xl text-indigo-900 animate-spin`} />
                            <h1 className="text-xl font-semibold text-gray-800 mt-2">Buscando servicios disponibles en tu zona...</h1>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col overflow-y-auto h-screen">
                            <div className="px- pt-6 pb-4">
                                <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles de Servicios</h1>
                            </div>

                            <div className="flex border-t border-gray-200 mx-4 my-4 pt-4">
                                <div className="bg-white relative flex flex-col rounded-b-lg">
                                    <div className=" absolute -top-5  px-4 flex w-full justify-between">
                                        <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                                            <span className="text-white">{servicio[0].categorias[0].title} </span>
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
                                        imgClass={`object-cover rounded-t-lg w-100 h-80 ${loadingImg || failedImg ? 'hidden' : ''}`}
                                    />
                                    <div className='flex flex-row pt-6 px-4 justify-around' >
                                        <div>
                                            <div className='flex w-96 h-auto border px-4 py-1 mr-5 rounded-2xl border-gray-600' >
                                                <div className='w-28 mr-4' >
                                                    <Image
                                                        imagen='https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg'
                                                        name={usuario.displayName}
                                                        imgClass='rounded-full my-4'
                                                    />
                                                </div>
                                                <div className='flex flex-col justify-center' >
                                                    <span className='text-gray-800 font-bold text-lg' >{usuario.displayName}</span><br />
                                                    <span className='text-gray-800 text-sm font-semibold'>Numero: {!usuario.phoneNumber ? 'No especificado' : usuario.phoneNumber}</span><br />
                                                    <span className='text-gray-800 text-sm font-semibold'>E-mail: {usuario.email}</span>
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
                                                <button className='flex justify-center ml-2 font-semibold  w-auto text-lg px-4 py-1 bg-green-500 text-gray-50 hover:bg-green-700 active:bg-green-600 rounded-md transition-all ease-in-out duration-300' >
                                                    Pedir Turno
                                                </button>
                                                <button onClick={agregarFav} className="flex justify-center ml-2 font-semibold w-auto text-lg px-4 py-1 bg-yellow-600 text-gray-50 hover:bg-yellow-700 active:bg-green-600 rounded-md transition-all ease-in-out duration-300 ">
                                                    Añadir favorito
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReviewService />
                            </div>
                        </div>
                    )}
            </div>


        </div>
    )
}

export default DetalleServicio
