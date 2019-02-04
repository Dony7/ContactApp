import React, { Component } from 'react';
import Contact from './Contact';
import './contact.css';

import { Consumer } from '../../context'
import './contact.css'

class Contacts extends Component {

    render() {
        return (
            <Consumer>
                {value => {
                    const { contacts } = value;
                    return (
                        <React.Fragment>
                            <div className="title-container">
                                <h1 className="contacts-title"><span>Contact</span> List</h1>
                            </div>
                            {contacts.map(cur => (
                                <Contact
                                    key={cur.id}
                                    contact={cur}
                                />
                            ))}
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )

    }
}

export default Contacts;