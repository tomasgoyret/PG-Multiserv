import axios from "axios";
import Swal from 'sweetalert2';
const datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
const { displayName, email, photoURL } = datosSesionFromLocalStorage;
const [nameDatosLocalStorage, lastNameDatosLocalStorage] = displayName.split(" ");

export const eliminarUsuario = (uid) => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Al hacer esto perderas todo en tu usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#32C1CD',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar usuario!',
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            axios(`http://localhost:3005/eliminar-usuario/${uid}`)
            .then(response => {
                Swal.fire(
                    'Eliminado!',
                    'Tu usuario se ha eliminado! Volveras al Inicio.',
                    'success'
                  )
            })
            .catch(err => {
                Swal.fire('Changes are not saved', '', 'info')
            })
          
        }
      })

}

export const actualizarDatosUsuario = (user) => {
    let datosActualizados = {

    } 
    datosSesionFromLocalStorage.setItem("datoSesion", JSON.stringify(user));
}