import BarElements from '../../Molecules/BarElements/BarElements'
import Image from '../../Atoms/Image/Image'

const Nav = ({ clase, imagen, imgClass, imgName, arr, claseArr}) => {
    return (
        <div className={`${clase}`}>
            <Image imgClass={imgClass} imagen={imagen} name={imgName}/>
            <BarElements clase={claseArr} arr={arr}/>
        </div>
    )
}
export default Nav;