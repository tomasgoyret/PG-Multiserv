/** @jsxImportSource @emotion/react */
import Logo from '../../assets/Icons/personalMark.png';
import{servicesId,empatyServicesId,usuarioId,empatyusuarioId} from "../../redux/actions/actions"
import React, { useState,useEffect } from 'react'
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo'
import Nav from "../../Components/Organisms/NavBar/Nav"
import Img from '../../assets/Icons/profile.png'
import Image from '../../Components/Atoms/Image/Image'
import { AiFillHome, AiFillCalendar, AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsFillChatDotsFill} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import s from "../../Components/Organisms/UserProfile/UserProfile.module.css"
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
import StarRating from '../../Components/Atoms/StarRating/StarRating'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const DetalleServicio = () => {
    let {id} = useParams();
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const [verPerfil, setVerPerfil] = useState(false)
    const loading = useSelector((state) => state.loadingServices)
    const servicios = useSelector((state) => state.servicios)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(servicesId(id))
    // },[dispatch,id])
   const servicio = servicios.filter(serv => serv.id === Number(id))
   // servicio retornaba un arreglo 
   console.log(servicio)
   console.log(servicio[0].categorias)
   console.log(servicio.photos)
//     const idUs =servicioID.data[0].usuarioUidClient
//    useEffect(()=>{
//     dispatch(usuarioId(idUs))
//    },[dispatch,idUs])
//   const usuarioID = useSelector((state)=> state.detalleUsuario)

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
    const handleClick = () => {
        setVerPerfil(!verPerfil);
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
                    <div className="w-full flex flex-col h-screen">
                       <div className="px- pt-6 pb-4">
                        <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles de Servicios</h1>
                       </div>

                        <div className="flex border-t border-gray-200 mx-4 my-4 pt-4">
                            <div className="flex">
                             {/* user info */}
                               <div className="p-0.5 rounded-full border-2 border-cyan-800  ">
                                  <div  css={userProfile} className="w-17 h-16 rounded-full " />
                                  <h1 className="font-semibold text-gray-700">Proveedor</h1>
                                  <span className="cursor-pointer inline-flex font-medium text-cyan-800"><Link to={`/detalleProveedor/${servicio}`} >detalle...</Link></span>
                               </div>
                                
                           </div>

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
                                <div className="pt-6 px-4 relative">
                                    <div className="mb-2">
                                         <div className="flex justify-between">
                                           <span className="self-center text-lg font-semibold text-gray-800 w-3/6" >{servicio[0].title}</span>
                                            <div className="self-center inline-flex">
                                             <StarRating rating={servicio[0].rating} />
                                            </div>
                                         </div>
                                        <span className="self-center text-sm font-medium text-gray-500">{`Desde ${servicio[0].min} ${servicio[0].currency} a ${servicio[0].max} ${servicio[0].currency}`}</span>
                                    </div>
                                  <div className="max-h-40 overflow-hidden">
                                    <  p className="text-gray-500 font-normal leading-tight tracking-wide">{`Descripcion :  ${servicio[0].description}`}</p>
                                  </div>
                                <div className="">
                                  <ButtonXartiago
                                     btn="Sacar Turno"
                                     page="detalle/signup"
                                     btnClass="flex justify-center font-semibold inline-flex w-32 text-lg px-4 py-2 bg-green-700 text-gray-50 hover:bg-green-800 active:bg-green-600 rounded-md transition-all ease-in-out duration-300 "
                                  />
                                 </div>
                                
                            </div>
                
                        </div>
  
                    </div>

                </div>
            )
        }
    </div>
    </div>
    )
}

export default DetalleServicio
