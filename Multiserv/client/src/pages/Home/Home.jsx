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
import { useEffect } from 'react';
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { services } from '../../redux/actions/actions';

const Home = () => {
    const servicios = useSelector((state) => state.servicios)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(services())
    }, [])
    console.log(servicios)
    const arr = [
        <LinkTo linkClass='m-4 flex justify-center' page='home' render={<AiFillHome size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/chat' render={<BsFillChatDotsFill size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/profile' render={<FaUserAlt size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/schedule' render={<AiFillCalendar size='30' color='white' />} />
    ]

    return (
        <div>
            <Nav clase='w-20 h-screen p-4 pt-6 flex flex-col justify-between justify-center bg-gray-800' imgClass='w-16' imagen={Img} imgName='Logo' arr={arr} />
        </div>
    )
}

export default Home