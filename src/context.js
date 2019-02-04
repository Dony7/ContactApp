import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(cur => {
                    return cur.id !== action.payload;
                })
            }

        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };

        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(cur => cur.id === action.payload.id ? cur = action.payload : cur)
            };

        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                phone: '777-777-7777'
            },
            {
                id: 2,
                name: 'Steve Jones',
                email: 'sjones@gmail.com',
                phone: '555-555-5555'
            },
            {
                id: 3,
                name: 'Angela Jones',
                email: 'aj93@gmail.com',
                phone: '222-222-2222'
            }
        ],

        dispatch: action => this.setState(state => reducer(state, action))
    };

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({
            contacts: res.data
        })
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;