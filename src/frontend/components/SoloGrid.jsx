import React, { useState } from 'react';

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

// SoloGrid Component
const SoloGrid = ({ user, days }) => {

    const initialAvailability = days.reduce((acc, day) => {
        acc[day] = {};
        timeSlots.forEach((timeSlot) => {
            acc[day][timeSlot] = false;
        });
        return acc;
    }, {});

    const [availability, setAvailability] = useState(initialAvailability);

    const handleSlotClick = (day, timeSlot) => {
        const updatedAvailability = { ...availability };

        updatedAvailability[day][timeSlot] = !updatedAvailability[day][timeSlot];

        setAvailability(updatedAvailability);
    };

    return (
        <div className="solo-grid">
            <h3>{user}'s Availability:</h3>
            <div className="grid">
                <div className="empty-cell"></div>
                {days.map((day) => (
                    <div key={day} className="day-label">
                        {day}
                    </div>
                ))}
                {timeSlots.map((timeSlot) => (
                    <>
                        <div className="time-slot-label">{timeSlot}</div>
                        {days.map((day) => (
                            <div
                                key={`${day}-${timeSlot}`}
                                className={`availability-cell ${availability[day]?.[timeSlot] ? 'available' : 'unavailable'}`}
                                onClick={() => handleSlotClick(day, timeSlot)}
                            />
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
};


export default SoloGrid;
