/** @jsxImportSource @emotion/react */
import React, { useState,useEffect } from 'react'
import { FaHeartBroken } from 'react-icons/fa'

/* Atoms */
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo'
/* Organisms */
import Nav from "../../Components/Organisms/NavBar/Nav"
/* Assets */
import Img from '../../assets/Icons/profile.png'
/* Icon */
import { AiFillHome, AiFillCalendar, AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsFillChatDotsFill, BsSortAlphaDownAlt, BsSortAlphaUpAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
/* React Hooks */
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { buscar, orderAlph, orderRating, services, resetOrder, filterCats } from '../../redux/actions/actions';
import ServiceCard from '../../Components/Molecules/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router';
import s from "../../Components/Organisms/UserProfile/UserProfile.module.css"
import Input from '../../Components/Atoms/Input/Input';
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
import ListBox from '../../Components/HeadLess/ListBox/ListBox'

const DetalleServicio = () => {
    const loading = useSelector((state) => state.loadingServices)
    const servicios = useSelector((state) => state.servicios)
    const navigate = useNavigate();
    const [verPerfil, setVerPerfil] = useState(false)
    const [buscador, setBuscador] = useState('')
    const [order, setOrder] = useState(null)
    const [filter, setFilter] = useState(null)
    const dispatch = useDispatch()
    const handleBuscador = (texto) => {
        setBuscador(texto)
    }
    useEffect(() => {
        dispatch(services())
    }, [])

    useEffect(() => {
        if (order !== null) {
            if (order.type === 'none') {
                dispatch(resetOrder())
            }
            if (order.type === 'alph') {
                dispatch(orderAlph(order.value))
            }
            if (order.type === 'rat') {
                dispatch(orderRating(order.value))
            }
        }
    }, [order])

    useEffect(() => {
        if (filter !== null) {
            if (filter.value === 'none'){
                dispatch(resetOrder())
            } else{
                dispatch(filterCats(filter.name))
            }
        }
    }, [filter])

    const handleListValue2 = (obj) => {
        setFilter(obj)
    }

    useEffect(() => {
        buscador.length > 0 ? dispatch(buscar(buscador)) : dispatch(resetOrder())
    }, [buscador])

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
    const handleListValue = (obj) => {
        setOrder(obj)
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
        backgroundImage: 'url("https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    }

    const resultadoNombre = validarLogitudNombre(name)
    const modal = (
        verPerfil ?
            <div className={s.UserProfile__OnClick}>
                <img src={foto} alt="" />
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
                       <div className="px-4 pt-6 pb-4">
                        <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Detalles de Servicios</h1>
                       </div>

                        <div className="flex border-t border-gray-200 mx-4 my-4 pt-4">
                            <div className="flex">
                             {/* user info */}
                               <div className="p-0.5 rounded-full border-2 border-cyan-800">
                                  <div  css={userProfile} className="w-10 h-10 rounded-full" />
                               </div>
                               <div className="ml-4 flex flex-col">
                                  <h1 className="font-semibold text-gray-800">Nombre del Proveedor</h1>
                                  <span className="text-sm text-gray-600">datos del proveedor</span>
                                </div>
                           </div>

                           <div className="bg-white relative flex flex-col rounded-b-lg">
                               <div className=" absolute -top-5  px-4 flex w-full justify-between">
                                    <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                                      <span className="text-white">categori</span>
                                    </div>
                                </div>
                                <div className="pt-6 px-4 relative">
                                    <div className="mb-2">
                                         <div className="flex justify-between">
                                           <span className="self-center text-lg font-semibold text-gray-800 w-3/6" >Titulo</span>
                                            <div className="self-center inline-flex">
                                             {/* <StarRating rating={service.rating} /> */}
                                            </div>
                                         </div>
                                        <span className="self-center text-sm font-medium text-gray-500">{`Desde $`}</span>
                                    </div>
                                  <div className="max-h-14 overflow-hidden">
                                    <  p className="text-gray-500 font-normal leading-tight tracking-wide">descripcion ...</p>
                                  </div>
                                <div className="">
                                  <ButtonXartiago
                                     btn="Sacar Turno"
                                     page="home"
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
    )
}

export default DetalleServicio
