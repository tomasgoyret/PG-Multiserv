import React, {useState}  from 'react'
import Input from '../../Components/Atoms/Input/Input'
import Button from '../../Components/Atoms/Button/Button'
const PasswordReset = () => {
    const [input, setInput] = useState({
        user_mail:""
    })
    function handleChange(e) {
      setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }

      //________________________________________
      async function handleSubmit(e) {
        let {user_mail} = input
        alert("enviando correo : "+user_mail)
        e.preventDefault()
        setInput({
            user_mail: ""
          })
        }
    return (
        <div>
            <div className="container mx-auto flex flex-col justify-center items-center">
             <h1  className="text-4xl"  >Recuperar Contraseña</h1>
             <form onSubmit={handleSubmit}>
                <div className="self-center">
                    <Input 
                    type="text"
                    name="user_mail"
                    value={input.user_mail}
                    onChange={handleChange}
                    theme="#3730A3"
                    placeholder="Escribe tu correo"
                      value={input.user_mail}
                    onChange={handleChange}
                    />
                </div>
                <div className="self-center">
                <Input type="submit" 
                 placeholder="enviar"
                className="inline-flex bg-blue-800 text-white px-4 py-2 rounded-md">
                </Input>
                </div>
                </form> 
                <Button
                value="wewew"
                name="sdsds"
                type="sumit"
                />
            </div>
        </div>
    )
}
export default PasswordReset
