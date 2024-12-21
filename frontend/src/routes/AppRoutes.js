import { Route, Switch, } from 'react-router-dom';
// import Login from '../components/Login/Login';
// import Register from '../components/Register/Register';
import Home from '../components/ManageHome/Home';
import PostDetail from '../components/ManageHome/PostDetail';
import PrivateRoutes from './PrivateRoutes';


const AppRoutes = (props) => {
    const Projects = () => {
        return (
            <span>Hello projects</span>
        )
    }

    return (
        <>
            <Switch>
                {/* <PrivateRoutes path='/create' component={Projects} /> */}


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