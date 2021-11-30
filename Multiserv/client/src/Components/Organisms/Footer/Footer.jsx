import React from "react";
import github from "../../../assets/images/github.png"
import LinkTo from "../../Atoms/LinkTo/LinkTo";
const Footer = () => {
    return(
        <div className="w-full h-40 bg-gray-800 py-3 items-center">
            <div className="w-full flex justify-center h-2/6 items-center">
                <span className="text-2xl font-semibold text-gray-50">MultiServ</span>
            </div>
            <div className="w-full flex justify-center h-1/6 items-center">
                <LinkTo page="about" render={<span className="text-sm text-gray-300 mx-2 hover:font-semibold hover:text-red-50 ">About</span>} />
                <LinkTo page="acerca" render={<span className="text-sm text-gray-300 mx-2  hover:font-semibold hover:text-red-50 ">Acerca de</span>} />
            </div>
            <div className="w-full justify-center h-2/6  flex items-center">
                <div className="w-8 h-8  rounded-md overflow-hidden hover:bg-gray-200">
                    <a href="https://github.com/tomasgoyret/PG-Multiserv" target="_blank">
                        <img src={github} alt=""/>
                    </a>
                </div>
            </div>
            <div className="w-full flex justify-center h-1/6">
                <span  className="text-sm font-semibold text-gray-200">Derechos reservados © MultiServ - 2021</span>
            </div>
        </div>
    )
}

export default Footer;