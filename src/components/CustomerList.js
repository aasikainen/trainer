import React, { useState, useEffect } from 'react';

//ag-grid
import { AgGridReact } from 'ag-grid-react';


function CustomerList() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers(); //fetching all customers
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content)) //data
    .catch(err => console.error(err))
  }
  //console.log(customers);

  const columns = [
    { field: 'firstname', sortable: true, filter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 120 },
    { field: 'city', sortable: true, filter: true, width: 150},
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true, width: 150 }
  ]

  return (
      <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={5}
        suppressCellSelection={true}
      />
      </div> 
  );
}

export default CustomerList;