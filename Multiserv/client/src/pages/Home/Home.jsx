
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsSortAlphaDownAlt, BsSortAlphaUpAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";

import { useEffect, useState } from 'react';
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { buscar, orderAlph, orderRating, services, resetOrder, filterCats, getCats, users, usuarioId } from '../../redux/actions/actions';
import ServiceCard from '../../Components/Molecules/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router';
import Input from '../../Components/Atoms/Input/Input';
import ListBox from '../../Components/HeadLess/ListBox/ListBox'

const Home = () => {
    const loading = useSelector((state) => state.loadingServices)
    const servicios = useSelector((state) => state.servicios)
    const usuarios = useSelector(state => state.usuarios)
    const categorias = useSelector((state) => state.categories)
    const navigate = useNavigate();
    const [buscador, setBuscador] = useState('')
    const [order, setOrder] = useState(null)
    const [filter, setFilter] = useState(null)
    const dispatch = useDispatch()
    

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const handleBuscador = (texto) => {
        setBuscador(texto)
    }

    useEffect(() => {
        if (datosSesionFromLocalStorage) {
            dispatch(usuarioId(datosSesionFromLocalStorage.uid))
        }
    }, [])

    useEffect(() => {
        document.title = "Explorar servicios"
        if (localStorage.length > 0 && !datosSesionFromLocalStorage.emailVerified) {
            navigate('/email-verification')
        }
        dispatch(services())
        dispatch(users())

    }, [])

    useEffect(() => {
        dispatch(getCats())
    }, [loading])

    useEffect(() => {
        if (filter !== null) {
            if (filter.value === 'none') {
                dispatch(services())
            } else {
                dispatch(filterCats(filter.name))
            }
        }
    }, [filter])

    useEffect(() => {
        buscador.length > 0 ? dispatch(buscar(buscador)) : dispatch(services())
    }, [buscador])

    const handleListValue2 = (obj) => {
        setFilter(obj)
    }

    // si necesitan datos de la sesión se encuentran en la variable datosSesionFromLocalStorage

    const handleListValue = (obj) => {
        setOrder(obj)
        if (obj.type === 'none') {
            dispatch(services())
        }
        if (obj.type === 'alph') {
            console.log('Se despacho la accion de tipo:', obj.type)
            dispatch(orderAlph(obj.value))
        }
        if (obj.type === 'rat') {
            console.log('Se despacho la accion de tipo:', obj.type)
            dispatch(orderRating(obj.value))
        }
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
        ...categorias
    ]
    return (
        <>
            {
                loading ? (
                    <div className="w-full flex flex-col h-screen justify-center items-center">
                        <AiOutlineLoading3Quarters className={`text-5xl text-indigo-900 animate-spin`} />
                        <h1 className="text-xl font-semibold text-gray-800 mt-2">Buscando servicios disponibles en tu zona...</h1>
                    </div>
                ) : (
                        <div className="w-full flex flex-col justify-center items-center h-screen">
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


                            {servicios.map((service, index) => ( service.estadoDePago === 'Aprobado' ? 
                                <ServiceCard key={index} service={service} /> : ''
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Home
