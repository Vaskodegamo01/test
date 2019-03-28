import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import Gallery from './containers/Gallery/Gallery';
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AddPhoto from './containers/AddPhoto/AddPhoto';
import AuthorPhoto from './containers/AuthorPhoto/AuthorPhoto';


const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Gallery}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/add-photo" component={AddPhoto}/>
            <Route path="/author/:id" component={AuthorPhoto}/>
        </Switch>
    )
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

export default withRouter(connect(mapStateToProps)(Routes));