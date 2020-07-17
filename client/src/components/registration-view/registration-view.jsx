import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './registration-view.scss';
import PropTypes from 'prop-types';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, createUsername ] = useState ('');
    const [ password, createPassword ] = useState ('');
    const [ email, createEmail ] = useState('');
    const [ birthday, createBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://sah-movie-database.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/','_self');
        })
        .catch(e => {
            console.log('Error registering the user')
        });
    }

    return (
        <Container className="registration-form">
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => createUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => createPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter valid email address" value={email} onChange={e => createEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" placeholder="MM/DD/YYYY" value={birthday} onChange={e => createBirthday(e.target.value)}/>
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
        </Container>
    );
};

RegistrationView.propTyes = {
    onRegister: PropTypes.func.isRequired
};