import React from 'react';
import {Button, Divider, Typography} from '@mui/material';
import './userComments.css';
import axios from 'axios';

class UserComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            user: null
        };
    }

    componentDidMount() {
        this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {
        axios.get('/commentsOfUser/' + this.props.match.params.userId)
            .then(returnedObject => {
                this.setState({comments: returnedObject.data});
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get('/user/' + this.props.match.params.userId)
            .then(returnedObject => {
                this.setState({user: returnedObject.data});
                this.updateTopBarStatus();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.fetchDataFromAPI();
        }
    }

    updateTopBarStatus() {
        if (this.state.user !== null) {
            this.props.updateTopBarStatus("Comments for " + this.state.user.first_name + " " + this.state.user.last_name);
        }
    }

    render() {
        const {comments} = this.state;
        if (comments === null) {
            return <Typography>Loading...</Typography>;
        } else {
            return (
                <div>
                    <div>
                        <Button variant="contained" href={`#/users/${this.props.match.params.userId}`}>
                            User Details
                        </Button>
                        <Divider/>
                    </div>
                    <Typography variant="body1">
                        User ID: {this.props.match.params.userId}
                    </Typography>
                    <Typography variant="body1">
                        User Comments:
                    </Typography>
                    <Divider/>
                    {comments.map((comment, index) => {
                        return (
                            <>
                                <div key={index} className="comment-block">
                                    <img src={'../../images/'+comment.photo_name} alt="related to this comment"/>
                                    <div>
                                        <Typography variant="body1">
                                            {comment.text}
                                        </Typography>
                                        <Typography variant="body2">
                                            {comment.date_time.slice(0,10)}
                                        </Typography>
                                    </div>
                                </div>
                                <Divider/>
                            </>
                        );
                    })}
                </div>
            );
        }
    }
}

export default UserComments;
