const Image = ({ imagen, imgClass, name }) => {
    return (
        <div>
            <img className={imgClass} src={imagen} alt={name} width='100%' />
        </div>
    )
}

export default Image;