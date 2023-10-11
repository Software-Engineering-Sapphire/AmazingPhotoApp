import React from 'react';
import {Divider, ListItemButton, ListItemText, Typography} from '@mui/material';
import './UserPhotos.css';
import {Link} from "react-router-dom";

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: window.models.photoOfUserModel(this.props.match.params.userId),
        user: window.models.userModel(this.props.match.params.userId)
    };
    this.updateTopBarStatus();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
          this.state.photos = window.models.photoOfUserModel(this.props.match.params.userId);
          this.updateTopBarStatus();
      }
  }

  updateTopBarStatus() {
      this.props.updateTopBarStatus("Photos for " + this.state.user.first_name + " " + this.state.user.last_name)
  }

    render() {
    const { photos } = this.state;
   console.log(this.props.match.params.userId);
    return (
        <div>
            <div key="wow">
                <Link to={`/users/${this.props.match.params.userId}`}>
                    <ListItemButton>
                        <ListItemText primary="Photo Information" />
                    </ListItemButton>
                </Link>
                <Divider />
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
            {photos.map((photo, index) => (
                <img key={index} src={"../../images/"+photo.file_name} alt={`User ${this.props.match.params.userId} Photo`} />
            ))}

          </div>
        </div>
    );
  }
}

export default UserPhotos;
