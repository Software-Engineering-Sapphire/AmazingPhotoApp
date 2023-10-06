import React from 'react';
import { Typography } from '@mui/material';
import './UserPhotos.css';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: window.models.photoOfUserModel(this.props.match.params.userId),
    };
  }

  render() {
    const { photos } = this.state;

    return (
        <div>
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
                <img key={index} src={photo.url} alt={`User ${this.props.match.params.userId} Photo`} />
            ))}
          </div>
        </div>
    );
  }
}

export default UserPhotos;
