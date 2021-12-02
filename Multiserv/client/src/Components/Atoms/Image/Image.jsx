const Image = ({ imagen, imgClass, name, loadedHandler, failedHandler, imgOnClick, style }) => {
    return (
        <div>
            <img
                style={style}
                onLoad={loadedHandler ? () => { loadedHandler() } : undefined}
                onError={failedHandler ? () => { failedHandler() } : undefined}
                className={imgClass}
                src={imagen}
                alt={name}
                width='100%' 
                onClick={imgOnClick}
                />
        </div>
    )
}

export default Image;