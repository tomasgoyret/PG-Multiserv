/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaHeartBroken } from 'react-icons/fa'
import Image from '../../Atoms/Image/Image'
import StarRating from '../../Atoms/StarRating/StarRating'


const ServiceCard = ({ service }) => {
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const mockup = {
        id: "1xSqIn1AFenrk3drarSX",
        currency: 'MXN',
        title: "Un mueblecito",
        min: 2000,
        max: 3400,
        category: "Carpintería",
        description: "Tailwind CSS is the utility-first CSS framework for those looking to rapidly build custom designs. Rather than predesigned components, Tailwind CSS comes with basic utility classes meant for customization. The documentation highly recommends downloading the framework via npm or yarn to gain full access to component customization.",
        rating: 3.4,
        uidUser: "18Ixm0v0hsWQDo6lPbYR0SnMPry2",
        photos: [
            "https://i.ytimg.com/vi/j5bz8tp5JQ0/maxresdefault.jpg",
            "https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/3163922.jpg",
            "https://muebla.com.mx/storage/2020/October/week4/57526_img_2097_e2_copia.png"
        ]

    }
    const contGrad = {
        background: 'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)'
    }
    const userProfile = {
        backgroundImage: 'url("https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    }
    return (
        <div className="w-96 flex-shrink-0 m-4 filter drop-shadow-md transition-all ease-in-out duration-300 transform hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:drop-shadow-lg">
            <div className="rounded-t-lg w-96 h-60 bg-indigo-50 flex justify-center items-center">
                <Image
                    loadedHandler={() => {
                        setLoadingImg(false)
                        setFailedImg(false)
                    }}
                    failedHandler={() => {
                        setLoadingImg(false)
                        setFailedImg(true)
                    }}
                    name="photo1"
                    imagen={service.photos[0]}
                    imgClass={`object-cover rounded-t-lg w-96 h-60 ${loadingImg || failedImg ? 'hidden' : ''}`}
                />
                <div className={`flex flex-col ${loadingImg || failedImg ? '' : 'hidden'}`}>
                    <AiOutlineLoading3Quarters className={`${!loadingImg && 'hidden'} text-5xl text-indigo-900 animate-spin`} />
                    <FaHeartBroken className={`${!failedImg && 'hidden'} text-5xl text-indigo-900`} />
                </div>
            </div>
            <div className="bg-white relative flex flex-col rounded-b-lg">
                <div className=" absolute -top-5  px-4 flex w-full justify-between">
                    <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                        <span className="text-white">{service.category}</span>
                    </div>
                </div>
                <div className="pt-6 px-4 relative">
                    <div className="mb-2">
                        <div className="flex justify-between">
                            <span className="self-center text-lg font-semibold text-gray-800 w-3/6" >{service.title}</span>
                            <div className="self-center inline-flex">
                                <StarRating rating={service.rating} />
                            </div>
                        </div>
                        <span className="self-center text-sm font-medium text-gray-500">{`Desde $${service.min.toFixed(2)} ${service.currency}`}</span>
                    </div>
                    <div className="max-h-14 overflow-hidden">
                        <p className="text-gray-500 font-normal leading-tight tracking-wide">{service.description}</p>
                    </div>
                    <div css={contGrad} className="w-full px-8 text-right absolute -bottom-1 left-0">
                        <span className="cursor-pointer inline-flex font-medium text-cyan-800">Ver más...</span>
                    </div>
                </div>
                <div className="flex border-t border-gray-200 mx-4 my-4 pt-4">
                    <div className="flex">
                        {/* user info */}
                        <div className="p-0.5 rounded-full border-2 border-cyan-800">
                            <div
                                css={userProfile}
                                className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="ml-4 flex flex-col">
                            <h1 className="font-semibold text-gray-800">Provider name</h1>
                            <span className="text-sm text-gray-600">Aditional data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
