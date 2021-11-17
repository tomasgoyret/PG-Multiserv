/* Atoms */
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo'
/* Organisms */
import Nav from "../../Components/Organisms/NavBar/Nav"
/* Assets */
import Img from '../../assets/Icons/profile.png'
/* Icon */
import { AiFillHome, AiFillCalendar, AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillChatDotsFill, BsSortAlphaDownAlt, BsSortAlphaUpAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { MdEdit, MdNotifications, MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
/* React Hooks */
import { useEffect, useState } from 'react';
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { buscar, orderAlph, orderRating, services, resetOrder, filterCats } from '../../redux/actions/actions';
import ServiceCard from '../../Components/Molecules/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router';
import s from "../../Components/Organisms/UserProfile/UserProfile.module.css"
import Input from '../../Components/Atoms/Input/Input';
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
import ListBox from '../../Components/HeadLess/ListBox/ListBox'

const Home = () => {
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
    const options = [
        {
            name: 'Sin ordenar',
            type: 'none',
            value: 'none',
            icon: <AiFillStar className="text-xl" />
        },
        {
            name: 'Alfabético (ascendente)',
            type: 'alph',
            value: 'asc',
            icon: <BsSortAlphaUpAlt className="text-xl" />
        },
        {
            name: 'Alfabético (descendente)',
            type: 'alph',
            value: 'desc',
            icon: <BsSortAlphaDownAlt className="text-xl" />
        },
        {
            name: 'Por calificación (menor a mayor)',
            type: 'rat',
            value: 'asc',
            icon: <BsSortDownAlt className="text-xl" />
        },
        {
            name: 'Por calificación (mayor a menor)',
            type: 'rat',
            value: 'desc',
            icon: <BsSortDown className="text-xl" />
        },
    ]
    const optionsFilter = [
        {
            name: 'Sin filtrar',
            value: 'none'
        },
        {
            name: 'Carpintería',
            value: 'Carpintería'
        },
        {
            name: 'Peluquería',
            value: 'Peluquería'
        },
        {
            name: 'Limpieza',
            value: 'Limpieza'
        },
        {
            name: 'Herrería',
            value: 'Herrería'
        },
        {
            name: 'Abogacía',
            value: 'Abogacía'
        },
        {
            name: 'Electricista',
            value: 'Electricista'
        },
        {
            name: 'Mantenimiento',
            value: 'Mantenimiento'
        },
    ]
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

    const resultadoNombre = validarLogitudNombre(name)
    const modal = (
        verPerfil ?
            <div className={s.UserProfile__OnClick}>
                <div className="flex w-full border-b-2 py-5 pr-2">
                    <img className="mx-2" src={foto} alt="" />
                    <div className="flex flex-col justify-center truncate">
                        <span>{`${resultadoNombre[0]} ${resultadoNombre[1]}`}</span>
                        <span>{datosSesionFromLocalStorage.email}</span>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center py-2">
                    <div className="flex my-1 items-center pl-3">
                        <MdEdit className="mr-2"/>
                        <span>Editar Perfil</span>
                    </div>
                    <div className="flex my-1 items-center pl-3">
                        <MdNotifications className="mr-2" />
                        <span>Notificaciones</span>
                    </div>
                    <div className="flex my-1 items-center pl-3">
                        <MdFavorite className="mr-2" />
                        <span>Lista Favoritos</span>
                    </div>
                </div>
                {datosSesionFromLocalStorage ? (<button onClick={logout}>Log out</button>) : (<ButtonXartiago
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
                        <div style={{ zIndex: 500 }} className="flex flex-row filter drop-shadow-md bg-white">
                            <Input
                                theme="#0C4A6E"
                                label="Buscar por nombre"
                                placeholder='Buscar...'
                                type='text'
                                id='buscar'
                                callBack={handleBuscador}
                            />
                            <div className="self-center flex flex-row">
                                <span className="text-gray-600 self-center font-medium">Ordenar por: </span>
                                <ListBox
                                    className="border-gray-400"
                                    options={options}
                                    callBack={handleListValue}
                                    text="Selecciona una opción..."
                                    theme="#0C4A6E"
                                />
                            </div>
                            <div className="self-center flex flex-row">
                                <span className="text-gray-600 self-center font-medium">Filtrar por: </span>
                                <ListBox
                                    className="border-gray-400"
                                    options={optionsFilter}
                                    callBack={handleListValue2}
                                    text="Selecciona una opción..."
                                    theme="#0C4A6E"
                                />
                            </div>
                        </div>
                        <div style={{ scrollBehavior: 'smooth' }} className=" flex flex-row flex-wrap h-full overflow-y-auto">

                            {servicios.map((service, index) => (
                                <ServiceCard key={index} service={service} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home