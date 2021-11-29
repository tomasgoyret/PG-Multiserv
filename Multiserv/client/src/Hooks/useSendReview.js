import {useParams} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { useState, useEffect } from "react";
import {getReviews} from "../redux/actions/actions"

export const useSendReview = (initialState) => {

  const dispatch = useDispatch();
  const {id} = useParams();
  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))

  const [sendReview, setSendReview] = useState(initialState)
  const {reviews} = useSelector(state => state)
  const findReview = reviews.find(review => review.usuarioUidClient === datosSesionFromLocalStorage.uid)


  const createReview = async() => {
      if(!findReview) {
        const response = await axios.post(`/agregar-resena/${id}`, {
            details: sendReview.details,
            rating: sendReview.rating,
            title: sendReview.title,
            uidClient: datosSesionFromLocalStorage.uid
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        dispatch(getReviews(id))
        alert("La reseña se creó correctamente")
      }else {
        alert("Solo se puede crear una reseña por servicio")
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
