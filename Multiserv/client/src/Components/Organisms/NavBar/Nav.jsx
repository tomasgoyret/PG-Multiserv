import BarElements from '../../Molecules/BarElements/BarElements'
import Image from '../../Atoms/Image/Image'

const Nav = ({ clase, imagen, imgClass, imgName, arr, claseArr, onClick}) => {
    return (
        <div className={`${clase}`}>
            <Image imgClass={imgClass} imagen={imagen} name={imgName} onClick={onClick}/>
            <BarElements clase={claseArr} arr={arr}/>
        </div>
    )
}
export default Nav;