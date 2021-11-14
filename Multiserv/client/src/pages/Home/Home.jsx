/* Atoms */
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo'
/* Organisms */
import Nav from "../../Components/Organisms/NavBar/Nav"
/* Assets */
import Img from '../../assets/Icons/ICONO.png'
/* Icon */
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
/* React Hooks */
import { useEffect, useState } from 'react';
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { services } from '../../redux/actions/actions';
import ServiceCard from '../../Components/Molecules/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router';
import s from "../../Components/Organisms/UserProfile/UserProfile.module.css"

const Home = () => {
    const servicios = useSelector((state) => state.servicios)
    const navigate = useNavigate();
    const [verPerfil, setVerPerfil] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(services())
        console.log(servicios)
    }, [])

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    var foto = Img
    if(localStorage.length>0 && datosSesionFromLocalStorage.photoURL){
        console.log("entra",datosSesionFromLocalStorage)
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

    const resultadoNombre = validarLogitudNombre(datosSesionFromLocalStorage.displayName)
    const modal = ( 
        verPerfil ?
        <div className={s.UserProfile__OnClick}>
            <img src={datosSesionFromLocalStorage.photoURL} alt="" />
            <span>{`${resultadoNombre[0]} ${resultadoNombre[1]}`}</span>
            <br />
            <button onClick={logout}>Logout</button>
        </div>
        :
        null)


    return (
        <div className="flex">
            <Nav 
                clase='w-20 h-screen p-4 pt-6 flex flex-col justify-between justify-center bg-blue-900' 
                imgClass='w-16 rounded-full' 
                onClick={handleClick}
                imagen={foto}
                imgName='Logo' 
                arr={arr} 
            />
            {modal}
            <div className="w-full" onClick={handleClick}>
                <ServiceCard />
            </div>
        </div>
    )
}

export default Home