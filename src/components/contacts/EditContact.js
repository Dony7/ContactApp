import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

import './addcontact.css'

class EditContact extends Component {
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

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
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

        const updContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

        dispatch({ type: 'UPDATE_CONTACT', payload: res.data })

        // Clear State
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
                            <div className='addcontact-header'><h4>Edit Contact</h4></div>
                            <form onSubmit={this.submit.bind(this, dispatch)}>
                                <div className="form">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name='name' placeholder='Enter Name...' value={name} onChange={this.change} className="form-control form-control-lg" required />
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name='email' placeholder='Enter Email...' value={email} onChange={this.change} required />
                                    <label htmlFor="phone">Phone Number:</label>
                                    <input type="text" name='phone' placeholder='Enter Phone Number...' value={phone} onChange={this.change} required />
                                </div>
                                <input type="submit" value="Update" className='form-button' />
                            </form>
                        </div>
                    )
                }}

            </Consumer>
        )
    }
}

export default EditContact;
