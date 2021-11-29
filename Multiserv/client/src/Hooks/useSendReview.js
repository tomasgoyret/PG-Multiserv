import {useParams} from "react-router-dom"
import axios from "axios"
import { useState } from "react";

export const useSendReview = (initialState) => {

  const {id} = useParams();
  console.log(id);
  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))

  const [sendReview, setSendReview] = useState(initialState)

  const createReview = async() => {
      const response = await axios.post(`/agregar-resena/${id}`, {
          details: sendReview.details,
          rating: sendReview.rating,
          title: sendReview.title,
          uidClient: datosSesionFromLocalStorage.uid
      })
      console.log(response.data);
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      createReview()
      e.target.reset()
      setSendReview({rating: ""})
      alert("Tu reseña se creó correctamente")
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
