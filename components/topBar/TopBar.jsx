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
            {this.props.topBarStatus}
          </Typography>
          <Typography className="left" variant="h5" color="inherit" >
            Team Sapphire Version: {window.models.schemaInfo().__v}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
