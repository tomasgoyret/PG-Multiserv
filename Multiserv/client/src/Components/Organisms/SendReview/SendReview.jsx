import ReactStars from "react-stars";
import { useSendReview } from "../../../Hooks/useSendReview"

const initialState = {
  title: "",
  details: "",
  rating: ""
}


const SendReview = () => {

  const {
    handleChange,
    handleSubmit,
    ratingChange,
    sendReview
  } = useSendReview(initialState)


    return(
        <div className="w-1/3 h-28 mb-60">
            <div className="h-2/6 flex items-center px-5 mt-5 mb-5">
                <span className="text-xl font-sans font-semibold">Agregar review</span>
            </div>
            <div className="w-max h-4/6 px-5">
               <form action="" onSubmit={handleSubmit}>
                <div className="flex justify-between mb-2">
                    <div>
                            <label htmlFor="title">Título de reseña</label>
                            <input className="block border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-2" type="text" name="title" onChange={handleChange} id="title" />
                        </div>
                        <div>
                            <label>Puntuación</label>
                            <ReactStars className="flex" onChange={ratingChange} edit={true} size={25} value={sendReview.rating} half={false} count={5} />
                        </div>
                </div>
                    <div className="w-4/6">
                        <textarea onChange={handleChange} maxLength="300" id="" cols="73" rows="4" name="details" className="border-2 border-blue-300 w-max rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-2" />
                    </div>
                    <div className="w-full flex flex-col items-end mt-2">
                        <button  className='font-semibold text-lg px-4 py-2 bg-blue-600 text-gray-50 hover:bg-blue-800 active:bg-blue-700 rounded-md transition-all ease-in-out duration-300' >
                            Comentar
                        </button>
                    </div>
               </form>
            </div>
        </div>
    )
}

export default SendReview;
