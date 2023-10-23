import React from 'react';
import {Divider, List, ListItemButton, ListItemText, Typography} from '@mui/material';
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