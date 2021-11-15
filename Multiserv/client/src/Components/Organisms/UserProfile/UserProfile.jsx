// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import s from "./UserProfile.module.css";

// const UserProfile = () => {
//     let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
//     console.log(datosSesionFromLocalStorage)
//     const navigate = useNavigate();
//     const [verPerfil, setVerPerfil] = useState(false)

//     const logout = (e) => {
//         e.preventDefault();
//         localStorage.removeItem("datoSesion")
//         navigate("/")
//     }

//     const handleClick = () => {
//         setVerPerfil(!verPerfil);
//     }

//     const modal = ( 
//         verPerfil ?
//         <div className={s.UserProfile__OnClick}>
//             <img src={datosSesionFromLocalStorage.photoURL} alt="" />
//             <span>{datosSesionFromLocalStorage.displayName}</span>
//             <br />
//             <button onClick={logout}>Logout</button>
//         </div>
//         :
//         null)

//     return(
//         <div className={s.UserProfile}>
//             <img className={s.UserProfile__Imagen} onClick={handleClick} src={datosSesionFromLocalStorage.photoURL} alt="" />
//             {
//                 modal
//             }
//         </div>
//     )
// }

// export default UserProfile;