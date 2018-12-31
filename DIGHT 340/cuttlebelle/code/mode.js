import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


/**
 * Our new main component
 */
const Mode = ({ _body, title, link }) => (
    <article className="partial" style={{ overflow: 'hidden' }}>
        <h1>{ title }</h1>
        <a href={ link } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
            { _body }
        </a>

    </article>
);

export default Mode;