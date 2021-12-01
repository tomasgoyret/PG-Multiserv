import {useParams} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { useState } from "react";
import {getReviews, services} from "../redux/actions/actions"
import Swal from 'sweetalert2'

export const useSendReview = (initialState) => {

  const dispatch = useDispatch();
  const {id} = useParams();
  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))

  const [sendReview, setSendReview] = useState(initialState)
  const {reviews, servicios} = useSelector(state => state)
  const findReview = reviews.find(review => review.usuarioUidClient === datosSesionFromLocalStorage.uid)
  const findService = servicios.find(service => service.usuarioUidClient === datosSesionFromLocalStorage.uid)
  console.log(findService);

  const createReview = async() => {
          if(!findService || findService?.id !== parseInt(id)) {
            if(sendReview.details && sendReview.title && sendReview.rating){
              if(!findReview) {
                const response = await axios.post(`/agregar-resena/${id}`, {
                  details: sendReview.details,
                  rating: sendReview.rating,
                  title: sendReview.title,
                  uidClient: datosSesionFromLocalStorage.uid
                })
                const res = response.data
                dispatch(getReviews(id))
                dispatch(services())
                Swal.fire('La reseña se créo correctamente!', '', 'success')
              } else {
                Swal.fire('Ya tienes una reseña en este servicio!', '', 'error')
              }
            } else {
              Swal.fire('Para crear la reseña, es necesario llenar todos los campos', '', 'warning')
            }
          } else {
            Swal.fire('No es posible crear una reseña en un servicio propio', '', 'warning')
          }
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      createReview()
      e.target.reset()
      setSendReview({rating: ""})
  }

  const handleChange = (e) => {
      setSendReview({
          ...sendReview,
          [e.target.name]: e.target.value
      })
  }

  const ratingChange = (data) => {
          setSendReview({
              ...sendReview,
              rating: data
          })
  }

  return {
    handleChange,
    handleSubmit,
    ratingChange,
    sendReview
  }
};
