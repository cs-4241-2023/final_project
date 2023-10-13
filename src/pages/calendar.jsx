import React from "react";
import { useState ,useEffect} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";  
import { v4 as uuidv4 } from 'uuid';

const DnDCalendar = withDragAndDrop(Calendar);  
const localizer = momentLocalizer(moment)

export default function App({ currentUser }){ 
  useEffect(() => {
    async function fetchEvents() {
        if (currentUser) {
            try {
                const response = await fetch(`/docs/${currentUser}`);
                const data = await response.json();
                setEventsList(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
    }

    fetchEvents();
}, [currentUser]);
  const [formData, setFormData] = useState({
      title: "",
      start: new Date().toISOString().substr(0,16),
      end: new Date().toISOString().substr(0,16), 
      id: '',
  });
  

const handleSelect = async ({ start, end }) => {  
    const title = window.prompt('New Event name');
    if (title) {
        const newEvent = { title, start, end };
        
        
        setEventsList(prev => [...prev, newEvent]);

        
        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            const data = await response.json();
            console.log('Successfully created new event:', data);
        } catch (error) {
            console.error('Error creating new event:', error);
        }
    }
};


const moveEvent = async ({ event, start, end }) => {
    const idx = eventsList.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...eventsList];
    nextEvents.splice(idx, 1, updatedEvent);
    setEventsList(nextEvents);

    
    try {
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        });
        const data = await response.json();
        console.log('Successfully updated moved event:', data);
    } catch (error) {
        console.error('Error updating moved event:', error);
    }
};
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  
  const [eventsList, setEventsList] = useState([])

  const [mod, setMod] = useState(false);

  const handleChange = (event) => { //updates user input as they type
    const { name, value } = event.target;
    let changedVal = value;
    if (name === 'start' || name === 'end') {
        changedVal = moment(value).toDate();
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: changedVal }));
};

  let { title, start, end, id, index} = formData;
  
 
  async function addEvent() { //adds event to frontend and database
    const newEvent = { title, start, end };
    newEvent.id = crypto.randomUUID()
    console.log(newEvent)
    setEventsList([...eventsList, newEvent]);
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        });
        const data = await response.json();
        console.log('Success:', data);
        setEventsList([...eventsList, newEvent]);
    } catch (error) {
        console.error('Error:', error);
    }
    
}
  
  function changeHandle() {
    console.log(formData)
    console.log({title, start, end})
    setEventsList([...eventsList, { title, start, end }]);
    console.log(eventsList);
  }
  
  const handleDelete = (delInfo) => {
    const newData = eventsList.filter((info) => info.id !== delInfo.id);
    const id = delInfo.id
    console.log("your id is " + id)
    setEventsList(newData);
    console.log('deleting....')

    // Send the delID to the server to delete the item
    fetch("/remove", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delInfo)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        

      })
      .catch((error) => {
        console.log('not removing')
        console.error('Error:', error);
      });
  };
  
  
  const handleMod = (index) => {
    let { title, start, end } = eventsList[index];
    setFormData({ title, start, end, index });
    setMod(true);
  };

  async function updateEvent() { //updated update event
    setMod(false);
    let modArr = [...eventsList];
    modArr[index] = { title, start, end, id: eventsList[index].id };  //id for server referrence
    setEventsList(modArr);
    try {
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modArr[index]),
        });
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
  
   return (
    <>
     <div className="container mt-5">
      <DnDCalendar 
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect} 
        onEventDrop={moveEvent}  
        onEventResize={moveEvent}  
        resizable  
      />
       
      <form onSubmit={handleSubmit} className="mt-5">
        <h1>Add an event </h1>
        <div className="form-group">
          <label for="title">Event: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="start">Start: </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label for="end">End:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={moment(formData.end).format('YYYY-MM-DDTHH:mm')} 
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div>
          <button onClick={!mod ? addEvent: updateEvent} type="submit" className="btn" style={{ backgroundColor: '#122d42', color: '#edd2cc' }}>Submit</button>
        </div>
      </form>
      
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Event:</th>
            <th>Start Date:</th>
            <th>End Date:</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {eventsList.map((info, ind) => {
            return (
              <tr key={ind}>
                <td>{info.title}</td>    
                <td>{moment(info.start).format('YYYY-MM-DDTHH')}</td>
                <td>{moment(info.end).format('YYYY-MM-DDTHH')}</td>
                <td>
                  <button onClick={() => handleDelete(info)} className="btn btn-danger">Delete</button>
                </td>
                <td>
                  <button onClick={() => handleMod(ind)} className="btn btn-primary">Modify</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </> 
  )
}