import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const { branding } = props;

    return (
        <div className="header">
            <div className="container">
                <a href="/" className="branding title">{branding}</a>
                <Link to='/' className='header-link'><i className="fas fa-home"></i> Home</Link>
                <Link to='/about' className='header-link'><i className="fas fa-question"></i> About</Link>
                <Link to='/contact/add' className='header-link'><i className="fas fa-plus"></i> Add</Link>

            </div>
        </div>
    )
}

Header.defaultProps = {
    branding: 'Contact App'
}

Header.propTypes = {
    branding: PropTypes.string.isRequired
}

export default Header;
