import ScheduleItem from "./ScheduleItem";

function Schedule(props) {

  // Sort the schedule based on the time
  function sortSchedule() {
    const sortedSchedule = props.ScheduleList.sort((a, b) => {
      const aTime = a.time.split(":");
      const bTime = b.time.split(":");
      const aHour = parseInt(aTime[0]);
      const bHour = parseInt(bTime[0]);
      const aMinute = parseInt(aTime[1]);
      const bMinute = parseInt(bTime[1]);
      if (aHour < bHour) {
        return -1;
      } else if (aHour > bHour) {
        return 1;
      } else {
        if (aMinute < bMinute) {
          return -1;
        } else if (aMinute > bMinute) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return sortedSchedule;
  }

  function convertTime(time) {
    const timeArray = time.split(":");
    const hour = parseInt(timeArray[0]);
    const minute = parseInt(timeArray[1]);
    const amPm = hour >= 12 ? "PM" : "AM";
    const convertedHour = hour % 12 || 12;
    const convertedMinute = String(minute).padStart(2, "0");
    return `${convertedHour}:${convertedMinute} ${amPm}`;
  }

  function showAddForm() {
    document.getElementById("addForm").classList.remove("hidden");
  }

  function submitAddForm(e) {
    e.preventDefault();
    document.getElementById("addForm").classList.add("hidden");
    const subject = document.getElementById("subject").value;
    const time = document.getElementById("time").value;
    props.onAdd({ "subject": subject, "time": time });
  }

  function closeAddForm(e) {
    e.preventDefault();
    document.getElementById("subject").value = "";
    document.getElementById("time").value = "";
    document.getElementById("addForm").classList.add("hidden");
  }

  return (
    <div className="Schedule">
      <div className="ScheduleHeading">
        <h1>Schedule</h1>
        <button onClick={showAddForm}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group">
              <path
                id="Vector"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.166748 10.5C0.166748 4.74687 4.83029 0.0833282 10.5834 0.0833282C16.3365 0.0833282 21.0001 4.74687 21.0001 10.5C21.0001 16.2531 16.3365 20.9167 10.5834 20.9167C4.83029 20.9167 0.166748 16.2531 0.166748 10.5ZM10.5834 2.16666C8.37328 2.16666 6.25366 3.04464 4.69086 4.60744C3.12806 6.17024 2.25008 8.28986 2.25008 10.5C2.25008 12.7101 3.12806 14.8297 4.69086 16.3926C6.25366 17.9554 8.37328 18.8333 10.5834 18.8333C12.7936 18.8333 14.9132 17.9554 16.476 16.3926C18.0388 14.8297 18.9167 12.7101 18.9167 10.5C18.9167 8.28986 18.0388 6.17024 16.476 4.60744C14.9132 3.04464 12.7936 2.16666 10.5834 2.16666Z"
                fill="#111111"
              />
              <path
                id="Vector_2"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6252 5.29167C11.6252 5.0154 11.5154 4.75045 11.3201 4.5551C11.1247 4.35975 10.8598 4.25 10.5835 4.25C10.3072 4.25 10.0423 4.35975 9.84693 4.5551C9.65158 4.75045 9.54183 5.0154 9.54183 5.29167V9.45833H5.37516C5.0989 9.45833 4.83394 9.56808 4.63859 9.76343C4.44324 9.95878 4.3335 10.2237 4.3335 10.5C4.3335 10.7763 4.44324 11.0412 4.63859 11.2366C4.83394 11.4319 5.0989 11.5417 5.37516 11.5417H9.54183V15.7083C9.54183 15.9846 9.65158 16.2496 9.84693 16.4449C10.0423 16.6403 10.3072 16.75 10.5835 16.75C10.8598 16.75 11.1247 16.6403 11.3201 16.4449C11.5154 16.2496 11.6252 15.9846 11.6252 15.7083V11.5417H15.7918C16.0681 11.5417 16.333 11.4319 16.5284 11.2366C16.7238 11.0412 16.8335 10.7763 16.8335 10.5C16.8335 10.2237 16.7238 9.95878 16.5284 9.76343C16.333 9.56808 16.0681 9.45833 15.7918 9.45833H11.6252V5.29167Z"
                fill="#111111"
              />
            </g>
          </svg>
        </button>
      </div>
      <ul>
        <li id="addForm" className="hidden ScheduleForm">
          <form>
            <div id="addFormItems" className="AddFormInputs">
              <div>
                <label for="subject">Event</label>
                <input type="text" id="subject" className="ScheduleInputEvent" />
              </div>
              <div>
                <label for="time">Time</label>
                <input type="time" id="time" placeholder="Time" />
              </div>
            </div>
            <div className="AddFormButtons">
              <button type="submit" onClick={submitAddForm}>Add</button>
              <button onClick={closeAddForm}>Cancel</button>
            </div>
          </form>
        </li>
        {sortSchedule(props.ScheduleList).map((item, index) => (
          <ScheduleItem subject={item.subject} time={convertTime(item.time)}/>
        ))}
      </ul>
    </div>
  );
}
export default Schedule;
