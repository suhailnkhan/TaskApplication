import './App.css';
import React,{useState} from 'react'
import VehicalDetails from './Pages/VehicalDetails'
import StarShipDetails from './Pages/StarShipDetails'
import FlimsDetails from './Pages/FlimsDetails'
import NewProfile from './Pages/NewProfile'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContext from './Context/Context';

function App() {

const [Apidata, setApidata] = useState(null);
  return (
    <AuthContext.Provider value ={{Apidata, setApidata}}>
      <div className="App">
        <Router>
          <Switch>
              <Route path='/' exact>
                   <NewProfile />
               </Route>
              <Route path='/vehicals' exact component={VehicalDetails} />
              <Route path='/flims' exact component={FlimsDetails} />
              <Route path='/starships' exact component={StarShipDetails} />
        </Switch>
       </Router>
        </div>
    </AuthContext.Provider >
  );
}

export default App;
