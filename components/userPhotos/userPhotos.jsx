import React from 'react';
import {Button, Divider, ListItemButton, ListItemText, Typography} from '@mui/material';
import './UserPhotos.css';
import {Link} from "react-router-dom";

class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: window.models.photoOfUserModel(this.props.match.params.userId),
        };
    }

    render() {
        const {photos} = this.state;

        return (
            <div>
                <div key="userDetailsBtn">
                    <Link to={`/users/${this.props.match.params.userId}`}>
                        <Button variant="contained">
                            User Photos
                        </Button>
                    </Link>
                    <Divider/>
                </div>
                <Typography variant="body1">
                    This should be the UserPhotos view of the PhotoShare app.
                </Typography>
                <Typography variant="body1">
                    User ID: {this.props.match.params.userId}
                </Typography>
                <Typography variant="body1">
                    User Photos:
                </Typography>
                <div>
                    {photos.map((photo, index) => {
                        if (photo.comments === undefined) {
                            photo.comments = [];
                        }
                        return <div key={index}>
                            <p>{photo.date_time}</p>
                            <img src={"../../images/" + photo.file_name}
                                 alt={`User ${this.props.match.params.userId} Photo`}/>
                            {photo.comments.map((comment, index2) =>
                                <div key={index.toString() + index2.toString()}>
                                    <p>{comment.date_time}</p>
                                    <Link to={`/users/${comment.user._id}`}>
                                        <p>{comment.user.first_name + " " + comment.user.last_name}</p>
                                    </Link>
                                    <p>{comment.comment}</p>
                                </div>
                            )}
                        </div>
                    })}

                </div>
            </div>
        );
    }
}

export default UserPhotos;
