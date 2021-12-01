import React, { useEffect } from "react";
import StarRating from "../../Atoms/StarRating/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, users } from "../../../redux/actions/actions";
import { useLocation, useParams } from "react-router";
import SendReview from "../SendReview/SendReview";
import { useReview } from "../../../Hooks/useReviews"
import StarRatingReview from "../../Molecules/StarRatingReview/StarRatingReview"
import PercentageReview from "../../Molecules/PercentageReview/PercentageReview";
import Footer from "../Footer/Footer";

const ReviewService = ({verFooter, handleModalReviews, verMasReviews, mostrarComentariosReviews, mostrarStarRating, mostrarPercentageReview, limitarRenderizadoEnDetalleServicio}) => {
    const { id } = useParams();
    const {reviewsdata, promedio, rating} = useReview();
    const dispatch = useDispatch()
    const location = useLocation()
    const current = location.pathname.replace(/\D/g,'')
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    const user = datosSesionFromLocalStorage.uid
    const { misCitas, reviews } = useSelector(state => state)
    const reviewsData = reviewsdata.reverse();
    const findCita = misCitas.find(cita => cita.servicioId === parseInt(id))
    const findReview = reviews.find(review => review.usuarioUidClient === user)


    useEffect(() => {
        dispatch(getReviews(current))
        dispatch(users())
    }, [current, dispatch])



    return(
        <div className="w-full h-screen">
            {
                mostrarStarRating && datosSesionFromLocalStorage && mostrarPercentageReview &&
                <div className="flex justify-center w-max mx-auto px-10 pt-5 shadow-md py-5">
                    <div className="porcentaje flex justify-end items-start pt-2">
                        <StarRatingReview rating={promedio} total={rating}/>
                    </div>
                    <div className="promedio flex items-center justify-center">
                        <PercentageReview />
                    </div>
                </div>
            }

            <div className="flex justify-center w-full pt-5 pb-5 px-10">
                <h2 className="text-3xl text-gray-800 py-5 font-bold">Reseñas</h2>
            </div>

            {
                findCita?.status === "Concretada" && findCita.usuarioUidClient === user && findReview === undefined &&
                <div className="w-4/6 px-5 mt-5 mb-20">
                    <SendReview />
                </div>
            }
            <div className="w-full h-auto flex flex-col my-5 ">
                {
                    limitarRenderizadoEnDetalleServicio ?
                    reviewsData?.map(( comentario, i) => {
                        if(i < 2){
                            return (
                            <div className="flex flex-col w-3/5 h-auto my-3 pl-10" key={'keyFromReviews'+i}>
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
                                <div className="w-full text-sm text-gray-700">
                                    <span className="w-full">{comentario.details}</span>
                                </div>
                            </div>
                        )}
                    })
                    :
                    reviewsdata?.map(( comentario, i) => (
                        <div className="flex flex-col w-4/5 h-auto my-3 mx-auto " key={'keyFromReviews'+i}>
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
                    <span className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer mt-4 pl-10 mb-10" onClick={handleModalReviews}>Ver mas reviews</span>
                }
                {
                    verFooter &&
                    <Footer />
                }
                
            </div>

        </div>
    )
}

export default ReviewService;
