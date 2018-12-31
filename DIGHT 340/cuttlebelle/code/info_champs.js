import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Our new main component
 */
const Info_champs = ({ title, image1, image2, link1, link2 }) => (
    <div style={{ margin: '20px', alignContent: 'horizontal' }}>
        <h1>{ title }</h1>

        <div style={{ margin: '20px', alignContent: 'vertical', width: '45%'}}>
            <img src={ image1 } style={{ float: 'left', width: '100%' }} />
            <p>View the full champion lineup.</p>
            <a href={ link1 } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Learn More
            </a>
        </div>
        <div style={{ margin: '20px', alignContent: 'vertical', width: '45%'}}>
            <img src={ image2 } style={{ float: 'left', width: '100%' }} />
            <p>The arsenal of items.</p>
            <a href={ link2 } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Learn More
            </a>
        </div>
    </div>
);

export default Info_champs;