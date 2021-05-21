import TheLayout from './containers/TheLayout'
import {HashRouter, Switch, Route} from "react-router-dom";
import React from 'react'
import '../scss/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const Login = React.lazy(() => import ('../views/pages/login/Login'));

const App = () => {
    return (
        <HashRouter>
            <React.Suspense fallback={loading}>
                <ToastContainer></ToastContainer>
                <Switch>
                    <Route exact path="/login" name="Login Page"
                        render={ props => <Login {...props}/>}/>
                    <Route path="/" name="Inicio"
                        render={
                            props => <TheLayout {...props}/>}/>
                        
                </Switch>
        </React.Suspense>
    </HashRouter>
    )
}

export default App
