import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


/**
 * The Nav component
 */
const Nav = ({ home, name, name1, name2, name3, name4 }) => (
    <nav className="nav">
        <ul>
            <li className="nav__link nav__link--fixed">
                <a href={ home } >
                    { name }
                </a>
            </li>
            <li className="nav__link nav__link--fixed">
                <a href={home+name1} >
                    { name1 }
                </a>
            </li>
            <li className="nav__link nav__link--fixed">
                <a href={home+name2} >
                    { name2 }
                </a>
            </li>
            <li className="nav__link nav__link--fixed">
                <a href={home+name3} >
                    { name3 }
                </a>
            </li>
            <li className="nav__link nav__link--fixed">
                <a href={home+name4} >
                    { name4 }
                </a>
            </li>
        </ul>
    </nav>
);

Nav.propTypes = {
    /**
     layout: nav
     home: http://localhost:8080/
     name: home
     name1: info
     name2: news
     name3: mode
     name4: contact
     */
};

export default Nav;