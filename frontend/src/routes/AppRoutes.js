import { Route, Switch, } from 'react-router-dom';
// import Login from '../components/Login/Login';
// import Register from '../components/Register/Register';
import Home from '../components/ManageHome/Home';
import PostDetail from '../components/ManageHome/PostDetail';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

const AppRoutes = (props) => {


    return (
        <>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/detail/:id' component={PostDetail} />

                <Route path="*" exact>
                    404 not found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes;