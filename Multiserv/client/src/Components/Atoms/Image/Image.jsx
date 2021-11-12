const Image = ({ clase, imagen, imgClass, name }) => {
    return (
        <div className={clase}>
            <img className={imgClass} src={imagen} alt={name} width='100%' />
        </div>
    )
}

export default Image;