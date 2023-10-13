import { get, set } from 'mongoose';
import React, { useEffect, useState } from 'react';

const SoloGrid = ({ username, days, times, currentGroupID }) => {
    const id = localStorage.getItem("id");

    const [availability, setAvailability] = useState({});
    const [isSelecting, setSelecting] = useState(false); // Track whether selecting
    let selectedCells = []; // Track selected cells

    useEffect(() => {
        getInitialAvailability().then(data => {
            setAvailability(data)
        });
    }, [])

    async function getInitialAvailability() {
        try {
            const response = await fetch(`/users/${id}/availability`, {
                method: "GET",
            });
            if (!response.ok) console.error("404: Availability Not Found");
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e)
        }
    }

    async function updateUserAvailability() {
        try {
            const response = await fetch(`/users/${id}/availability`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newAvailability: availability })
            });
            if (!response.ok) console.log("Update Failed")
        } catch (e) {
            console.error(e)
        }
    }

    const handleSlotClick = (day, hour) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day][hour] = !updatedAvailability[day][hour];
        setAvailability(updatedAvailability);
    }

    function handleMouseDown() {
        setSelecting(true)
        selectedCells = []; // Reset selected cells when starting a new selection
    }

    function handleMouseUp() {
        setSelecting(false)
        updateUserAvailability()
    }

    function handleMouseOver(event) {
        if (!isSelecting) return; // Only update when selecting

        const cell = event.target;
        console.log("cell", cell)
        const [day, hour] = event.target.id.split('-');

        // Toggle availability
        selectedCells.push({ day, hour }); // Add the cell to selected cells
        console.log("selectedCells", selectedCells)

        updateAvailability(selectedCells);
    }

    function updateAvailability(selectedCells) {
        const updatedAvailability = { ...availability };
        console.log('updated', updatedAvailability)
        // Toggle availability for selected cells
        selectedCells.forEach(({ day, hour }) => {
            updatedAvailability[day][hour] = !updatedAvailability[day][hour];
        });

        setAvailability(updatedAvailability);
    }

    return (
        <div className="timegrid">
            <h3>Your Availability</h3>
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
                                onClick={() => handleSlotClick(day, hour)}
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
