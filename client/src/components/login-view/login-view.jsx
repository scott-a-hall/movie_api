import React, { useState } from 'react';

export function LoginView(props) {
    const [ Username, setUsername ] = useState('');
    const [ Password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Username, Password);
        //Send a request to the server for authentication then call this.props.onLoggedIn(Username)
        props.onLoggedIn(Username);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value={Username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={Password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}