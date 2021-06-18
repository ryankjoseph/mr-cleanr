import { Switch, Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import React,{useState} from 'react';
import AuthPage from '../AuthPage/AuthPage';
import AppointmentsPage from '../AppointmentsPage/AppointmentsPage';
import MapPage from '../MapPage/MapPage';
import ServicesPage from '../ServicesPage/ServicesPage';
import { getUser } from '../../utilities/users-service';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import LogOut from '../../components/LogOut/LogOut';

function App() {
  function getRole(){
    if (!user) return null;
    if (user.roles){
      if (user.roles.length === 1){
        return user.roles[0].role
      }
      // else{
      //   // setToggleView(true)
      //   return user.roles[0].role
      // }
    }
    else{
      return null;
    }
  }
  const [user, setUser] = useState(getUser());
  // const [toggleView, setToggleView] = useState(false)
  const [currentRole, setCurrentRole] = useState({role:getRole()})
  // const [currentRole, setCurrentRole] = useState({role:"client"})
  const [agent, setAgent] = useState(null); // USED TO SET THE AGENT ID OF THE SERVICES PAGE CLIENT IS


  return (
    
    <div className="App">
      <header className="App-header shadow">
        <h1>cleanR</h1>
      <nav className = "nav-links">
        <Link className= "nav-links" to="/myAppointments">Appointments</Link>
            |
        {currentRole.role ==="agent" ? <><Link className= "nav-links" to="myServices">Services</Link> |</> : null}
        <Link className= "nav-links" to="/map">Map</Link>
      </nav>
      <div className="nav-user"><LogOut  user={user} setUser={setUser}/></div>
      
      </header>
      {user ? <div>
        <div>{user.displayName}</div>
        </div>:null}
      {user ? 
        (user.roles.length > 1 ? (<div className="toggle-role-container">
          <button value="agent" className="toggle-role" type="button" onClick={(e)=>{setCurrentRole({role: e.target.value})}}>Agent</button>
          <button value="client" className="toggle-role" type="button" onClick={(e)=>{setCurrentRole({ role: e.target.value})}}>Client</button>
        </div>) : null)
        : null
      }
          <div>{currentRole.role}</div>
      { user ? (currentRole.role==="client" 
        ? 
            <Switch>
              <Route path="/myAppointments">
                <AppointmentsPage role={currentRole} user={user} setUser={setUser}/>
              </Route>
              <Route path="/map">
                <MapPage setAgent={setAgent} currentRole={currentRole} user={user} setUser={setUser}/>
              </Route>
              <Route path="/services/:agentId">
                <ServicesPage setAgent={setAgent} currentRole = {currentRole} user={user} setUser={setUser}/>
              </Route>
            </Switch>
          :
              <Switch>
                <Route path="/myAppointments">
                  <AppointmentsPage role={currentRole} user={user} setUser={setUser}/>
                </Route>
                <Route path="/map">
                  <MapPage setAgent={setAgent} currentRole={currentRole} user={user} setUser={setUser}/>
                </Route>
                <Route path="/myServices">
                  <ServicesPage setAgent={setAgent} currentRole = {currentRole} user={user} setUser={setUser}/>
                </Route>
                <Route path="/services/:agentId">
                  <Redirect to="/myServices"/>
                </Route>
              </Switch>) 
      
        :        
        <AuthPage setUser={setUser}/>
      }

      
      <div>

      {/* <PaymentForm /> */}
      </div>
    </div>
  );
}

export default App;