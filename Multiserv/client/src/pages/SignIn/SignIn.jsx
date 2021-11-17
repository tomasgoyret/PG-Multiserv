import React from "react";
import { Navigate } from "react-router";
import CardInfomativaFormulario from "../../Components/Organisms/CardInformativaFormulario/CardInformativaFormulario";
import FormularioSignIn from "../../Components/Organisms/FormularioSignIn/FormularioSignIn";
import s from "./SignIn.module.css";


const SignIn = ({handleModal}) => {
    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    if(datosSesionFromLocalStorage){
        return <Navigate to={'/home'} />
    }
    return(
        <div className={s.SignIn}>
            <div className={s.SignIn__Container}>
                <div className={s.SignIn__Container__Contenido}>
                    <CardInfomativaFormulario/>
                </div>
                <div className={s.SignIn__Container__Formulario}>
                    <FormularioSignIn  handleModal={handleModal}/>
                </div>
            </div>
        </div>
    )
}

export default SignIn;

