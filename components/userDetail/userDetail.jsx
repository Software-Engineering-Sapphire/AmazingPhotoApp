import React from 'react';
import { Typography } from '@mui/material';
import './UserDetail.css';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.models.userModel(this.props.match.params.userId),
        };
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <Typography variant="body1">
                    This should be the UserDetail view of the PhotoShare app.
                </Typography>
                <Typography variant="body1">
                    User ID: {user.id}
                </Typography>
                <Typography variant="body1">
                    User Name: {user.name}
                </Typography>
                {/* Add more user details as needed */}
            </div>
        );
    }
}

export default UserDetail;