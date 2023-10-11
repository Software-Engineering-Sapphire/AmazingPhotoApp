import React from 'react';
import {Button, Divider, ListItemButton, ListItemText, Typography} from '@mui/material';
import './userPhotos.css';
import {Link} from "react-router-dom";

class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: window.models.photoOfUserModel(this.props.match.params.userId),
            userId: this.props.match.params.userId,
        };
    }

    render() {
        const {photos} = this.state;

        return (
            <div>
                <div key="userDetailsBtn">
                    <Link to={`/users/${this.state.userId}`}>
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
                    User ID: {this.state.userId}
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
                            <div className="wow">
                            <p>{photo.date_time}</p>
                            <img src={"../../images/" + photo.file_name}
                                 alt={`User ${this.state.userId} Photo`}/>
                            </div>
                            {photo.comments.map((comment, index2) =>

                                <div className="wow" key={index.toString() + index2.toString()}>
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
