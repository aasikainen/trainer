import React, { useState, useEffect } from 'react';
//ag-grid reacts
import { AgGridReact } from 'ag-grid-react';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Snackbar from '@material-ui/core/Snackbar';

function CustomerList() {

  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const openSnackbar = () => { //snackbar alerts to user
    setOpen(true); 
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchCustomers(); //fetching all customers
  }, []);

  const deleteCustomer = (url) => {
    console.log(url);
    if (window.confirm('Are you sure?')) {
      fetch(url, { method: 'DELETE'})
      .then(response => { 
        if (response.ok) { //if ok
          setMsg('Customer is deleted');
          openSnackbar();
          fetchCustomers();
        }
        else {
          setMsg('Something went wront and customer is not deleted!');
          openSnackbar();
        }
      })
      .catch(err => console.error(err))
    }
  }

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content)) //data
    .catch(err => console.error(err))
  }
  //console.log(customers);

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {'Content-type' : 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        setMsg('Customer is added');
        openSnackbar(); 
        fetchCustomers(); //update the list and add a new one
      }
      else {
        setMsg('Something went wrong and customer is not added');
        openSnackbar();
      }
    })
    .catch(err => console.error(err))
  }

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
      headers: { 'Content-type' : 'application/json'  }
    })
    .then(response => {
      if (response.ok) {
        setMsg('Customer is edited');
        openSnackbar(); 
        fetchCustomers();
      }
      else {
        setMsg('Something went wrong and customer is not edited');
        openSnackbar();
      }
    })
    .catch(err => console.error(err))
  }

  const addTraining = (newTraining) => {
    console.log(newTraining);
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      body: JSON.stringify(newTraining),
      headers: {'Content-type' : 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        setMsg('Training is inserted');
        openSnackbar(); 
        fetchCustomers(); //update the list
      }
      else {
        setMsg('Something went wrong and training is not inserted');
        openSnackbar();
      }
    })
    .catch(err => console.error(err))
  }

  const columns = [
    { 
      headerName: '',
      field: 'links.0.href', //id
      width: 60,
      cellRendererFramework: params => 
      <AddTraining href={params.value} customer={params.data} addTraining={addTraining} />
    },
    { 
      headerName: '',//Edit customer
      field: 'links.0.href', 
      width: 60,
      cellRendererFramework: params => 
        <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
    },
    {
      headerName: '',//Delete customer
      field: 'links.0.href', 
      width: 60,
      cellRendererFramework: params => 
      <IconButton color="primary" onClick={() => deleteCustomer(params.value)}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    },
    { field: 'firstname', sortable: true, filter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 120 },
    { field: 'city', sortable: true, filter: true, width: 150},
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true, width: 150 }
  ]

  return (
      <div className="ag-theme-material" style={{ height: 700, width: '90%', margin: '10px' }}>
        <AddCustomer addCustomer={addCustomer} />
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
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

export default CustomerList;