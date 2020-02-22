import React from 'react';
import Layout from "./components /Layout/Layout";
import {Route, Switch} from "react-router";
import Posts from "./containers /Posts/Posts";
import AddNewPost from "./containers /AddNewPost/AddNewPost";
import OnePost from "./containers /OnePost/OnePost";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Posts}/>
                <Route path='/add' exact component={AddNewPost}/>
                <Route path='/news/:id' exact component={OnePost}/>
            </Switch>
        </Layout>
    );
};

export default App;