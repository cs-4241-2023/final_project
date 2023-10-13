import React, { useState, useEffect } from 'react';

const GroupGrid = ({ days, times, setGroupAvailabilities, groupAvailabilities }) => {
    const id = localStorage.getItem('selectedGroupPage');

    const [overlap, setOverlap] = useState({});

    useEffect(() => {
        getGroupAvailability().then(data => setGroupAvailabilities(data))
    }, [])

    useEffect(() => {
        // Calculate overlap and set overlap state
        const tempOverlap = {}
        for (const userAvail in groupAvailabilities) {
            for (const day in groupAvailabilities[userAvail]) {
                for (const time in groupAvailabilities[userAvail][day]) {
                    if (groupAvailabilities[userAvail][day][time]) {
                        //day doesn't exist
                        if (!tempOverlap[day]) {
                            tempOverlap[day] = {}
                        }
                        if (!tempOverlap[day][time]) {
                            tempOverlap[day][time] = 1
                        } else {
                            tempOverlap[day][time] += 1
                        }
                    } else {
                        // If any user is not available, remove the time slot from tempOverlap
                        if (tempOverlap[day] && tempOverlap[day][time] > 0) {
                            tempOverlap[day][time] -= 1;
                            if (tempOverlap[day][time] === 0) {
                                delete tempOverlap[day][time];
                            }
                        }
                    }
                }
            }
        }
        console.log('temp overlap', tempOverlap)
        setOverlap(tempOverlap)
    }, [groupAvailabilities])

    async function getGroupAvailability() {
        try {
            const response = await fetch(`/groups/${id}/userAvailabilities`, {
                method: "GET",
            });
            if (!response.ok) console.log("404: Availability Not Found");
            const data = await response.json();
            console.log('availabilities: ', data)
            return data;
        } catch (e) {
            console.error(e)
        }
    }

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
                                className={`availability-cell ${overlap[day]?.[hour] ? 'available' : 'unavailable'}`}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default GroupGrid;
