import { Link } from "react-router-dom"

const ButtonXartiago = ({ clase, btnClass, btn, page }) => {
    return (
        <div className={clase} >
            <Link to={`/${page}`}> <button className={btnClass} >{btn}</button> </Link>
        </div>
    )
}

export default ButtonXartiago