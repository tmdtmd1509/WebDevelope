import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Our new info component
 */
const Info = ({ _body, title, image }) => (
    <article className="partial" style={{ overflow: 'hidden' }}>
        <h1>{ title }</h1>
        <img src={ image } style={{ float: 'left', width: '30%' }} />
        <div style={{ float: 'left', width: '68%', margin: '0 0 0 2%' }}>
            { _body }
        </div>
    </article>
);

export default Info;