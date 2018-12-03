const Pips = ({ images, clickHandler, curIndex }) => {
    const styles = {
        position: 'absolute',
        left: '45%',
        bottom: '10%',
        display: 'block',
        padding: '10px',
    };

    const dot_styles = {
        height: '25px',
        width: '25px',
        margin: '3px',
        backgroundColor: '#dad6ca',
        borderRadius: '50%',
        display: 'inline-block',
    };

    const cur_dot_styles = {
        height: '25px',
        width: '25px',
        margin: '3px',
        backgroundColor: '#47da45',
        borderRadius: '50%',
        display: 'inline-block',
    };

    // let handleClick = (i) => {
    //     () => clickHandler(i);
    // }
    //
    // console.log(curIndex);

    return (
        <div className="pips" style={styles}>
            {/*{images.map((image, i) =>*/}
                {/*{(curIndex == i) ? (*/}
                    {/*<span key={i} onClick={() => clickHandler(i)} style={cur_dot_styles}></span>*/}
                {/*) : (*/}
                    {/*<span key={i} onClick={() => clickHandler(i)} style={dot_styles}></span>*/}
                {/*)}*/}
            {/*)}*/}
            {/*{images.map((image, i) =>*/}
                {/*<span key={i} onClick={handleClick(i)} style={dot_styles}></span>*/}
            {/*)}*/}
            {images.map((image, i) =>
                <span key={i} onClick={() => clickHandler(i)} style={dot_styles}></span>
            )}
        </div>
    );
}

Pips.propTypes = {
    images: PropTypes.string,
    clickHandler: PropTypes.func,
    curIndex: PropTypes.integer,
};