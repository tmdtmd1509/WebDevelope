import React from 'react';
import PropTypes from 'prop-types';

/**
 * Our new book component
 */
const Contact = ({ _body, name, image, link }) => (
    <article className="partial" style={{ overflow: 'hidden' }}>
        <img src={ image } style={{ float: 'left', width: '30%' }} />
        <div style={{ float: 'left', width: '68%', margin: '0 0 0 2%' }}>
            { _body }
            <a href={ link } style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Know more about { name }
            </a>
        </div>
    </article>
);


Contact.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
};

export default Contact;