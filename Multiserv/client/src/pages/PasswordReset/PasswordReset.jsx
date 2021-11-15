import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import { FcGoogle } from "react-icons/fc";
import { AiFillCaretRight } from "react-icons/ai";
//import {firebase} from "firebase/auth";
import Button from '../../Components/Atoms/Button/Button';
import ButtonXartiago from '../../Components/Atoms/ButtonXartiago/ButtonXartiago';
//import {getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth'

const PasswordReset = () => {
const [mail, setMail] = useState("")
//____________-capturar
const handleMail = (text) => {
  setMail(text)
}


function resetPassword () {
  const auth = getAuth();
  sendPasswordResetEmail(auth, mail)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log('OKEY')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode,errorMessage)
    });
}


// const handleSubmit = (e) => {
//   e.preventDefault()
//   //________________________________________
// const auth = getAuth();
// auth.languageCode = 'es';
// sendPasswordResetEmail(auth, mail)
//   .then(() => {
//     return
//     // Password reset email sent!
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode+"..........."+ errorMessage)
//     // ..
//   });

  
// //________________________________________
// //firebase.auth().sendPasswordResetEmail('user@example.com')
// //________________________________________
// // var auth = firebase.auth();
// // var emailAddress = mail;
// // alert(emailAddress)
// // auth.sendPasswordResetEmail(emailAddress)
// // .then(function() {  
// // // Email sent.
// // console.log("ingresooooooooooooo")
// // })
// // .catch(function(error) {
// // // An error happened.
// // });


// // alert('correo: ' + mail)



// }
  return (
      <div>
          <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
          <div className="">
              <ButtonXartiago
                  btn="Volver"
                  page=""
                  btnClass="flex justify-center font-semibold inline-flex w-32 text-lg px-4 py-2 bg-green-700 text-gray-50 hover:bg-green-800 active:bg-green-600 rounded-md transition-all ease-in-out duration-300 "
              />
          </div>
          <div className="px-4 pt-6 pb-4">
               <h1 className="source-sans text-center text-3xl font-semibold text-cyan-800">Recuperar Contraseña!</h1>
          </div>
          <div style={{ width: '350px', backgroundColor: '#fdfdfd' }} className="self-center my-12 rounded-md shadow-lg transition-all ease-out duration-300">
          <form onSubmit={resetPassword}>
              <div  className="self-center">
            <Input
              label='Correo'
              type="text"
              flexed
              id="user_mail"
              theme="#3730A3"
              placeholder="Escribe tu correo"
              callBack={handleMail}
            />
              </div>
           <Button
            submit
            full
            
            icon={<AiFillCaretRight className="mr-2" />}
            type="standard"
            text="Enviar"
          />
              </form>
 

          </div>
       </div>
      </div>
  )
}
export default PasswordReset
