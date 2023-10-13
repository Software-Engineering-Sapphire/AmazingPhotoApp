import React from 'react';
import {Button, Divider, Typography} from '@mui/material';
import './userPhotos.css';
import {Link} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            user: null
        };
    }

    componentDidMount() {
        this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {
        fetchModel('/photosOfUser/' + this.props.match.params.userId)
            .then(returnedObject => {
                this.setState({photos: returnedObject.data});
            });

        fetchModel('/user/' + this.props.match.params.userId)
            .then(returnedObject => {
                this.setState({user: returnedObject.data});
                this.updateTopBarStatus();
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.fetchDataFromAPI();
            this.updateTopBarStatus();
        }
    }

    updateTopBarStatus() {
        if (this.state.user !== null) {
            this.props.updateTopBarStatus("Photos for " + this.state.user.first_name + " " + this.state.user.last_name);
        }
    }

    render() {
        const {photos} = this.state;
        if (photos === null) {
            return <Typography>Loading...</Typography>;
        } else {
            return (
                <div>
                    <div key="userDetailsBtn">
                        <Button variant="contained" href={`#/users/${this.props.match.params.userId}`}>
                            User Details
                        </Button>
                        <Divider/>
                    </div>
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
                            return (
                                <div key={index}>
                                    <div className="wow">
                                        <p>{photo.date_time}</p>
                                        <img src={"../../images/" + photo.file_name}
                                             alt={`User ${this.props.match.params.userId}`}/>
                                    </div>
                                    {photo.comments.map((comment, index2) => (

                                        <div className="wow" key={index.toString() + index2.toString()}>
                                            <p>{comment.date_time}</p>
                                            <Link to={`/users/${comment.user._id}`}>
                                                <p>{comment.user.first_name + " " + comment.user.last_name}</p>
                                            </Link>
                                            <p>{comment.comment}</p>
                                        </div>
                                        )
                                    )}
                                </div>
                            );
                        })}


                    </div>
                </div>
            );
        }
    }
}

export default UserPhotos;
