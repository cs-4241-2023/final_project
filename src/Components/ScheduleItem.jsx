function ScheduleItem(props) {
  return (
    <li>
        <h2>{props.subject}</h2>
        <h2>{props.time}</h2>
    </li>
  );
}
export default ScheduleItem;