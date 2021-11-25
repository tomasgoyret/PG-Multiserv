import React, { useState, useEffect } from "react";
import Input from "../../Components/Atoms/Input/Input";
import InputSimple from "../../Components/Atoms/InputSimple/InputSimple";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import Button from "../../Components/Atoms/Button/Button";
import { AiFillHome } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import ReactCountryFlag from "react-country-flag"
import ListBox from '../../Components/HeadLess/ListBox/ListBox';
import { useDispatch, useSelector } from "react-redux";
import { usuarioId } from "../../redux/actions/actions";



const Profile = () => {
    const [editarPerfil, setEditarPerfil] = useState("informacion");
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const { uid, email, displayName, photoURL } = datosSesionFromLocalStorage;
    const [nameUser, lastNameUser] = displayName.split(" ");
    const navigate = useNavigate();
    const [datosPerfil, setDatosPerfil] = useState({
        name: nameUser,
        lastName: lastNameUser,
        email: email,
        photoURL: photoURL,
        phone: "",
    })
    const [countryCode, setCountryCode] = useState("")


    const dispatch = useDispatch()
    useEffect(() => {
        document.title = "Mi perfil"
        dispatch(usuarioId(uid))
    }, [])

    const usuarioPhone = useSelector((state) => state.detalleUsuario.phoneNumber)
    // let telefono = []
    // const separarNum = () =>{
    //     if(usuarioPhone !== undefined){
    //         return telefono = [usuarioPhone.slice(0,3),usuarioPhone.slice(3)]
    //     }
    // }
    // separarNum()     

    const [image, setImage] = useState('');
    // Eliminar usuario
    const eliminarUsuario = (uid) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Al hacer esto perderás todo en tu usuario (servicios, reseñas, citas)",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32C1CD',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar usuario!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                axios(`http://localhost:3005/eliminar-usuario/${uid}`)
                    .then(async response => {
                        await Swal.fire(
                            '¡Eliminado!',
                            '¡Tu usuario se ha eliminado con éxito! Volverás al inicio',
                            'success'
                        )
                        localStorage.removeItem("datoSesion")
                        navigate("/")
                    })
                    .catch(err => {
                        Swal.fire('Cambios no guardados', '', 'info')
                    })
            }
        })
    }

    const handleEliminarUsuario = () => {
        eliminarUsuario(uid)
    }


    // Handlers
    const cambiarAInformacionBasica = () => {
        setEditarPerfil("informacion")
    }

    const cambiarAImagen = () => {
        setEditarPerfil("imagen")
    }

    const handleMailChanges = () => {

    }

    const handleImageChanges = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpload = async () => {
        setLoading2(true)
        // cargarlo a firebase storage
        try {
            const fileRef = ref(storage, `/Profilepic/${image.name}`);
            await uploadBytes(fileRef, image);
            //obtener url de descarga
            const urlDownload = await getDownloadURL(fileRef);
            setDatosPerfil({
                ...datosPerfil,
                photoURL: urlDownload
            })
            setLoading2(false);
        } catch (err) {
            console.log(err)
        }

    }

    const handleChanges = (e) => {
        setDatosPerfil({
            ...datosPerfil,
            [e.target.name]: e.target.value
        })
    }


    const handleUpdate = async () => {
        await actualizarDatosUsuario({
            name: datosPerfil.name,
            lastName: datosPerfil.lastName,
            uid: uid,
            photoURL: datosPerfil.photoURL,
            phone: countryCode+datosPerfil.phone
        })

    }

    const actualizarDatosUsuario = (user) => {
        const { name, lastName, photoURL, uid, phone } = user;
        setLoading(true)
        axios.put(`http://localhost:3005/editar-usuario/${uid}`, {
            name,
            lastName,
            photoURL,
            uid,
            phone
        })
            .then(response => {
                setLoading(false)
                console.log(response);
                localStorage.setItem("datoSesion", JSON.stringify({
                    ...datosSesionFromLocalStorage,
                    displayName: response.data.usuarioActualizado.displayName,
                    photoURL: response.data.usuarioActualizado.photoURL

                }))
                Swal.fire(
                    '¡Actualizado!',
                    'Tu información se ha actualizado con éxito.',
                    'success'
                )

                navigate('/home');
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
                let mensaje = ""
                error.response.data.includes("the provided phone number already exists") ? mensaje = "El teléfono ingresado ya existe" : mensaje = "Hubo un problema con el numero ingresado, intenta con otro"
                    Swal.fire({
                        title: 'Error!',
                        text: mensaje,
                        icon: 'error',
                        confirmButtonText: 'X'
                    })
                    console.log(error.response)
            })
    }

    const options = [
        {
            name: '+52',
            icon: <ReactCountryFlag

                countryCode="MX"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
        {
            name: '+54',
            icon: <ReactCountryFlag

                countryCode="AR"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
        {
            name: '+57',
            icon: <ReactCountryFlag

                countryCode="CO"
                style={{
                    width: '18px',
                    height: '18px',
                    alignSelf: 'center'
                }}
                svg
            />
        },
    ]

    const handleCountry = (obj) => {
        setCountryCode(obj.name)
    }

    return (
        <div className="w-full h-screen ">
            <div className={`bg-gray-700 flex w-full h-44 justify-center items-end`}>
                <div className="w-full flex h-14 absolute top-0">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex  text-gray-50 text-3xl font-semibold justify-center items-center ml-3"
                    ><AiFillHome size='28' color='white' /></button>
                </div>
                {/* Imagen de perfil */}
                <div className="w-40 h-40 border-2 absolute top-24 rounded-full bg-gray-50" style={{ backgroundImage: `url(${datosPerfil.photoURL})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>

                </div>
                <h2 className="absolute top-64 mt-1 text-xl font-semibold" >{`${datosPerfil.name} ${datosPerfil.lastName}`}</h2>
            </div>
            <div className="flex justify-around w-full h-72 mt-32">
                <div className=" h-100 w-1/5 rounded-md ml-2 ">
                    <div className="w-full py-3 px-5 hover:bg-gray-100 border-l-4 my-2" onClick={cambiarAInformacionBasica}>
                        <button className="font-semibold text-md text-gray-600 hover:text-gray-900 active:text-gray-900">Perfil</button>
                    </div>
                    <div className="w-full py-3 px-5 hover:bg-gray-100 border-l-4 my-2" onClick={cambiarAImagen}>
                        <button className="font-semibold text-md text-gray-600 hover:text-gray-900">Imagen de perfil</button>
                    </div>
                    <div className="w-full py-3 px-5 hover:bg-red-100 border-l-4 my-2" onClick={handleEliminarUsuario}>
                        <button className="font-semibold text-md text-red-600 ">Eliminar cuenta</button>
                    </div>
                    <div className="w-full mt-14">

                        <button
                            className="flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-green-800 hover:bg-green-900 text-gray-50"
                            onClick={handleUpdate}
                        >
                            {loading && <ImSpinner9 className="mr-2 animate-spin" />} Guardar
                        </button>
                    </div>
                </div>

                <div className="border-2 h-auto w-3/4 rounded-md mr-2 px-5">
                    {
                        editarPerfil === "informacion" &&
                        <div className="w-100 h-full flex flex-col justify-center">
                            <h2 className="source-sans text-xl font-semibold px-3 pb-1">Información basica</h2>
                            <div className="w-100 flex">
                                <div className="w-1/2 my-2 px-4 flex flex-col">
                                    <label htmlFor="name" className="text-sm mb-2 font-semibold text-gray-600 mr-4 select-none cursor-pointer">
                                        Nombre:
                                    </label>
                                    <input
                                        className="border border-gray-400 p-2 rounded-md font-medium"
                                        type="text"
                                        id="name"
                                        value={datosPerfil.name}
                                        onChange={handleChanges}
                                        name="name"
                                    />
                                    <div className="flex w-full justify-end">
                                        <span className="text-sm text-gray-400">{`${datosPerfil.name.length}/30`}</span>
                                    </div>
                                </div>
                                {/* Boton apellido */}
                                <div className="w-1/2 my-2 px-4 flex flex-col">
                                    <label htmlFor="lastName" className="text-sm mb-2 font-semibold text-gray-600 mr-4 select-none cursor-pointer">
                                        Apellido:
                                    </label>
                                    <input
                                        className="border border-gray-400 p-2 rounded-md font-medium"
                                        type="text"
                                        id="lastName"
                                        value={datosPerfil.lastName}
                                        onChange={handleChanges}
                                        name="lastName"
                                    />
                                    <div className="flex w-full justify-end">
                                        <span className="text-sm text-gray-400">{`${datosPerfil.lastName.length}/30`}</span>
                                    </div>
                                </div>
                                {/* Boton teléfono */}
                                <div className="mb-4">
                                    <div className="pt-2 pl-4">
                                        <div className="flex flex-col relative w-full">
                                            <span className={`absolute -top-3 text-sm font-semibold text-gray-600 mr-4 select-none cursor-pointer`}>Teléfono registrado: {usuarioPhone}</span>
                                            <div className="flex flex-row mt-1">
                                                <ListBox
                                                    customBorder="#9CA3AF"
                                                    className="self-center"
                                                    width='6.4rem'
                                                    options={options}
                                                    value={datosPerfil.country}
                                                    callBack={handleCountry}
                                                    text="..."
                                                    theme="#0C4A6E"
                                                    includeIconOnDesc
                                                />
                                                <div className="self-center">
                                                    <input
                                                        className="border border-gray-400 p-2 rounded-md font-medium"
                                                        type="tel"
                                                        id="phone"
                                                        value={datosPerfil.phone}
                                                        onChange={handleChanges}
                                                        name="phone"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="source-sans text-xl font-semibold px-3 pt-3 pb-1">Información de contacto</h2>
                            <div className="w-1/2 text-gray-500">
                                <InputSimple className="W-1/2"
                                    type="email"
                                    id="email"
                                    theme="#164E63"
                                    label="Email:"
                                    value={datosPerfil.email}
                                    flexed
                                    callBack={handleMailChanges}
                                    disabled={"disabled"}
                                />
                            </div>

                        </div>
                    }
                    {
                        editarPerfil === "imagen" &&
                        <div>
                            <div className="w-full">
                                <h2 className="source-sans text-xl font-semibold px-3 pb-1 pt-2">Foto de perfil</h2>
                                <div className="w-1/2 mb-2">
                                    <input
                                        className="border border-gray-400 p-2 rounded-md font-medium"
                                        type="file"
                                        id="file"
                                        theme="#164E63"
                                        label="Imagen de perfil:"
                                        onChange={handleImageChanges}
                                    />
                                </div>
                                <button
                                    className="flex flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-green-800 hover:bg-green-900 text-gray-50"
                                    onClick={handleUpload}
                                >
                                    {loading2 && <ImSpinner9 className="mr-2 animate-spin" />} Subir
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;