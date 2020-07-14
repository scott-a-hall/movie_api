import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ Username, setUsername ] = useState('');
    const [ Password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Username, Password);
        //Send a request to the server for authentication then call this.props.onLoggedIn(Username)
        props.onLoggedIn(Username);
    };

    return (
        <Form className="login-form">
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button type="button" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}