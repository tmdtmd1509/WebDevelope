import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

/**
 * Our new main component
 */
const Home = ({ _body, title, video1, image1, video2, image2, link }) => (
    <div style={{ overflow: 'hidden' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '30px'}}>{ title }</h1>
        <div style={{ float: 'left', width: '100%', margin: '10px' }}>
            <a href={ link } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                { _body }
            </a>
        </div>

        {/*<ReactPlayer url={ video1 } />*/}
        <img src={ image1 } style={{ float: 'left', width: '30%'}} />
        <a href={ video1 } style={{ float: 'left', width: '100%', margin: '10px' }}>Snowdown 2018 Event Trailer</a>

        {/*<ReactPlayer url={ video2 } />*/}
        <img src={ image2 } style={{ float: 'left', width: '30%'}} />
        <a href={ video2 }style={{ float: 'left', width: '100%', margin: '10px' }}>Neeko Champion Spotlight</a>
    </div>
);


Home.propTypes = {
    title: PropTypes.string,
    video1: PropTypes.string,
    image1: PropTypes.string,
    video2: PropTypes.string,
    image2: PropTypes.string,
    link: PropTypes.string,
};

Home.defaultProps = {};



export default Home;