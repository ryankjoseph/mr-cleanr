import React, {useState} from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Switch, Route } from 'react-router-dom';

function propsDisplay(props){
    console.log(props.setUser('Doug'))
}


// make login form and signup toggle
export default function AuthPage(props) {
    const[authView, setAuthView]=useState('login'); //there will be four views: one for login, one for signup pt1, one for signup pt 2, one for signup review and create
    return (
        <div className="Page">
            <Switch>
            {authView === 'login' ? 
            <div className="login-form">
                <LoginForm setUser={props.setUser} />
                <button className="login-btn"onClick={()=>{setAuthView('signup')}}>Sign Up</button>
            </div>
            :
            <div className="login-form">
                <SignUpForm setUser={props.setUser}/>
                <button onClick={()=>{setAuthView('login')}}>Login</button>
            </div>}
            <button className="login-btn" onClick={()=>{propsDisplay(props)}}>PROPS</button>
                <Route path="/signup">
                    
                </Route>
            </Switch>
        </div>
    )
}