import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Switch
} from 'react-router-dom';
import {
    Grid, Paper
} from '@mui/material';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

class PhotoShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topBarStatus: "",
            advancedFeatures: false
        };
        this.updateTopBarStatus = this.updateTopBarStatus.bind(this);
        this.toggleAdvancedFeatures = this.toggleAdvancedFeatures.bind(this);
    }

    updateTopBarStatus = (updatedStatus) => {
        this.setState({topBarStatus: updatedStatus});
    };

    toggleAdvancedFeatures = (advancedFeaturesBool) => {
        this.setState({advancedFeatures: advancedFeaturesBool});
    };

    render() {
        return (
            <HashRouter>
                <div>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <TopBar topBarStatus={this.state.topBarStatus}
                                    advancedFeatures={this.state.advancedFeatures}
                                    toggleAdvancedFeatures={this.toggleAdvancedFeatures}
                            />
                        </Grid>
                        <div className="main-topbar-buffer"/>
                        <Grid item sm={3}>
                            <Paper className="main-grid-item">
                                <UserList/>
                            </Paper>
                        </Grid>
                        <Grid item sm={9}>
                            <Paper className="main-grid-item">
                                <Switch>
                                    <Route exact path="/"/>
                                    {/* :userId is a placeholder for a user ID. userId is passed as props to the UserDetail component. */}
                                    <Route path="/users/:userId"
                                           render={props => (
                                               <UserDetail {...props}
                                                           updateTopBarStatus={this.updateTopBarStatus}/>
                                           )}
                                    />
                                    <Route path="/photos/:userId"
                                           render={props => (
                                               <UserPhotos {...props}
                                                           updateTopBarStatus={this.updateTopBarStatus}
                                                           advancedFeatures={this.state.advancedFeatures}
                                               />
                                           )}
                                    />
                                    <Route path="/users" component={UserList}/>
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </HashRouter>
        );
    }
}


ReactDOM.render(
    <PhotoShare/>,
    document.getElementById('photoshareapp'),
);
