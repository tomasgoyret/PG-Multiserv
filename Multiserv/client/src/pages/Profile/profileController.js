import axios from "axios";
import Swal from 'sweetalert2';
const datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))




export const actualizarDatosUsuario = (user) => {
    const { name, lastName, photoURL, uid } = user;

    let datosActualizados = 

    axios.put(`http://localhost:3005/editar-usuario/${uid}`, {
        name,
        lastName,
        uid,
        photoURL,
        phone: ""
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
    // datosSesionFromLocalStorage.setItem("datoSesion", JSON.stringify(user));
    console.log(datosActualizados)
}