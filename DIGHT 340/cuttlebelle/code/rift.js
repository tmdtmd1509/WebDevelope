import React from 'react';
import PropTypes from 'prop-types';

const Rift = ({ _body, title, image }) => (
    <div style={{ width: '100%', height: '30%'}}>
        <h3>{ title }</h3>
        <img src={ image } style={{ float: 'left', width: '30%', margin: '10px' }} />
        <p style={{ width: '100%'}}>{ _body }</p>
    </div>
);

Rift.propTypes = {
    title: PropTypes.string,
};

export default Rift;