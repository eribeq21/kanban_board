export async function showDoneNotification(issue) {
  if (Notification.permission === "granted") {
    new Notification("Task Completed", {
      body: `The task "${issue.title}" is now done!`
    });
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Task Completed", {
        body: `The task "${issue.title}" is now done!`
      });
    }
  }
}