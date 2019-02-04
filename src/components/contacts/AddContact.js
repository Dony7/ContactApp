import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

import './addcontact.css'

class AddContact extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = async (dispatch, e) => {
        e.preventDefault();

        const { name, email, phone, errors } = this.state;

        if (name === '') {
            this.setState({
                errors: {
                    name: 'A name is required!'
                }
            })
        } else if (email === '') {
            this.setState({
                errors: {
                    email: 'An email address is required!'
                }
            })
        } else if (phone === '') {
            this.setState({
                errors: {
                    phone: 'A phone number is required!'
                }
            })
        }

        const newContact = {
            name: name,
            email: email,
            phone: phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data });

        this.setState({
            name: '',
            email: '',
            phone: ''
        })

        this.props.history.push('/')
    }

    render() {
        const { name, email, phone } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className='addcontact-card'>
                            <div className='addcontact-header'><h4>Add Contact</h4></div>
                            <form onSubmit={this.submit.bind(this, dispatch)}>
                                <div className="form">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name='name' placeholder='Enter Name...' value={name} onChange={this.change} className="form-control form-control-lg" required />
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name='email' placeholder='Enter Email...' value={email} onChange={this.change} required />
                                    <label htmlFor="phone">Phone Number:</label>
                                    <input type="text" name='phone' placeholder='Enter Phone Number...' value={phone} onChange={this.change} required />
                                </div>
                                <input type="submit" value="Add New Contact" className='form-button' />
                            </form>
                        </div>
                    )
                }}

            </Consumer>
        )
    }
}

export default AddContact;
