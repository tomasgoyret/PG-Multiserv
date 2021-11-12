import PropTypes from 'prop-types';
import BarElemnts from '../../Moleculas/NavBar/BarElemnts'

const Nav = ({ clase, imagen, arr }) => {
    return (
        <div className={`${clase}`}>
            {imagen}
            <BarElemnts clase='flex' arr={arr}/>
        </div>
    )
}

Nav.propTypes = {
    arr: PropTypes.array
}

export default Nav;