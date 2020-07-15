import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './registration-view.scss';

export function RegistrationView(props) {
    const [ Username, createUsername ] = useState ('');
    const [ Password, createPassword ] = useState ('');
    const [ Email, createEmail ] = useState('');
    const [ Birthday, createBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Username, Password, Email, Birthday);
        props.onRegister(Username);
    }

    return (
        <Container className="registration-form">
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter username" value={Username} onChange={e => createUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Enter password" value={Password} onChange={e => createPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" placeholder="Enter valid email address" value={Email} onChange={e => createEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" placeholder="MM/DD/YYYY" value={Birthday} onChange={e => createBirthday(e.target.value)}/>
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
        </Container>
    );
}