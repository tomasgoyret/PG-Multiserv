import React from 'react';
import axios from 'axios';
import { signWithGoogle } from '../../../Firebase';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from '../../Atoms/Button/Button'


const SignInWithSocial = ({ afterLogin }) => {
    const googleRegister = () => {
        signWithGoogle()
            .then((result) => {
                /* const credential = GoogleAuthProvider.credentialFromResult(result) */
                localStorage.setItem("datoSesion",JSON.stringify(result.user))
                console.log(result.user);
                var user ={
                    uid: result.user.uid,
                    mail: result.user.email,
                    name: result.user.displayName,
                    lastName: '',
                    phone: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    isGoogle: true,
                }
                axios.post('http://localhost:3005/agregar-usuario', user)
                afterLogin()
                
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="px-4 py-2">
                <Button
                    type="white"
                    icon={<FcGoogle className="text-2xl mr-3" />}
                    text="Continuar con Google"
                    full
                    action={googleRegister}
                />
            </div>
            {/* <div className="px-4 py-2">
                <Button
                    icon={<FaFacebook className="text-2xl mr-3" />}
                    theme="#1877f2"
                    customTextColor="#fffff"
                    text="Continuar con Facebook"
                    full
                    action={() => { console.log('hola') }}
                />
            </div> */}
        </>
    )
}

export default SignInWithSocial
