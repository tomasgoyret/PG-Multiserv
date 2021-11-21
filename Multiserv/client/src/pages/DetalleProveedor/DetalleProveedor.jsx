/** @jsxImportSource @emotion/react */
import Logo from '../../assets/Icons/personalMark.png';
import{usuarioId,empatyusuarioId} from "../../redux/actions/actions"
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
import ServiceCard from '../../Components/Molecules/ServiceCard/ServiceCard';
import StarRating from '../../Components/Atoms/StarRating/StarRating'
import { useParams } from "react-router-dom";
const DetalleProveedor = () => {
    let {id} = useParams();
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const [verPerfil, setVerPerfil] = useState(false)
    const loading = useSelector((state) => state.loadingProveedorDetalle)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    console.log(id)
   useEffect(()=>{
    dispatch(usuarioId(id))
   },[dispatch,id])
   
  const proveedorId = useSelector((state)=> state.detalleUsuario)
  console.log(proveedorId)

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    var foto = Img
    if (localStorage.length > 0 && datosSesionFromLocalStorage.photoURL) {
        foto = datosSesionFromLocalStorage.photoURL
    }
    // si necesitan datos de la sesión se encuentran en la variable datosSesionFromLocalStorage
    const arr = [
        <LinkTo linkClass='m-4 flex justify-center' page='home' render={<AiFillHome size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/chat' render={<BsFillChatDotsFill size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/profile' render={<FaUserAlt size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/schedule' render={<AiFillCalendar size='30' color='white' />} />
    ]

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
            <Nav
                clase='w-20 h-screen p-4 pt-6 flex flex-col justify-between justify-center bg-blue-900'
                imgClass='w-16 rounded-full cursor-pointer'
                imgOnClick={handleClick}
                imagen={foto}
                imgName='Logo'
                arr={arr}
            />
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
                        <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles</h1>
                       </div>

                        <div className="flex border-t border-gray-200 mx-4 my-4 pt-4">
                           

                           <div className="bg-white relative flex flex-col rounded-b-lg">
                               <div className=" absolute -top-5  px-4 flex w-full justify-between">
                                    <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                                      <span className="text-white">{proveedorId.displayName}</span>
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
                                    //imagen={usuarioID}
                                    imgClass={`object-cover rounded-t-lg w-100 h-80 ${loadingImg || failedImg ? 'hidden' : ''}`}
                                />
                                <div className="pt-6 px-4 relative">
                                    <div className="mb-2">
                                         <div className="flex justify-between">
                                           <span className="self-center text-lg font-semibold text-gray-800 w-3/6" >{proveedorId.displayName}</span>
                                            <div className="self-center inline-flex">
                                             {/* <StarRating rating={usuarioID} /> */}
                                            </div>
                                         </div>
                                        <span className="self-center text-sm font-medium text-gray-500">{`correo ${proveedorId.email}`}</span>
                                    </div>
                                  <div className="max-h-40 overflow-hidden">
                                    <  p className="text-gray-500 font-normal leading-tight tracking-wide">{`celular :  ${proveedorId.phoneNumber}`}</p>
                                  </div>


                                  <div className="px- pt-6 pb-4">
                                   <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles de sus servicios</h1>
                                  </div>


                                  <div style={{ scrollBehavior: 'smooth' }} className=" flex flex-row flex-wrap h-full overflow-y-auto">

                             {/* {( proveedorId.servicios?.map((service, index) => (
                              <ServiceCard key={index} service={service} />
                                )))}
                              */}
                               </div>

                                <div className="">
                                  <ButtonXartiago
                                     btn="volver"
                                     page="/home"
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

export default DetalleProveedor