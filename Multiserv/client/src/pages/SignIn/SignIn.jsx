import React from "react";
import CardInfomativaFormulario from "../../Components/Organisms/CardInformativaFormulario/CardInformativaFormulario";
import FormularioSignIn from "../../Components/Organisms/FormularioSignIn/FormularioSignIn";
import s from "./SignIn.module.css";
// borrar

const SignIn = () => {

    return(
        <div className={s.SignIn}>
            <div className={s.SignIn__Container}>
                <div className={s.SignIn__Container__Contenido}>
                    <CardInfomativaFormulario />
                </div>
                <div className={s.SignIn__Container__Formulario}>
                    <FormularioSignIn />
                </div>
            </div>
        </div>
    )
}

export default SignIn;

