import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import './UserList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: window.models.userListModel(),
    };
  }

  render() {
    return (
        <div>
          <Typography variant="body1">
            This is the user list, which takes up 3/12 of the window.
            You might choose to use <a href="https://mui.com/components/lists/">Lists</a> and <a href="https://mui.com/components/dividers/">Dividers</a> to
            display your users like so:
          </Typography>
          <List component="nav">
            {this.state.users.map((user, index) => (
                <div key={index}>
                  <Link to={`/user/${user.id}`}>
                    <ListItem button>
                      <ListItemText primary={user.name} />
                    </ListItem>
                  </Link>
                  <Divider />
                </div>
            ))}
          </List>
          <Typography variant="body1">
            The model comes in from window.models.userListModel()
          </Typography>
        </div>
    );
  }
}

export default UserList;