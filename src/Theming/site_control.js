const eventTypes = ["colloquium", "event"];

function determineEventType(title) {
  console.log(title);
  let className = "defaultEvent";
  let i = 0;
  for (const evt of eventTypes) {
    i++;
    console.log(evt);
    if (title.toLowerCase().includes(evt)) {
      className = "otherEvent" + i;
    }
  }
  console.log({ style: className });
  return { style: className };
}

export { determineEventType };
