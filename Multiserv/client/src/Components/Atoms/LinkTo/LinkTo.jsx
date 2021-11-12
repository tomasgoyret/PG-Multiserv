import { Link } from 'react-router-dom'

const LinkTo = ({ page, render, linkClass }) => { // page es la url, y el render puede ser un texto un icono, una imagen o un componente
    return (
        <div>
            <span className={linkClass}><Link to={`/${page}`}>{render}</Link></span>
        </div>
    )
}

export default LinkTo