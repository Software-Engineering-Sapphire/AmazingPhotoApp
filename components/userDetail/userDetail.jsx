'use strict'

import React from 'react';
import { Typography } from '@mui/material';
import './UserDetail.css';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.models.userModel(this.props.match.params.userId),
        };
        this.updateTopBarStatus();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.state.user = window.models.userModel(this.props.match.params.userId);
            this.updateTopBarStatus()
        }
    }

    updateTopBarStatus() {
        this.props.updateTopBarStatus(this.state.user.first_name + " " + this.state.user.last_name);
    }

    render() {
        return (
            <div>
                <Typography variant="body1">
                    This should be the UserDetail view of the PhotoShare app.
                </Typography>
                <Typography variant="body1">
                    User ID: {this.state.user._id}
                </Typography>
                <Typography variant="body1">
                    User Name: {this.state.user.first_name + ' ' + this.state.user.last_name}
                </Typography>
                {/* Add more user details as needed */}
            </div>
        );
    }
}

export default UserDetail;