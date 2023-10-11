'use strict'

import React from 'react';
import {Button, Divider, ListItemButton, ListItemText, Typography} from '@mui/material';
import './UserDetail.css';
import {Link} from "react-router-dom";

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.models.userModel(this.props.match.params.userId)
        };
    }

    render() {
        this.state.user = window.models.userModel(this.props.match.params.userId);
        return (
            <div>
                <div key="userPhotosBtn">
                    <Link to={`/photos/${this.props.match.params.userId}`}>
                        <Button variant="contained">
                            User Photos
                        </Button>
                    </Link>
                    <Divider/>
                </div>
                <Typography variant="body1">
                    This should be the UserDetail view of the PhotoShare app.
                </Typography>
                <Typography variant="body1">
                    User ID: {this.state.user._id}
                </Typography>
                <Typography variant="body1">
                    User Name: {this.state.user.first_name + ' ' + this.state.user.last_name}
                </Typography>
                <Typography variant="body1">
                    Location: {this.state.user.location}
                </Typography>
                <Typography variant="body1">
                    Description: {this.state.user.description}
                </Typography>
                <Typography variant="body1">
                    Occupation: {this.state.user.occupation}
                </Typography>
            </div>
        );
    }
}

export default UserDetail;