import React from 'react'
import { useSearchParams } from "react-router-dom";
import EmailVerified from '../../Components/Organisms/validationHandlers/EmailVerified/EmailVerified';

const UsersValidations = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = {
        mode: searchParams.get('mode'),
        oobCode: searchParams.get('oobCode'),
        apiKey: searchParams.get('apiKey'),
        lang: searchParams.get('lang')
    }
    console.log(params);
    const getTypeOfValidation = () => {
        switch (params.mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                //handleResetPassword(auth, actionCode, continueUrl, lang);
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                //handleRecoverEmail(auth, actionCode, lang);
                break;
            case 'verifyEmail':
                return <EmailVerified validationCode={params.oobCode} />
                // Display email verification handler and UI.
                //handleVerifyEmail(auth, actionCode, continueUrl, lang);
                break;
            default:
            // Error: invalid mode.
        }
    }

    return (
        <div className="bg-cyan-900 text-white h-screen">
            {getTypeOfValidation()}
        </div>
    )
}

export default UsersValidations
