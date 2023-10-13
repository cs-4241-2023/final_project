import { get, set } from 'mongoose';
import React, { useEffect, useState } from 'react';

const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

const SoloGrid = ({ username, days, currentGroupID }) => {
    const id = localStorage.getItem("id");

    const [availability, setAvailability] = useState({});
    const [isSelecting, setSelecting] = useState(false); // Track whether selecting
    let selectedCells = []; // Track selected cells

    useEffect(() => {
        // console.log("currentGroupID", currentGroupID)
        // fetch("/send-availability", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ user: username, groupID: currentGroupID, availability: availability })
        // }).then(() => console.log("Sent availability to server"));
        getInitialAvailability().then(data => {
            setAvailability(data)
        });
    }, [])

    async function getInitialAvailability() {
        try {
            const response = await fetch(`/users/${id}/availability`, {
                method: "GET",
            });
            if (!response.ok) console.log("404: Availability Not Found");
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e)
        }
    }

    const handleSlotClick = (day, timeSlot) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day][timeSlot] = !updatedAvailability[day][timeSlot];
        setAvailability(updatedAvailability);
    };


    function handleMouseDown() {
        setSelecting(true)
        selectedCells = []; // Reset selected cells when starting a new selection
    }

    function handleMouseUp() {
        setSelecting(false)
    }

    function handleMouseOver(event) {
        if (!isSelecting) return; // Only update when selecting

        const cell = event.target;
        console.log("cell", cell)
        const [day, timeSlot] = event.target.id.split('-');

        // Toggle availability
        selectedCells.push({ day, timeSlot }); // Add the cell to selected cells
        console.log("selectedCells", selectedCells)

        updateAvailability(selectedCells);
    }

    function updateAvailability(selectedCells) {
        const updatedAvailability = { ...availability };

        // Toggle availability for selected cells
        selectedCells.forEach(({ day, timeSlot }) => {
            updatedAvailability[day][timeSlot] = !updatedAvailability[day][timeSlot];
        });

        setAvailability(updatedAvailability);
    }

    return (
        <div className="solo-grid">
            <h3>Your Availability</h3>
            <div className="grid">
                <div className="empty-cell"></div>
                {days.map((day) => (
                    <div key={day} className="day-label">
                        {day}
                    </div>
                ))}
                {timeSlots.map((timeSlot) => (
                    <React.Fragment key={timeSlot}>
                        <div className="time-slot-label">{timeSlot}</div>
                        {days.map((day) => (
                            <div
                                key={`${day}-${timeSlot}`}
                                id={`${day}-${timeSlot}`}
                                className={`availability-cell ${availability[day]?.[timeSlot] ? 'available' : 'unavailable'}`}
                                onClick={() => handleSlotClick(day, timeSlot)}
                                onMouseDown={handleMouseDown} // Start selection on mouse down
                                onMouseUp={handleMouseUp} // End selection on mouse up
                                onMouseOver={handleMouseOver} // Handle cell selection
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SoloGrid;
