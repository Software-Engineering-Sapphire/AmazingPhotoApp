import React from 'react';
import './LoginRegister.css';
import { Alert, Button, Container, FormControl, TextField } from '@mui/material';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            location: '',
            description: '',
            occupation: '',// Add a confirmPassword field
            invalidInput: false,
        };
    }

    loginUser(userName,password) {
        axios.post('/admin/login', JSON.stringify({login_name: userName, password}), {
            headers: {
                'Content-Type' : 'application/json',
            }})
            .then( (obj) => {
                this.setState({loggedInUser: obj.data.user});
                this.props.updateLoggedInUser(this.state.loggedInUser);
                this.props.history.push('/users/' + this.state.loggedInUser._id);
                this.setState({invalidInput : false});
            }).catch((err) => {
            this.setState({invalidInput : true});
            console.log(err);
        });
    }

    registerUser(userName, password, firstName, lastName, location, occupation, description) {
        if (password !== this.state.confirmPassword) {
            this.setState({ invalidInput: true });
            return;
        }

        axios
            .post('/admin/register', JSON.stringify({ login_name: userName, password: password, first_name: firstName, last_name: lastName, location: location, occupation: occupation, description: description}), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((obj) => {
                // Handle successful registration, you can redirect or show a success message here
                // ...

                this.setState({ invalidInput: false });
            })
            .catch((err) => {
                this.setState({ invalidInput: true });
                console.log(err);
            });
    }

    render() {
        return (
            <Container>
                <FormControl fullWidth>
                    {this.state.invalidInput && <Alert severity="error">Invalid Input</Alert>}
                    <TextField
                        label="Username"
                        onChange={(e) => this.setState({ userName: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.userName}
                    />
                    <TextField
                        label="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                        variant="outlined"
                        type="password"
                        margin={'normal'}
                        value={this.state.password}
                    />
                    <TextField
                        label="Confirm Password"
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        required
                        variant="outlined"
                        type="password"
                        margin={'normal'}
                        value={this.state.confirmPassword}
                    />
                    <TextField
                        label="Enter first name"
                        onChange={(e) => this.setState({ firstName: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.firstName}
                    />
                    <TextField
                        label="Enter last name"
                        onChange={(e) => this.setState({ lastName: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.lastName}
                    />
                    <TextField
                        label="Enter address"
                        onChange={(e) => this.setState({ location: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.location}
                    />
                    <TextField
                        label="Enter occupation"
                        onChange={(e) => this.setState({ occupation: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.occupation}
                    />
                    <TextField
                        label="Enter description"
                        onChange={(e) => this.setState({ description: e.target.value })}
                        required
                        variant="outlined"
                        margin={'normal'}
                        value={this.state.description}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            this.loginUser(this.state.userName, this.state.password);
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            this.registerUser(this.state.userName, this.state.password, this.state.lastName,this.state.firstName,this.state.location,this.state.occupation);
                        }}
                    >
                        Register
                    </Button>
                </FormControl>
            </Container>
        );
    }
}

export default LoginRegister;
