import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
    const [ Username, createUsername ] = useState ('');
    const [ Password, createPassword ] = useState ('');
    const [ Email, createEmail ] = useState('');
    const [ Birthday, createBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Username, Password, Email, Birthday);
    }

    return (
        <Form className="registration-form">
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter username" value={Username} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Enter password" value={Password} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" placeholder="Enter valid email address" value={Email} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" placeholder="MM/DD/YYYY" value={Birthday} />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    );
}