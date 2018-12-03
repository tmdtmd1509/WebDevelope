const Slides = ({ translateValue, images }) => {
        const styles = {
            position: 'relative',
            height: '100%',
            width: '100%',
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out .45s',
        };
        return (
            <div className = "wrapper-slides" style={styles}>
                {images.map((image, i) => (
                    <Slide key={i} image={image} />
                ))}
            </div>
        );
};