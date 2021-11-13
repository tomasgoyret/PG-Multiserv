import React from 'react'
import { signWithGoogle } from '../../../Firebase';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from '../../Atoms/Button/Button'

const SignInWithSocial = ({ afterLogin }) => {
    const googleRegister = () => {
        signWithGoogle()
            .then((result) => {
                /* const credential = GoogleAuthProvider.credentialFromResult(result) */
                console.log(result)
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
            <div className="px-4 py-2">
                <Button
                    icon={<FaFacebook className="text-2xl mr-3" />}
                    theme="#1877f2"
                    customTextColor="#fffff"
                    text="Continuar con Facebook"
                    full
                    action={() => { console.log('hola') }}
                />
            </div>
        </>
    )
}

export default SignInWithSocial
