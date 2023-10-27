import React from 'react';
import {
    AppBar, Toolbar, Typography, Checkbox, FormControlLabel
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
        axios.get('/test/info')
            .then(returnedObject => {
                this.setState({version: returnedObject.data.__v});
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.fetchDataFromAPI();
    }

    handleCheckboxChange = (event) => {
        this.props.toggleAdvancedFeatures(event.target.checked);
    };

    render() {
        return (
            <AppBar className="topbar-appBar" position="absolute">
                <Toolbar className="topbar-toolbar">
                    <Typography variant="h5" color="inherit">
                        {this.props.topBarStatus}
                    </Typography>
                    <FormControlLabel control={(
                        <Checkbox checked={this.props.advancedFeatures}
                                  onChange={this.handleCheckboxChange}
                                  style={{color: '#FFF'}}
                        />
                    )} label="Advanced Features"/>
                    <Typography variant="h5" color="inherit">
                        Team Sapphire Version: {this.state.version}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
