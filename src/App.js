import React, { useState, useEffect } from 'react';

//ag-grid
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingList';
//import AppBar1 from './components/AppBar1';
//React Router Sidebar
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
//material-ui
//Toolbas comoponent
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

//styles
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

//Sidebar styles
const paneStyle = {
  background: '#3f51b5',
  width: '2px',
  cursor: 'col-resize',
  margin: '0 5px',
  height: '600px',
};

function App() {
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
        <menu>
          <div><Link to="/">Customres</Link></div>
          <div><Link to="/trainings">Trainings</Link></div> 
        </menu>
        <div>
        <Route exact path="/" component={CustomerList} />
        <Route exact path="/trainings" component={TrainingsList} />
      </div>
      </SplitPane>
      </Router>
    </div>
  </div>
  );
}

export default App;
