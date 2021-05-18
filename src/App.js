import React from 'react';

import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import Statistics from './components/Statistics';

//React Router Sidebar
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
//material-ui
//Toolbas comoponent
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';

//styles
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {

  //Sidebar styles
  const paneStyle = {
    background: '#3f51b5',
    width: '2px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '600px',
  };
  
  return (
    <div className="App">
      <div>
      <AppBar position="static">
      <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
      </Toolbar>
      </AppBar>
      </div>
      <div>
      <Router>
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize={150}
        resizerStyle={paneStyle}
      >
        <div className="menuClass">
        <menu >
          <div><Link to="/"><AccountCircleIcon color="primary" /><font class="linkText">Customers</font></Link></div>
          <div><Link to="/trainings"><DirectionsRunIcon color="primary" /><font class="linkText">Trainings</font></Link></div>
          <div><Link to="/calendar"><EventRoundedIcon color="primary" /><font class="linkText">Calendar</font></Link></div>  
          <div><Link to="/statistics"><EqualizerRoundedIcon color="primary" /><font class="linkText">Statistics</font></Link></div> 
        </menu>
        </div>
        <div>
        <Route exact path="/" component={CustomerList} />
        <Route exact path="/trainings" component={TrainingsList} />
        <Route exact path="/calendar" component = {TrainingCalendar} />
        <Route exact path="/statistics" component = {Statistics} />
      </div>
      </SplitPane>
      </Router>
    </div>
  </div>
  );
}

export default App;
