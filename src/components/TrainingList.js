import React, { useState, useEffect } from 'react';

//ag-grid
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Snackbar from '@material-ui/core/Snackbar';

function TrainingsList() {

  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const openSnackbar = () => { //snackbar alerts to user
    setOpen(true); 
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchTrainings(); //fetching all Trainings
  }, []);

  const deleteTraining = (url) => {  //does not work 
    //training by calling trainings/{id]}
    //console.log(url);
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/'+url, { method: 'DELETE'})
      .then(response => { 
        if (response.ok) { //if ok
          setMsg('Trainig is deleted');
          openSnackbar();
          fetchTrainings();
        }
        else {
          setMsg('Something went wront and training is not deleted!');
          openSnackbar();
        }
      })
      .catch(err => console.error(err))
    }
  }

  const fetchTrainings = () => { //list all trainings and customer information
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data)) //data
    .catch(err => console.error(err))
  }
 
  const columns = [ 
    {
      headerName: 'Actions',
      field: 'id',
      width: 100,
      cellRendererFramework: params => 
      <IconButton color="primary" onClick={() => deleteTraining(params.value)}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    },
    { field: 'activity', sortable: true, filter: true, width: 150 },
    { field: 'date', sortable: true, filter: true, width: 200},
    { field: 'duration', sortable: true, filter: true, width: 120 },
    { headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true, width: 200 },
    { headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true, width: 200 }
  ]
  
  return (
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: '10px' }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
      <Snackbar 
       open={open}
       message={msg}
       autoHideDuration={3000} //3 seconds
       onClose={closeSnackbar}
       />
      </div> 
  );
}

export default TrainingsList;