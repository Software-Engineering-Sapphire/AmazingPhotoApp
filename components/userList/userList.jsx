import React from 'react';
import {Chip, Divider, List, ListItemButton, ListItemText, Typography} from '@mui/material';
import './userList.css';
import {Box} from "@mui/system";
import axios from 'axios';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        axios.get('/user/list')
            .then(returnedObject => {
                this.setState({users: returnedObject.data});
            }).catch((err) => {
            console.error(err);
            });
    }

    render() {
        if (this.state.users === null) {
            return <Typography>Loading...</Typography>;
        } else {
            return (
                <List component="nav">
                    <Typography> Users: </Typography>
                {this.state.users.map((user, index) => (
                    <Box key={index}>
                        <ListItemButton href={"#/users/" + user._id}>
                            <ListItemText primary={user.first_name + ' ' + user.last_name}/>
                            {this.props.advancedFeatures && (
                                <>
                                    <Chip label="#" component="a" href={"#/photos/" + user._id} color="success" size="small" clickable />
                                    <Chip label="#" component="a" href={"#/comments/" + user._id} color="error" size="small" clickable />
                                </>
                            )}
                        </ListItemButton>
                        <Divider/>
                    </Box>
                ))}
                </List>
            );
        }
    }
}

export default UserList;