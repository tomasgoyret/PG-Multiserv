const Image = ({ imagen, imgClass, name, onClick }) => {
    return (
        <div>
            <img className={imgClass} src={imagen} alt={name} width='100%' onClick={onClick}/>
        </div>
    )
}

export default Image;