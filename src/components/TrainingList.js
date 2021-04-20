import React, { useState, useEffect } from 'react';

//ag-grid
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';

function TrainingsList() {

  const [trainings, setTrainings] = useState([]);
  
  useEffect(() => {
    fetchTrainings(); //fetching all Trainings
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data)) //data
    .catch(err => console.error(err))
  }
  //console.log(data);

  const columns = [
    { field: 'id', sortable: true, filter: true, width: 80 },
    { field: 'date', type: 'date', format: moment('date', 'MM/DD/YYYY', true).format() },
    { field: 'duration', sortable: true, filter: true, width: 120 },
    { field: 'activity', sortable: true, filter: true, width: 150 },
    { headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true, width: 200 },
    { headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true, width: 200 },
  ]

  return (
      <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={5}
        suppressCellSelection={true}
      />
      </div> 
  );
}

export default TrainingsList;