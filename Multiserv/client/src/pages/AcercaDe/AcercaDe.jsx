import { useNavigate } from "react-router"
import { AiFillHome } from "react-icons/ai"
import Henry from '../../assets/images/henry.png'

export const AcercaDe = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className=" p-2 absolute">
                <button
                    onClick={() => navigate("/")}
                    className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2 mt-3"
                ><AiFillHome size='32' color='white' /></button>
            </div>
            <div className='w-full h-64 bg-blue-800 grid justify-items-center content-center'>
                <h1 className='text-5xl font-black text-white'>Acerca De</h1>
            </div>
            <div className=' w-full h-auto mt-10 flex px-5'>
                <img className='m-0 p-0 rounded-3xl mr-8 shadow-xl' src={Henry} alt='SoyHenry Logo' />
                <div className='h-auto w-full mt-4'>
                    <h2 className='text-3xl pl-4 font-bold text-gray-900'>Nacimiento</h2>
                    <p className='text-lg mt-6 text-gray-800 text-justify px-4'>Henry es un bootcamp Argentino en el cual durante 4 meses enseñan las bases para convertirte en un desarrollador Full Stack y te dan la oportunidad de poner a prueba esos conocimientos en diferentes proyectos (Llamada etapa de labs). Esta consta de un proyecto Individual y un proyecto grupal, Nuestra idea del proyecto grupal nace con la finalidad de poder facilitarle a todas las personas que ofrecen servicios a lo largo y ancho de latinoamerica el uso de la tecnologia y el internet para que los clientes puedan contactarse con ellos generando de una forma mas sencilla su acercamiento.</p>
                </div>
            </div>
            <div className='w-full h-auto mt-8 px-5'>
                <h2 className='text-3xl font-bold text-gray-900 px-4'>¿Cómo Funciona Multiserv?</h2>
                <p className='text-lg mt-6 text-gray-800 text-justify px-4 mb-10'>
                    Multiserv es una plataforma que permite publicar, buscar o agendar servicios, su funcionamiento es muy similar a paginas como mercado libre o olx, ya que esta muestra todos los servicios en la pagina de Homey ademas tambien tiene herramientas de geolocalizacion que permite ubicarte en el mapa y mostrarte que servicios se ubican cerca a ti.
                    <br className='mb-2' />
                    Supongamos que estas necesitando reparar un mueble, o contratar a alguien que limpie, o inclusive alguien que revise el por qué hay un fallo electrico en tu hogar o en tu oficina, todos estos servicios y más los encuentras directamente en la pagina. Ahora si escogemos uno puntualmente como puede ser el mueble, lo unico que tienes que hacer es dirigirte al detalle del servicio y agendar una cita (Estas citas dependen y varian del horario del proveedor del servicio), despues de agendarla tienes que esperar la fecha y la hora, dependiendo si el Servicio tiene un local o trabajan a domicilio, por ultimo despues de exitoso el Servicio, puedes puntearlo segun tu criterio como cliente.
                </p>
            </div>
        </div>
    )
}