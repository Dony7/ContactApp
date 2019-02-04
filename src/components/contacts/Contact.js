import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context'

import './contact.css';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

    showClick = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        })

    }

    deleteClick = async (id, dispatch) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({ type: 'DELETE_CONTACT', payload: id });
        } catch{
            dispatch({ type: 'DELETE_CONTACT', payload: id });

        }

    }

    render() {

        const { contact } = this.props;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className='card-body'>
                            <div className="card-header">
                                <h1 onClick={this.showClick} >{contact.name} <i className="fas fa-angle-down" /></h1>

                                <Link to={`contact/edit/${contact.id}`}>
                                    <i className="fas fa-edit" ></i>
                                </Link>
                                <i className="fas fa-trash-alt" onClick={this.deleteClick.bind(this, contact.id, dispatch)}></i>
                            </div>
                            {showContactInfo ? <ul className='list-group'>
                                <li className='list-item'><span>Email:</span> {contact.email}</li>
                                <li className='list-item'><span>Phone:</span> {contact.phone}</li>
                            </ul> : null}

                        </div>
                    )
                }}
            </Consumer>

        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,

}

export default Contact;