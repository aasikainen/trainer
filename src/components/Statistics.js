/**  Chart, Simple Histogram  */

import React from 'react'; 
import EqualizerTwoToneIcon from '@material-ui/icons/EqualizerTwoTone';


function Statistics() {
    return(
    <div className="App" style={{ height: 700, width: '90%', margin: '0px -250px' }}>
       <EqualizerTwoToneIcon color="primary" style={{fontSize: 300 }} />
       <p>Customers trainigs statistics</p>
    </div>
    );
}

export default Statistics;