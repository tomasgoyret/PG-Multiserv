import React, { useEffect, useState } from "react";
import Imagen from "../../../assets/images/img1.webp"
import StarRating from "../../Atoms/StarRating/StarRating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, users, usuarioId } from "../../../redux/actions/actions";
import { useLocation } from "react-router";
import SendReview from "../SendReview/SendReview";
import {Review} from "../../../Hooks/useReviews"
import StarRatingReview from "../../Molecules/StarRatingReview/StarRatingReview"
import ProgressRating from "../../Molecules/ProgressBar/ProgressBar";
import PercentageReview from "../../Molecules/PercentageReview";

const ReviewService = ({handleModalReviews, verMasReviews, mostrarComentariosReviews}) => {
    const {reviewsdata, title, porcentaje, promedio, rating} = Review();
    const dispatch = useDispatch()
    const { reviews, usuarios } = useSelector(state => state)
    const location = useLocation()
    const current = location.pathname.replace(/\D/g,'')
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))



    useEffect(() => {
        dispatch(getReviews(current))
        dispatch(users())
    }, [])



    return(
        <div className="w-full h-screen">
            <div className="w-full px-6 mt-10">
                <hr />
            </div>
            <div className="flex justify-center w-full pt-5 pb-5 px-10">
                <h2 className="text-3xl text-gray-800 py-5 font-bold">Reseñas</h2>
            </div>

      
            <div className="ml-10 flex justify-between w-max">
                <StarRatingReview rating={promedio} total={rating}/>
                <PercentageReview />
            </div>

            {
                mostrarComentariosReviews && datosSesionFromLocalStorage &&
                <div className="w-4/6 px-5 mt-5 mb-20">
                    <SendReview />
                </div>
            }
            <div className="w-full h-auto flex flex-col my-5 mx-10 pb-10">
                {
                    reviewsdata?.map(( comentario, i) => (
                        <div className="flex flex-col w-3/5 h-auto my-3" key={'keyFromReviews'+i}>
                                <div className="flex items-center"> 
                                    <div className="border-2 rounded-full h-10 w-10" >
                                        <img src={comentario.user.map(n => n.photoURL?n.photoURL:'https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg')} className="w-full h-full rounded-full" alt='Bill Gates' />
                                    </div>
                                    <h2 className="font-semibold text-1xl ml-2">{comentario.user.map(n => n.displayName)}</h2>
                                </div>
                            <div className="flex mb-2">
                                <div>
                                    <StarRating rating={comentario.rating}/> 
                                </div>
                                <div>
                                    <h4 className="font-semibold ml-4">{comentario.title}</h4>
                                </div>
                            </div>
                            <div className="w-full text-md text-gray-700">
                                <span className="w-full">{comentario.details}</span>
                            </div>
                        </div>
                    ))
                }
                {
                    verMasReviews && 
                    <span className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer mt-4" onClick={handleModalReviews}>Ver mas reviews</span>
                }
            </div>
            
        </div>
    )
}

export default ReviewService;