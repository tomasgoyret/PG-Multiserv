import Encabezado1 from '../../Atoms/Encabezados/Encabezado1'
import Image from '../../Atoms/Image/Image'

const EncWImg = ({ clase, titulo, classTitulo, img, imgClass, imgName, imgContClass }) => {
    return (
        <div className={clase} >
            <Encabezado1 titulo={titulo} clases={classTitulo} />
            <Image imagen={img} clase={imgContClass} name={imgName} imgClass={imgClass} />
        </div>
    )
}

export default EncWImg