import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import Img from '../../../assets/Icons/profile.png'
import LinkTo from '../../Atoms/LinkTo/LinkTo';
import Nav from '../NavBar/Nav';
import { MdEdit, MdFavorite, MdHomeRepairService, MdNotifications } from 'react-icons/md';
import s from "../../Organisms/UserProfile/UserProfile.module.css"
import ButtonXartiago from '../../Atoms/ButtonXartiago/ButtonXartiago';

const HomeNavigation = () => {
    const navigate = useNavigate()
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))

    const [verPerfil, setVerPerfil] = useState(false)
    const handleClick = () => {
        setVerPerfil(!verPerfil);
    }
    const validarLogitudNombre = (nombre) => {
        let nombres = nombre.split(" ")
        return nombres;
    }
    var name = " Invitado"
    var email = ""

    if (localStorage.length > 0 && datosSesionFromLocalStorage.displayName) {
        name = datosSesionFromLocalStorage.displayName
        email = datosSesionFromLocalStorage.email
    }
    const resultadoNombre = validarLogitudNombre(name)
    var foto = Img

    if (localStorage.length > 0 && datosSesionFromLocalStorage.photoURL) {
        foto = datosSesionFromLocalStorage.photoURL
    }

    const arr = [
        <LinkTo linkClass='m-4 flex justify-center' page='home' render={<AiFillHome size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/chat' render={<BsFillChatDotsFill size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='profile' render={<FaUserAlt size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/schedule' render={<AiFillCalendar size='30' color='white' />} />
    ]
    const newService = () => {
        setVerPerfil(false)
        const uid = datosSesionFromLocalStorage.uid
        navigate(`/home/${uid}/new-service`)
    }
    const listFav = () => {
        const uid = datosSesionFromLocalStorage.uid
        navigate(`/home/${uid}/list-favorites`)
    }

    const modal = () => {
        return verPerfil ?
            (
                <div className={s.UserProfile__OnClick}>
                    <div className="flex w-full border-b-2 py-5 pr-2">
                        <img className="mx-2" src={foto} alt="" />
                        <div className="flex flex-col justify-center truncate">
                            <span className="font-semibold text-xl">{`${resultadoNombre[0]} ${resultadoNombre[1]}`}</span>
                            <span className="text-sm text-gray-500 -mt-1">{email}</span>
                        </div>
                    </div>
                    {
                        email !== "" &&
                        <div className="flex flex-col w-full justify-center py-2">
                            <LinkTo page= "profile" render= {
                            <div className="flex my-1 items-center pl-3">
                                <MdEdit className="mr-2" />
                                <span className="font-semibold">Editar Perfil</span>
                            </div>} />
                            <div className="flex my-1 items-center pl-3">
                                <MdNotifications className="mr-2" />
                                <span className="font-semibold">Notificaciones</span>
                            </div>
                            <div onClick={listFav} className="inline-flex w-max auto my-1 items-center px-3 rounded-full hover:bg-sky-900 hover:text-white transition-all">
                                <MdFavorite className="mr-2" />
                                <span className="font-semibold">Lista Favoritos</span>
                            </div>
                            <button onClick={newService} className="inline-flex w-max auto my-1 items-center px-3 rounded-full hover:bg-sky-900 hover:text-white transition-all">
                                <MdHomeRepairService className="mr-2" />
                                <span className="font-semibold">Crear un servicio</span>
                            </button>
                        </div>
                    }
                    {datosSesionFromLocalStorage ? (<div className="flex items-center justify-center w-2/5 mt-3"><button onClick={logout} className="font-semibold text-gray-50 flex w-full flex-nowrap bg-green-700 p-2 py-2 px-4 justify-center items-center rounded-md">Log out</button></div>) : (<ButtonXartiago
                        btn="Regresar"
                        page=""
                        clase="w-2/5 mt-3"
                        btnClass="font-semibold text-gray-50 flex w-full flex-nowrap bg-green-700 p-2 py-2 px-4 justify-center items-center rounded-md"
                    />)}
                </div>
            )
            :
            null
    }
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("datoSesion")
        navigate("/")
    }

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
            {modal()}
            <Outlet />
        </div>
    )
}

export default HomeNavigation
