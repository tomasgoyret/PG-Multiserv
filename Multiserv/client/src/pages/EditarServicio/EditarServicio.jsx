/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { getCats, servicesId, updateService } from '../../redux/actions/actions';
import ReactCountryFlag from "react-country-flag"
import { storage } from "../../Firebase";
import { MapContainer, MapConsumer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "@firebase/storage";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlinePhotograph, HiPencil } from "react-icons/hi";
import { BsCloudArrowUpFill, BsCloudCheckFill } from "react-icons/bs";
import { FaPlus, FaTimes } from "react-icons/fa";
import ListBox from '../../Components/HeadLess/ListBox/ListBox';
import { toast } from 'react-toastify';
import { RiLoaderFill } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { ImSpinner6, ImSpinner9 } from "react-icons/im";
import { FaSearchLocation } from "react-icons/fa";
import { popup } from "leaflet";
import Swal from "sweetalert2";
import { MdMyLocation } from "react-icons/md";
import { BsStars, BsExclamationLg } from "react-icons/bs";


const EditarServicio = () => {
  /*
  Modificar en caso de ser necesario el state 'servicio' por el servicio traido con el id, linea 121
  función 'saveEdit' para actualizar los datos del servicio en línea 152

  datos que reciben los inputs = {
    title: "titulo del servicio",
    id: 11,
    categorias: ["Limpieza"],
    currency: 'MXN',
    description: "Datos",
    estadoDePago: 'Aprobado',
    max: 250,
    min: 20
  }
  */
  const popUp = useRef(null);
  const markerRef = useRef(null)
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriasDb = useSelector((state) => state.categories)
  const servicioAntiguo= useSelector((state) => state.detalleServicio)
  const loadingService = useSelector((state)=> state.loadingServicesDetalle)
  const [loadingPortada, setLoadingPortada] = useState(true)
  const [failedPortada, setFailedPortada] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [searchingAddress, setSearchingAddress] = useState({ status: 'not searching' })
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState('')
  const [disableCancelSave, setDisableCancelSave] = useState(false)
  const [draggable, setDraggable] = useState(false)
  /*BOOLEANO QUE MUESTRA/OCULTA LOS INPUTS*/
  const [editing, setEditing] = useState(false)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  useEffect(() => {
    if (position !== null) {
      //console.log(position);
      searchLatLng(position.lat, position.lng)
    }

  }, [position])
  useEffect(() => {
    if (draggable) {
      toast.success('Arrastra el marcador para modificar la dirección', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    }
  }, [draggable])
  /*OBJETO QUE RECIBE LA IMAGEN DE PORTADA:
  {
    url: URL.createObjectURL(e.target.files[0]),
    img: e.target.files[0],
    status: 'pending'
  }
  */
  const [cover, setCover] = useState(null)

  const [allowLoadImg, setAllowLoadImg] = useState(true)
  const [loadedImg, setLoadedImg] = useState(false)
  const [subiendoPortada, setsubiendoPortada] = useState(false)
  const [subiendoImagen, setsubiendoImagen] = useState(false)

  //traer datos del usuario
  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
  var uid = ""
  if (localStorage.length > 0 && datosSesionFromLocalStorage.uid) {
      uid= datosSesionFromLocalStorage.uid
  }

  

  /*ARRAY DE OBJETOS QUE RECIBE HASTA 6 IMÁGENES ADICIONALES PARA SUBIR*/
  const [additionalImg, setAdditionalImg] = useState([])

  /*OPCIONES PARA SELECT DE MONEDAS --- NO MODIFICAR ---*/
  const monedas = [
    {
      name: 'MXN',
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
      name: 'ARS',
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
      name: 'COP',
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

  /* MOCKING DE LOS DATOS DEL SERVICIO QUE DEBERÍA LLEGAR POR ID */
  // const dataServ = {
  //   title: "Un serviciooooo",
  //   id: 11,
  //   categorias: [
  //     {
  //       id: 7,
  //       title: 'Mantenimiento'
  //     }
  //   ],
  //   currency: 'MXN',
  //   description: "Praesent sed urna vel ex dictum pulvinar. Integer fermentum, libero non ultricies posuere, nunc massa convallis nisl, id placerat tortor urna ut mauris. Cras id ante non neque mattis sagittis. Mauris facilisis nisi vitae massa porta egestas. Ut eros sem, hendrerit ac aliquam in, lacinia eget turpis. Quisque viverra, mi nec accumsan consequat, velit leo consectetur ligula, sit amet aliquam odio elit at augue. Nam massa est, imperdiet at laoreet non, blandit eu purus. Ut tellus orci, porttitor mattis turpis auctor, porttitor suscipit ante. Curabitur lacus justo, lacinia sit amet magna in, auctor malesuada lorem. In vulputate lobortis nisl et suscipit.",
  //   estadoDePago: 'Aprobado',
  //   max: 250,
  //   min: 20,
  //   nameUser: 'Shandee Hanbury-Brown',
  //   photos: ['https://klservicios.com/images/portfolio/interior.png'],
  //   profilePic: "http://dummyimage.com/420x600.png/5fa2dd/ffffff",
  //   usuarioUidClient: "18Ixm0v0hsWQDo6lPbYR0SnMPry2"

  // }

  /*GUARDAMOS TEMPORALMENTE EL MOCKING DEL DATO DEL SERVICIO*/
  const servicio =servicioAntiguo[0]

  /*STATE QUE GUARDA TEMPORALMENTE LOS INPUTS DE EDITAR SERVICIO ANTES DE ACTUALIZARLOS*/
  const [editService, setEditService] = useState(null)
 

  useEffect(() => {
    dispatch(getCats())
    dispatch(servicesId(id))
    document.title = "Editar servicio"
    /*OBTENEMOS LAS CATEGORÍAS INCLUSO DESPUÉS DE RECARGAR LA PÁGINA*/
    if (!localStorage.length || !datosSesionFromLocalStorage.emailVerified) {
      navigate('/')
    }



  }, [])

  useEffect(() => {
    if (!loadingService && (additionalImg.length) + (servicio.photos.length - 1) >= 6) {
      setAllowLoadImg(false)
    } else {
      setAllowLoadImg(true)
    }
  }, [loadingService, allowLoadImg, additionalImg])

  useEffect(() => {
    if(subiendoPortada){
      //hacer el dispatch a la accion
      dispatch(updateService(id, editService));
      setsubiendoPortada(false);
    }
  }, [subiendoPortada, editService])

  useEffect(() => {
    if(subiendoImagen){
      //hacer el dispatch a la accion
        dispatch(updateService(id, editService));
      setsubiendoImagen(false);
    }
  }, [subiendoImagen, editService])

  useEffect(()=> {
    if (!loadingService && editService === null) {
      setEditService(servicio)
    }
  }, [loadingService, editService])

  const removeImg = (index) => {
    const arr = additionalImg.filter((img, i) => {
      if (i !== index) return img
    })
    if (additionalImg.length === 1) {
      setAdditionalImg([])
    }
    else {
      setAdditionalImg(arr)
    }
  }

  const saveEdit = () => {
    /*ACTUALIZAR AQUÍ LOS DATOS DEL SERVICIO */
    //...
    // setServicio(editService)
    dispatch(updateService(id, editService));
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditing(false)
  }

  /*OBTENEMOS EL VALOR DE LOS INPUTS EN EL STATE 'editService' */
  const handleEdit = (e) => {
    let value = e.target.value
    if (e.target.name === 'max' || e.target.name === 'min' || e.target.name === 'id') {
      value = Number(value)
    }
    setEditService({
      ...editService,
      [e.target.name]: value
    })
  }

  /*RECIBIMOS POR INPUT LA IMAGEN DE PORTADA A ACTUALIZAR*/
  const handleCover = async (e) => {
    setCover({
      url: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      status: 'pending'
    })
    setLoadedImg(true);
  }



  /*ACTUALIZAMOS LA PORTADA EN FIREBASE*/
  const uploadPortada = async () => {
    const notification = toast.loading("☁️ Cargando portada...", {
      isLoading: true,
      position: "top-center",
      hideProgressBar: false,
      pauseOnHover: false,
    })
    setCover({
      ...cover,
      status: 'uploading'
    })
    let coverToLoad = cover.img

    try {
//Borrar la portada anterior del array del servicio y de firebase
       if (servicio && servicio.photos.length>0) {      
        var portadaRef = ref(storage, editService.photos[0]);
        await deleteObject(portadaRef)
        editService.photos.shift();
      }
              //create new image upload
      const formato= coverToLoad.name.slice((Math.max(0, (coverToLoad.name).lastIndexOf('.')) || Infinity)+ 1);
      const fileRef = ref(storage, `/PhotosServices/${id}/portada.${formato}`);
      await uploadBytes(fileRef, coverToLoad);
      const urlDownload = await getDownloadURL(fileRef);

      setCover({
        ...cover,
        url: urlDownload,
        status: 'uploaded'
      })

      setLoadedImg(false)
      toast.update(notification, {
        render: '¡Se actualizó la portada!',
        type: 'success',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })

      setEditService({
        ...editService,
        photos: [urlDownload, ...editService.photos]
      })
      setsubiendoPortada(true);
    } catch (error) {
      setCover({
        ...cover,
        status: 'failed'
      })
      toast.update(notification, {
        render: 'No se pudo actualizar la portada, intenta de nuevo',
        type: 'error',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    }
  }

  /*RECIBIMOS LAS IMÁGENES ADICIONALES POR INPUTS*/
  const handleImages = async (e) => {
    setAdditionalImg([{
      img: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
      status: 'pending'
    }, ...additionalImg])
  }

  /*ACTUALIZAMOS LAS IMÁGENES DE ACUERDO A SU ÍNDICE EN FIREBASE --- additionalImg = [] ---*/
  const handleUpload = async (index) => {
    // cargarlo a firebase storage
    const notification = toast.loading("☁️ Cargando imagen...", {
      isLoading: true,
      position: "top-center",
      hideProgressBar: false,
      pauseOnHover: false,
    })
    const findImage = additionalImg.filter((img, i) => {
      if (i === index) return img
    })
    let imageToLoad = findImage[0].img
    setAdditionalImg(additionalImg.map((img, i) => {
      if (i === index) {
        img.status = 'uploading'
      }
      return img
    }))
    try {
      // const formato= imageToLoad.name.slice((Math.max(0, (imageToLoad.name).lastIndexOf('.')) || Infinity)+ 1);
      const fileRef = ref(storage, `/PhotosServices/${id}/${imageToLoad.name}`);
      await uploadBytes(fileRef, imageToLoad);
      //obtener url de descarga
      const urlDownload = await getDownloadURL(fileRef);

      setAdditionalImg(additionalImg.filter((img, i) => {
        if (i !== index) {
          return img
        }
      }))
      toast.update(notification, {
        render: '¡Se cargó la imagen!',
        type: 'success',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
      setEditService({
        ...editService,
        photos: [...editService.photos, urlDownload]
            })
      setsubiendoImagen(true);
    } catch (err) {
      setAdditionalImg(additionalImg.map((img, i) => {
        if (i === index) {
          img.status = 'failed'
        }
        return img
      }))
      toast.update(notification, {
        render: 'No se pudo cargar la imagen',
        type: 'error',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    }

  }

  const handleDeleteImage= async (foto, i) => {
          //Borrar la imagen anterior del array del servicio y de firebase    
          editService.photos.splice(i, 1);
          setEditService({
            ...editService,
            photos: [...editService.photos]
                })
          setsubiendoImagen(true);
          try {
            const imagenRef = ref(storage, foto);
            await deleteObject(imagenRef);
          } catch (error) {
            //...
          }

  }

  const onClickAddress = () => {
    setDisableCancelSave(true)
    setSearchingAddress({ status: 'searching' })
    axios(`https://api.geoapify.com/v1/geocode/search?text=${address}&limit=1&format=json&apiKey=7418c78b799b47df808b6aae89a65898`)
      .then((response) => {
        const pos = response.data.results[0];
        setSearchingAddress({ status: 'done', result: [pos.lat, pos.lon], details: pos.formatted })
        setAddress(pos.formatted)
        setEditService({
          ...editService,
          location: [pos.lat, pos.lon],
          address: pos.formatted
        })
        setDisableCancelSave(false)

      })
      .catch((error) => {
        setDisableCancelSave(false)
        setSearchingAddress({ status: 'failed' })
      });
  };

  const editLocation = () => {
    setEditAddress(true)

  }

  const locateMe = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      let crd = pos.coords;
      /* console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`); */
      searchLatLng(crd.latitude, crd.longitude)
    }

    const errors = (err) => {
      if (err.code == 1) {
        Swal.fire({
          icon: 'warning',
          title: 'Activar la ubicación',
          html: 'Para que podamos ayudarte a encontrar automáticamente tu ubicación, es necesario que nos des permiso para encontrarla. <br /><br />' + 'Si deseas volver a activarla, deberás hacerlo manualmente',
        })
      }
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          Swal.fire({
            icon: 'warning',
            title: 'Activar la ubicación',
            html: 'Para que podamos ayudarte a encontrar automáticamente tu ubicación, es necesario que nos des permiso para encontrarla. <br /><br />' + 'Si deseas volver a activarla, deberás hacerlo manualmente',
          })
        }
        result.onchange = function () {
          //identificar cuando cambia el permiso
        };
      });

    setDraggable(true)
  }
  const searchLatLng = (lat, lon) => {
    setDisableCancelSave(true)
    if (searchingAddress.status !== 'not searching') {
      setSearchingAddress({ ...searchingAddress, status: 'relocating' })
    }
    setDraggable(true)
    axios(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=7418c78b799b47df808b6aae89a65898`)
      .then((response) => {
        const pos = response.data.results[0];
        setSearchingAddress({ status: 'done', result: [pos.lat, pos.lon], details: pos.formatted })
        setAddress(pos.formatted)
        setEditService({
          ...editService,
          location: [pos.lat, pos.lon],
          address: pos.formatted
        })
        setDisableCancelSave(false)
      })
      .catch((error) => {
        setSearchingAddress({ status: 'failed' })
        setDisableCancelSave(false)
      });
  }
  const updateAddress = () => {

    dispatch(updateService(id, editService));
    setDraggable(false)
    setEditAddress(false)
    setAddress('');
    setSearchingAddress({ status: 'not searching' })

  }

  const resetImg = () => {
    setLoadedImg(false)
    setCover(null)
  }

  const gradientStyle = {
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(0deg, rgba(0,0,0,0) 18%, rgba(0,0,0,0.13209033613445376) 37%, rgba(0,0,0,0.9051995798319328) 97%)'

  }


  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col"> {loadingService? <div>Cargando...</div>:
      <div>{servicio.usuarioUidClient !== uid? <div>No eres propietario de ese servicio</div>:
      <div className="w-full h-screen overflow-y-auto flex flex-col">
        <div css={{ height: '30rem' }} className="w-full relative">
            <div css={{ height: '30rem' }} className={`hidden flex-col ${loadingPortada || failedPortada ? '' : 'hidden'} w-full justify-center items-center h-full`}>
              <span className={`${!loadingPortada || servicio.photos[0] === undefined ? 'hidden' : ''} text-5xl text-indigo-900`} > Cargando... </span>
              <AiOutlineLoading3Quarters className={`hidden text-5xl text-indigo-900 animate-spin`} />
              <span className={`${(failedPortada || servicio.photos[0] === undefined) ? '' : 'hidden'} text-5xl text-indigo-900`} > Falló </span>
            </div>

            {<img
              onLoad={() => {
                if (servicio.photos[0] === undefined) {
                  setLoadingPortada(false)
                  setFailedPortada(true)
                }
                setLoadingPortada(false)
                setFailedPortada(false)
              }}
              onError={() => {
                setLoadingPortada(false)
                setFailedPortada(true)
              }}
            css={{ height: '30rem' }}
            alt="portada"
              src={cover ? cover.url : servicio.photos[0] === undefined ? 'https://firebasestorage.googleapis.com/v0/b/multiserv-pghenry.appspot.com/o/PhotosServices%2Fdefault2.png?alt=media&token=fb6f93b9-7f4f-4494-a912-fda57dc71fe0' : servicio.photos[0]}
              className={`object-cover w-full `}
            />}

          <div css={gradientStyle} className="w-full h-48 absolute top-0">
            <div className="flex flex-row justify-between mx-8 mt-2">
              <Link to={`/home/${uid}/my-services`} className="inline-flex px-4 py-0.5 bg-transparent rounded-full text-white transition-all ease-in-out duration-300 hover:bg-gray-900">
                <IoReturnUpBack className="mr-3 self-center text-xl" />
                <span className="font-semibold">Regresar</span>
              </Link>
              <div className="self-center">
                  {
                    loadedImg ?
                  <div className="inline-flex">
                    <button disabled={cover.status === 'uploading'} onClick={uploadPortada} className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white disabled:opacity-50">
                      {cover.status === 'uploading' ? <RiLoaderFill className="mr-3 self-center text-xl animate-spin" /> : <BsCloudArrowUpFill className="mr-3 self-center text-xl" />}
                      <span className="font-semibold">{cover.status === 'uploading' ? 'Cargando portada...' : 'Confirmar'}</span>
                    </button>
                    {(cover && (cover.status === 'pending' || cover.status === 'failed')) && <button onClick={resetImg} className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full bg-red-200 text-red-900 transition-all ease-in-out duration-300 hover:bg-red-800 hover:text-white ml-3">
                      <FaTimes className="mr-3 self-center text-xl" />
                      <span className="font-semibold">Cancelar</span>
                    </button>}
                  </div>
                  :
                  <>
                    <input
                      onChange={handleCover}
                      type="file"
                      name="portada"
                      id="portada"
                      accept="image/jpeg"
                      className="inputfile"
                    />
                    <label htmlFor="portada" className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full text-white transition-all ease-in-out duration-300 hover:bg-gray-900">
                      <HiOutlinePhotograph className="mr-3 self-center text-xl" />
                      <span className="font-semibold">Editar portada</span>
                    </label>
                  </>}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full  mt-8 px-8  lg:px-16 xl:px-32" >
            <div id="photos-and-edit" className="flex flex-row justify-between  w-full ">
            <div id="add-photos" className="flex flex-col w-full h-72 mb-2 overflow-x-auto">
              <h2 className="text-4xl font-semibold text-cyan-900 mb-4 self-start">
                Imágenes adicionales
              </h2>
              <div className="flex w-full flex-row">
                  {!servicio.photos.length ? <div className="flex h-48 items-center justify-start">
                    <span className="font-semibold text-gray-900 text-lg">Para cargar imágenes aquí, primero debes agregar una portada</span>
                  </div>
                    :
                    allowLoadImg && <div className="mx-3 py-4">
                  <input
                    onChange={handleImages}
                    type="file"
                    name="foto5"
                    id="foto5"
                    accept="image/png, image/jpeg"
                    className="inputfile" />

                  <label htmlFor="foto5" className="hover:border-transparent hover:shadow-lg hover:bg-white focus:outline-none rounded-lg border-2 border-dashed text-indigo-300 border-indigo-200 hover:text-green-600 flex flex-col items-center text-center justify-center p-4 mx-0 sm:mr-4 mb-2 sm:mb-0 transition-all duration-500 ease-in-out cursor-pointer w-40 h-40">
                    <FaPlus className="text-4xl" />
                    <span className="google-sans font-semibold block">Haz click para agregar una foto</span>
                  </label>
                    </div>}
                  {
                    servicio.photos.length > 1 &&
                    servicio.photos.map((foto, i) => {
                      if (i > 0) {
                        return (<div className="relative flex-shrink-0  mx-3 my-4 w-40 h-40" key={i}>
                          <div className="absolute top-0 right-0 z-20">
                            <button
                              className="p-2"
                              onClick={() => { handleDeleteImage(foto, i) }}
                            >
                              <FaTimes className="text-lg text-white" />
                            </button>
                          </div>
                          <img
                            key={i}
                            alt={`imagen de galeria`}
                            src={foto}
                            className="w-40 h-40 rounded-md object-cover"
                          />
                        </div>)
                      }
                    })
                  }
                {additionalImg.length ?
                  additionalImg.map((img, index) => {
                    return (<div className="relative flex-shrink-0  mx-3 my-4 w-40 h-40" key={index}>
                      <div className="absolute top-0 right-0 z-20">
                        {(img.status === 'pending' || img.status === 'failed') && <button
                          className="p-2"
                          onClick={() => removeImg(index)}
                        >
                          <FaTimes className="text-lg text-white" />
                        </button>}
                      </div>
                      <div css={{ backgroundColor: "#00000063" }} className="absolute w-full h-full rounded-md z-10 flex justify-center items-center m-auto top-0 left-0 bottom-0 right-0">
                        <div className="relative">
                          {<div style={{ animation: img.status === 'uploading' ? 'spin 5s linear infinite' : 'none' }} className={`border-2 ${img.status === 'uploading' && 'border-dashed'} w-16 h-16 rounded-full ${img.status === 'failed' && 'border-red-800'} ${img.status === 'uploaded' && 'border-pureGreen-200'}`}>
                          </div>}
                          <button
                            onClick={() => { handleUpload(index) }}
                            disabled={(img.status === 'uploading' || img.status === 'uploaded')}
                            className={`flex justify-center items-center absolute w-16 h-16 m-auto top-0 left-0 rounded-full text-white text-3xl ${(img.status === 'uploading' || img.status === 'uploaded') && 'cursor-not-allowed'} `}>
                            {img.status === 'uploaded' ? <BsCloudCheckFill className="self-center text-pureGreen-400" />
                              : <BsCloudArrowUpFill className="self-center" />}
                            {/* {img.status === 'failed' && <AiFillExclamationCircle />} */}
                          </button>
                        </div>
                      </div>
                      <img
                        key={index}
                        alt={`imagen adicional ${index + 1}`}
                        src={img.url}
                        className="w-40 h-40 rounded-md object-cover"
                      />
                    </div>)
                  }) : ''
                }
              </div>
            </div>
            <div id="edit-buttons"
              className="flex flex-col w-72 px-4"
              css={{
                boxShadow: '-31px 0px 27px -32px rgba(0,0,0,0.29)',
                WebkitBoxShadow: '-31px 0px 27px -32px rgba(0,0,0,0.29)'
              }}
            >
              <h2 className="text-4xl font-semibold text-cyan-900 mb-4 self-start">
                Opciones
              </h2>
              <div

                className="h-full">
                {editing ?
                  <div>
                    <button
                      onClick={cancelEdit}
                      className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-red-200 text-red-900 transition-all ease-in-out duration-300 hover:bg-red-800 hover:text-white my-2">
                      <FaTimes className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Cancelar edición</span>
                    </button>
                    <button
                      onClick={saveEdit}
                      className="inline-flex flex-shrink-0  justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white my-2">
                      <BsCloudArrowUpFill className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Guardar cambios</span>
                    </button>
                  </div>
                  :
                  <button
                    onClick={() => { setEditing(true) }}
                    className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-blue-800 hover:bg-blue-900 text-white transition-all ease-in-out duration-300 mt-2">
                    <HiPencil className="self-center text-lg mr-2" />
                    <span>Editar publicación</span>
                  </button>}
              </div>
            </div>
          </div>
            <div id="map" className="flex flex-col w-full transition-all ease-in-out duration-300 border-b pb-4 mb-4 ">
              <div className="border-b mb-4 flex flex-row justify-between">
                <span className="text-4xl text-cyan-900 font-semibold self-center">Ubicación</span>
                {!editAddress ? <button onClick={editLocation} className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center text-cyan-900 transition-all ease-in-out duration-300 hover:bg-cyan-800 hover:text-white my-2" >
                  <HiPencil className="self-center text-lg mr-2" />
                  <span className="font-semibold">Editar ubicación</span>
                </button>
                  :
                  <div className="flex flex-row">
                    <button
                      disabled={disableCancelSave}
                      onClick={() => { setEditAddress(false); setAddress(''); setSearchingAddress({ status: 'not searching' }); setDraggable(false) }}
                      className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-red-200 text-red-900 transition-all ease-in-out duration-300 hover:bg-red-800 hover:text-white my-2 disabled:opacity-50">
                      <FaTimes className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Cancelar edición</span>
                    </button>
                    <button
                      disabled={disableCancelSave}
                      onClick={updateAddress}
                      className="inline-flex flex-shrink-0  justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white my-2 ml-3 disabled:opacity-50">
                      <BsCloudArrowUpFill className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Guardar ubicación</span>
                    </button>
                  </div>}
              </div>
              <div className="my-4 flex-col">
                <div className="flex-col">

                </div>
                {editAddress ? <div className="flex flex-col">
                  <div className="flex flex-row py-2 self-center  justify-start items-center h-full">
                    <label className="type_option self-center text-xl">
                      <input type="checkbox" name='check'
                        id='check'
                        onChange={() => {
                          setEditService({
                            ...editService,
                            homeService: !editService.homeService
                          })
                        }}
                        value={editService.homeService}
                        checked={editService.homeService}
                        disabled={false}
                      />
                      <span className="custom_check"></span>
                      <label htmlFor="check" className="typeText select-none cursor-pointer font-semibold text-gray-900">Disponible para ir a domicilio</label>
                    </label>
                  </div>
                  <div className="flex flex-row text-xl">
                  <HiPencil style={{ WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' }} className="self-center mr-2 text-2xl text-blue-800" />
                  <input
                    onChange={(e) => { setAddress(e.target.value) }}
                    value={address}
                    type="text"
                    name="editAddress"
                    id="editAddres"
                      placeholder="[CALLE Y NO. DE CASA], CIUDAD, ESTADO/PROVINCIA"
                    className=" border-b-2 border-transparent  px-4 py-1 outline-none border-gray-200 focus:border-cyan-900 transition-all ease-in-out duration-300 w-full"
                  />
                    <button disabled={disableCancelSave} onClick={locateMe} className="inline-flex flex-row self-center px-2 py-0.5 ml-3 rounded-md bg-blue-700 text-white transition-all ease-in-out duration-300 hover:bg-blue-900 disabled:opacity-50">
                      <MdMyLocation />
                    </button>
                  <button
                      disabled={address === '' || searchingAddress.status === 'searching' || searchingAddress.status === 'relocating'}
                    onClick={onClickAddress}
                    css={{
                      ':disabled&:hover': {
                        backgroundColor: 'rgba(209, 250, 229, 1)',
                        color: 'rgba(6, 78, 59, 1)'
                      }
                    }}
                    className="inline-flex flex-shrink-0  justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white my-2 ml-3 disabled:opacity-50 hover:disabled:bg-green-100 disabled:cursor-not-allowed">
                      {searchingAddress.status === 'searching' || searchingAddress.status === 'relocating' ?
                      <>
                        <ImSpinner6 className="mr-2 self-center text-lg animate-spin" />
                        <span className="font-semibold">Buscando...</span></>
                      :
                        <><FaSearchLocation className="mr-2 self-center text-xl" />
                        <span className="font-semibold">Buscar</span></>}
                  </button>
                  </div>
                </div> : <div className="flex flex-col">
                  <div className="flex flex-row text-2xl mb-3">
                    {servicio.homeService ? <>
                      <BsStars className="text-3xl mr-2 text-blue-900 self-center" />
                      <span className="font-semibold text-gray-600 self-center">
                        Ofreces servicio a domicilio
                      </span>
                    </> :
                      <>
                        <BsExclamationLg className="text-3xl mr-2 text-yellow-700 self-center" />
                        <span className="font-semibold text-gray-600 self-center">
                          Aún no ofreces servicio a domicilio
                        </span>
                      </>}
                  </div>
                  <div className="flex flex-row text-2xl mt-3">
                  <MdLocationPin className="text-3xl mr-2 text-red-900 self-center" />
                  <span className="font-semibold text-gray-600 self-center">
                    {servicio.address}
                  </span>
                    </div>
                </div>}
              </div>
              {searchingAddress.status !== 'searching' ? <div className="relative w-full h-96 transition-all ease-in-out duration-300">
                {searchingAddress.status === 'relocating' && <div style={{ zIndex: '2000', backgroundColor: '#00000044' }} className="absolute top-0 left-0 w-full h-96 rounded-xl flex justify-center items-center">
                  <span className="font-semibold text-xl text-white">Reubicando...</span>
                </div>}
                <MapContainer
                  center={(searchingAddress.status === 'done' || searchingAddress.status === 'relocating') ? searchingAddress.result : servicio.location === null ? [51.50084939698666, -0.12458248633773235] : servicio.location}
                  zoom={17}
                  scrollWheelZoom={true}
                >
                  <MapConsumer>
                    {(map) => {
                      map.flyTo((searchingAddress.status === 'done' || searchingAddress.status === 'relocating') ? searchingAddress.result : servicio.location === null ? [51.50084939698666, -0.12458248633773235] : servicio.location);
                      map.zoom = 17;
                      return null;
                    }}
                  </MapConsumer>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {
                    servicio.location !== null || searchingAddress.status === 'done'
                      ?
                      <Marker
                        draggable={draggable}
                        eventHandlers={eventHandlers}
                        ref={markerRef}
                        position={searchingAddress.status === 'done' ? searchingAddress.result : servicio.location}>
                        <Tooltip direction="top" permanent offset={[0, -8]}>
                          {searchingAddress.status === 'done' ? 'Ubicación encontrada:' : 'Aquí está tu negocio:'}<br />
                          <span className="font-semibold text-purple-900">{searchingAddress.status === 'done' ? searchingAddress.details : servicio.address}</span>
                        </Tooltip>
                    </Marker> : <div></div>
                  }
                </MapContainer>
              </div>
                :

                <div className="w-full h-96 bg-teal-50 rounded-xl flex justify-center items-center">
                  <ImSpinner9 className="mr-2 self-center text-xl animate-spin" />
                  <span className="font-semibold">Buscando...</span>
                </div>}
            </div>
          {editing ?
            <div id="edit-all" className="flex flex-col justify-center items-start mt-4">

              <div className="flex flex-row w-full ">
                <div className="flex flex-col justify-start items-start w-full lg:pr-16">
                  <label htmlFor="titleEdit" className="text-4xl font-semibold text-cyan-900 cursor-pointer ">Editar título:</label>
                  <input
                    type="text"
                    name="title"
                    id="titleEdit"
                    placeholder="Agrega un título..."
                    value={editService && editService.title}
                    onChange={handleEdit}
                    className="focus:outline-none  font-semibold text-xl text-gray-900 w-full border-b-2 border-gray-900 mt-4" />
                  <div className="mt-6 w-full">
                    <label htmlFor="descrEdit" className="text-4xl font-semibold text-cyan-900 cursor-pointer">Editar descripción:</label>
                    <textarea
                      css={{ resize: "none" }}
                      placeholder="Agrega una descripción..."
                      type="text"
                      name="description"
                      id="descrEdit"
                      value={editService && editService.description}
                      onChange={handleEdit}
                      className="focus:outline-none  font-semibold text-xl text-gray-900 align-text-bottom border-2 rounded-md border-gray-900 mt-4 w-full h-96 py-2 px-6" />
                  </div>
                </div>
                <div className="flex flex-col w-96 ">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    Más detalles
                  </span>
                  {categoriasDb.length
                    ?
                    <div className="my-2">
                      <h2 className="font-semibold text-xl text-gray-600 mb-2">Categoría:</h2>
                      <ListBox
                        defaultValue={editService && editService.categorias[0].title}
                        customBorder="#9CA3AF"
                        className="self-center"
                        width='15rem'
                        options={categoriasDb}
                        callBack={(text) => {
                          setEditService({
                            ...editService,
                            category: text.name
                          })
                        }}
                        text="..."
                        theme="#0C4A6E"
                        includeIconOnDesc
                      />
                    </div>
                    :
                    <div className="rounded-lg text-center mb-2 px-4 py-1 bg-teal-100 text-cyan-900">
                      <span className="font-semibold">
                        {  servicio.categorias[0].title}
                      </span>
                    </div>
                  }
                  <div className="my-2">
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Moneda local:</h2>
                    <ListBox
                      customBorder="#9CA3AF"
                      className="self-center"
                      width='15rem'
                      options={monedas}
                      callBack={(curr) => {
                        setEditService({
                          ...editService,
                          currency: curr.name
                        })
                      }}
                      text="..."
                      theme="#0C4A6E"
                      includeIconOnDesc
                    />
                  </div>

                  <div className="mt-2 mb-4 flex flex-col">
                    <label htmlFor="priceMin" className="text-xl text-cyan-900 font-semibold">Precio mínimo:</label>
                    <div className="flex flex-row">
                      <span className="text-lg text-gray-600 font-semibold mr-2">$</span>
                      <input
                        type="number"
                        name="min"
                        id="priceMin"
                        value={editService && editService.min}
                        onChange={handleEdit}
                        className="focus:outline-none w-28  font-semibold text-xl text-gray-900 border-b-2 border-gray-900"
                      />
                      <span className="ml-2 underline text-lg text-gray-700 font-semibold">{editService && editService.currency} </span>
                    </div>
                  </div>

                  <div className="mb-2 flex flex-col">
                    <label htmlFor="priceMax" className="text-xl text-cyan-900 font-semibold">Precio máximo:</label>
                    <div className="flex flex-row">
                      <span className="text-lg text-gray-600 font-semibold mr-2">$</span>
                      <input
                        type="number"
                        name="max"
                        id="priceMax"
                        value={editService && editService.max}
                        onChange={handleEdit}
                        className="focus:outline-none w-28  font-semibold text-xl text-gray-900 border-b-2 border-gray-900"
                      />
                      <span className="ml-2 underline text-lg text-gray-700 font-semibold">{editService && editService.currency} </span>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            :
            <div id="content" className="flex flex-col">
              <div className="flex flex-row w-full mt-4">
                <div className="flex flex-col items-start w-full pr-12">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    {  servicio.title}
                  </span>
                  <p className="font-semibold text-gray-900 px-4">{  servicio.description}</p>
                </div>

                <div className="flex flex-col w-96 ">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    Más detalles
                  </span>
                  <div className="rounded-lg text-center mb-2 px-4 py-1 bg-teal-100 text-cyan-900">
                    <span className="font-semibold">
                      {  servicio.categorias[0].title}
                    </span>
                  </div>
                  <div className="mb-2 flex flex-col px-4">
                    <span className="text-xl text-cyan-900 font-semibold">Precio mínimo:</span>
                    <span className=" underline text-lg text-gray-700 font-semibold"> ${  servicio.min.toFixed(2)} {  servicio.currency} </span>
                  </div>
                  <div className="mb-2 flex flex-col px-4">
                    <span className="text-xl text-cyan-900 font-semibold">Precio máximo:</span>
                    <span className=" underline text-lg text-gray-700 font-semibold"> ${  servicio.max.toFixed(2)} {  servicio.currency} </span>
                  </div>

                </div>
              </div>

              <div className="mt-4 flex flex-row">

              </div>
            </div>}
          </div>
        </div>}
        </div>}
    </div>
  );
};

export default EditarServicio; 