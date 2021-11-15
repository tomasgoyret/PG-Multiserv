const Image = ({ imagen, imgClass, name, loadedHandler, failedHandler }) => {
    return (
        <div>
            <img
                onLoad={loadedHandler ? () => { loadedHandler() } : undefined}
                onError={failedHandler ? () => { failedHandler() } : undefined}
                className={imgClass}
                src={imagen}
                alt={name}
                width='100%' />
        </div>
    )
}

export default Image;