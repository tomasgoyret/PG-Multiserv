/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaHeartBroken } from 'react-icons/fa'
import Image from '../../Atoms/Image/Image'
import StarRating from '../../Atoms/StarRating/StarRating'
/* React-redux */


const ServiceCard = ({ service, className }) => {
    const [loadingImg, setLoadingImg] = useState(true)
    const [failedImg, setFailedImg] = useState(false)
    const contGrad = {
        background: 'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)'
    }
    const userProfile = {
        backgroundImage: `url(${service.profilePic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    }
    const width = {
        '@media (max-width: 640px)': {
            width: '22rem'
        },
        '@media (min-width: 640px)': {
            width: '24rem'
        },
        '@media (min-width: 768px)': {
            width: '21rem'
        },
        '@media (min-width: 1024px)': {
            width: '24rem'
        },

    }
    return (
        <div css={width} className={`${className} flex-shrink-0 m-4 filter drop-shadow-md transition-all ease-in-out duration-300 transform hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:drop-shadow-lg`}>
            <div css={width} className="rounded-t-lg h-52 md:h-60 bg-indigo-50 flex justify-center items-center">
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
                    style={{ width: '24rem' }}
                    imagen={service.photos[0] !== null ? service.photos[0] : 'https://tecno-soluciones.net/wp-content/uploads/2019/08/36797a633bf2483c419df0c1368582ca-1.png'}
                    imgClass={`object-cover h-52 md:h-60 rounded-t-lg ${loadingImg || failedImg ? 'hidden' : ''}`}
                />
                <div className={`flex flex-col ${loadingImg || failedImg ? '' : 'hidden'}`}>
                    <AiOutlineLoading3Quarters className={`${!loadingImg && 'hidden'} text-5xl text-indigo-900 animate-spin`} />
                    <FaHeartBroken className={`${!failedImg && 'hidden'} text-5xl text-indigo-900`} />
                </div>
            </div>
            <div className="bg-white relative flex flex-col rounded-b-lg w-full">
                <div className=" absolute -top-5  px-4 flex w-full justify-between">
                    <div className="px-4 py-1 font-semibold bg-cyan-900 rounded-full">
                        <span className="text-white">{service.categorias.length>0? service.categorias[0].title : "Sin definir" }</span>
                    </div>
                </div>
                <div className="pt-6 px-3 relative">
                    <div className="mb-2">
                        <div className="flex justify-between">
                            <div className="flex items-center h-11 w-7/12 overflow-y-hidden">
                                <p className="inline-block text-lg font-semibold text-gray-800 leading-none align-middle " >{service.title}</p>
                            </div>
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
                <div className="flex border-t border-gray-200 mx-4 my-4 pt-2 md:my-4 md:pt-4">
                    <div className="flex">
                        {/* user info */}
                        <div className="p-0.5 rounded-full border-0 md:border-2 border-cyan-800 self-center">
                            <div
                                css={userProfile}
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-cyan-800 md:border-0" />
                        </div>
                        <div className="ml-4 flex flex-col self-center">
                            <h1 className="font-semibold text-gray-800"> {service.nameUser} </h1>
                            <span className="text-sm text-gray-600">
                                {service.currency === 'MXN' ? 'Mexico' 
                                    : service.currency === 'COP' ? 'Colombia' 
                                    : service.currency === 'ARS' ? 'Argentina'
                                    : service.currency === 'USD' ? 'Estados Unidos'
                                    : ''    
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
