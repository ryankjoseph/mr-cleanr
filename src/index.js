import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

(async()=>{
  const publishableKey = await process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(publishableKey)
  console.log(publishableKey)
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Elements stripe={stripePromise}>
          <App />
          </Elements>
          </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );

})()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
