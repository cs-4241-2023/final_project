import React, { useState } from 'react';

// SoloGrid Component
const SoloGrid = ({ user, days }) => {
    // Dummy data for availability (initialize with false for all slots)
    const initialAvailability = days.reduce((acc, day) => {
        acc[day] = {};
        timeSlots.forEach((timeSlot) => {
            acc[day][timeSlot] = false;
        });
        return acc;
    }, {});

    const [availability, setAvailability] = useState(initialAvailability);

    const handleSlotClick = (day, timeSlot) => {
        // Clone the current availability state
        const updatedAvailability = { ...availability };

        // Toggle availability for a specific day and time slot
        updatedAvailability[day][timeSlot] = !updatedAvailability[day][timeSlot];

        // Update the state
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

// Sample days of the week

// Sample time slots
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

export default SoloGrid;
