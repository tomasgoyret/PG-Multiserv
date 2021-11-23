/* Imagenes e Iconos */
import Logo from '../../assets/Icons/personalMark.png';
import img from '../../assets/images/img1.webp';
/* Atomos */
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo';
/* Moleculas */
import EncWImg from '../../Components/Molecules/EncWImg/EncWImg';
import BarElements from '../../Components/Molecules/BarElements/BarElements';
/* Organismos */
import Nav from '../../Components/Organisms/NavBar/Nav';
import SignIn from '../SignIn/SignIn';
import { useState, useEffect } from 'react';

const LandingPage = () => {

    useEffect(() => {
        document.title = '¡Bienvenido a MultiServicios!'
    }, [])
    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }

    const navArr = [
        <LinkTo linkClass='px-7 text-2xl font-bold text-gray-700' page='about' render='Acerca de' />,
        <LinkTo linkClass='px-7 text-2xl font-bold text-gray-700' page='about' render='Nosotros' />,
        // <ButtonXartiago clase='px-7' btn='Iniciar Sesion'
        //     btnClass='rounded-2xl border-2 border-green-500 px-8 py-1 text-2xl font-bold text-gray-700 hover:bg-green-500 hover:text-white'
        // />
        <div className="px-7">
            <button className="rounded-2xl border-2 border-green-500 px-8 py-1 text-2xl font-bold text-gray-700 hover:bg-green-500 hover:text-white" onClick={handleModal}>Iniciar Sesion</button>
        </div>
    ]
    const buttonArr = [
        <ButtonXartiago page='home' btn='Explorar'
            btnClass='rounded-2xl my-2 border-2 border-green-500 px-8 py-1 text-2xl font-bold text-gray-700 hover:bg-green-500 hover:text-white'
        />,
        <ButtonXartiago page='signup' btn='Registrarse'
            btnClass='rounded-2xl my-2 border-2 border-green-500 px-8 py-1 text-2xl font-bold text-gray-700 hover:bg-green-500 hover:text-white'
        />
    ]
    return (
        <div>
            {
                modal &&
                <SignIn handleModal={handleModal}/>
            }
            <Nav
                clase='flex px-5 py-8 justify-between'
                claseArr='flex items-center'
                imagen={Logo} imgName='Multiserv'
                imgClass='w-20 ml-20 flex items-center'
                arr={navArr}
            />
            
            <div className='mx-28 mt-24 px-14 border-l-4 border-gray-500' >
                <EncWImg clase='flex items-center justify-between' classTitulo='w-96 text-7xl text-gray-700' titulo='Busca, Encuentra, o Publica un Servicio' img={img} imgClass='max-w-1xl' />
                <BarElements clase='flex flex-col' arr={buttonArr} />
            </div>
        </div>
    )
}

export default LandingPage