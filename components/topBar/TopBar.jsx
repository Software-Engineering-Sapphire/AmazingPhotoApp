import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Name: {this.state.user.first_name + ' ' + this.state.user.last_name}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
