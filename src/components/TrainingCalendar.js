/**
 * map:lla kalenterikomponentilla treeniolioita ja asettaa kalenterin dataksi
 * 
 */
import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

/**** Tällaista yritin mutta ei lähtenyt toimimaan 
 * 
import React, { useState } from 'react';
function TrainingCalendar() {
    
    //const [trainings, setTrainings] = useState([id, activity, date, duration, firstname,lastname]);

    /*  useEffect(() => {
        fetchTrainings(); //fetching all Trainings
      }, []);

      const fetchTrainings = () => { //list all trainings and customer information
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data)) //data
        .catch(err => console.error(err))
      }
      
      const localizer = momentLocalizer(moment);
    
      const state = trainings.map(trainings => [
          {
            key: {trainings.id},
            date: {trainings.date}.moment().toDate(),
            duration: {trainings.duration}.moment()
              .add(1, "days")
              .toDate(),
            activity: {trainings.activity},
            name: {trainings.firstname} +' '+ {trainings.lastname}
          }
        ]
        };
      */
     
/** Laitoin tämän mallin näkyviin  */    
function TrainingCalendar() {

    const localizer = momentLocalizer(moment);
    
    const state = {
        events: [
          {
            start: moment().toDate(),
            end: moment()
              .add(1, "days")
              .toDate(),
            title: "Some title"
          }
        ]
    };

    return (
          <div className="App" style={{ height: 700, width: '90%', margin: '10px'}}>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={state.events}
              style={{ height: "100vh" }}
            />
          </div>
        );
}
    
export default TrainingCalendar;