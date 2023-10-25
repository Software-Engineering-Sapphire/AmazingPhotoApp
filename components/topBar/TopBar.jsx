import React from 'react';
import {
    AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            version: undefined
        };
    }

    fetchDataFromAPI() {
       axios.get('/test/info').then(returnedObject => {
            this.setState({version: returnedObject.data.__v});
        });
    }

    componentDidMount() {
        this.fetchDataFromAPI();
    }
    render() {
        return (
            <AppBar className="topbar-appBar" position="absolute">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        {this.props.topBarStatus}
                    </Typography>
                    <Typography className="left" variant="h5" color="inherit">
                        Team Sapphire Version: {this.state.version}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
