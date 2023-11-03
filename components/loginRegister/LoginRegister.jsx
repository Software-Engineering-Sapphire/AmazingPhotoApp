import React from 'react';
import './LoginRegister.css';
import {Alert, Button, Container, FormControl, TextField} from "@mui/material";
import axios from "axios";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            invalidInput: false
        };
    }

    loginUser(userName) {
        axios.post('/admin/login', JSON.stringify({login_name: userName}), {
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

    render() {
        return (
            <Container>
                <FormControl fullWidth>
                    {this.state.invalidInput && <Alert severity="error">Invalid Login Attempt</Alert>}
                    <TextField
                        label="Username"
                        onChange={(e) => this.setState({userName: e.target.value})}
                        required
                        variant="outlined"
                        margin={"normal"}
                        value={this.state.userName}
                    />
                    <Button variant="outlined"
                            onClick={() => {
                                this.loginUser(this.state.userName);
                            }}> Login
                    </Button>
                </FormControl>
            </Container>
        );
    }
}

export default LoginRegister;