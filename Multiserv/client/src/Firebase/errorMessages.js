export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/expired-action-code':
            return 'El enlace de verificación ha expirado'
        case 'auth/invalid-action-code':
            return 'Es probable que ya se haya usado este enlace de verificación anteriormente o no es un enlace válido'
        case 'auth/user-disabled':
            return 'El usuario se encuentra deshabilidato. Crea otra cuenta'
        case 'auth/user-not-found':
            return 'No se encontró ningún usuario con los datos especificados'
        case 'auth/weak-password':
            return 'La contraseña es demasiado débil. Actualiza la página y vuelve a intentarlo'
        case 'auth/invalid-email':
            return 'La dirección de correo especificada no es válida'
        case 'auth/unauthorized-continue-uri':
            return 'La URL especificada no está autorizada'
        
        default:
            return 'Ocurrió un error desconocido. Vuelve a solicitar restablecer tu contraseña';
    }
}