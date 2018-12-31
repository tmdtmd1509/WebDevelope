import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Our new news component
 */
const News = ({ _body, title, image1, image2, image3, link1, link2, link3, newsLink }) => (
    <div className="partial" style={{ overflow: 'hidden' }}>
        <title sytle={{ fontSize: '30px', margin: '20px' }}>title</title>
        <img src={ image1 } style={{ float: 'left', width: '30%' }} />
        <div style={{ float: 'left', width: '100%', margin: '10px' }}>
            <a href={ link1 } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Ask Riot: Neeko Edition
            </a>
        </div>

        <img src={ image2 } style={{ float: 'left', width: '30%' }} />
        <div style={{ float: 'left', width: '100%', margin: '10px' }}>
            <a href={ link2 } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Champion and skin sale: 12.14 - 12.17
            </a>
        </div>

        <img src={ image3 } style={{ float: 'left', width: '30%' }} />
        <div style={{ float: 'left', width: '100%', margin: '10px' }}>
            <a href={ link3 } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Ending Support for Windows XP and Vista
            </a>
        </div>
        <div style={{ float: 'left', width: '100%', margin: '10px' }}>
            <a href={ newsLink } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                { _body }
            </a>
        </div>
    </div>
);

News.propTypes = {
    title: PropTypes.string,
    image1: PropTypes.string,
    link1: PropTypes.string,
    image2: PropTypes.string,
    link2: PropTypes.string,
    image3: PropTypes.string,
    link3: PropTypes.string,
    newsLink: PropTypes.string,
};

News.defaultProps = {};


export default News;