import React from 'react';

const GroupGrid = ({ days, times }) => {
    
    const availability = days.reduce((availability, day) => {
        availability[day] = {};
        
        times.forEach((time) => {
            availability[day][time] = false; // Initialize to false for each day and time slot
        });
        
        return availability;
    }, {});
    
    // const id = groupId;
    // async function getGroupAvailability() {
    //     try {
    //         const response = await fetch(`/groups/${id}/availability`, {
    //             method: "GET",
    //         });
    //         if (!response.ok) console.log("404: Availability Not Found");
    //         const data = await response.json();
    //         return data;
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    return (
        <div className="group-grid timegrid">
            <h3>Group Availability</h3>
            <div className="grid">
                <div className="empty-cell"></div>
                {days.map((day) => (
                    <div key={day} className="day-label">
                        {day}
                    </div>
                ))}
                {times.map((hour) => (
                    <React.Fragment key={hour}>
                        <div className="time-slot-label">{hour}</div>
                        {days.map((day) => (
                            <div
                                key={`${day}-${hour}`}
                                id={`${day}-${hour}`}
                                className={`availability-cell ${availability[day]?.[hour] ? 'available' : 'unavailable'}`}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default GroupGrid;
