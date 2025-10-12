export function exportICS(issue) {
  // Helper to format date as YYYYMMDD for all-day events
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // Generate ICS content
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${issue.id}
DTSTAMP:${formatDate(new Date())}T000000
DTSTART;VALUE=DATE:${formatDate(issue.dueDate)}
SUMMARY:${issue.title}
DESCRIPTION:${issue.description}\\nPriority: ${issue.priority}\\nStory Points: ${issue.storyPoints}
END:VEVENT
END:VCALENDAR
`.trim();

  // Create Blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${issue.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


export async function shareIssue(issue) {
  if (!navigator.share) {
    console.error('Web Share API not supported');
    return;
  }

  try {
    await navigator.share({
      title: issue.title,
      text: `Description: ${issue.description}\nDue: ${issue.dueDate.toLocaleDateString()}\nPoints: ${issue.storyPoints}\nPriority: ${issue.priority}`,
      url: window.location.href
    });
  } catch (error) {
    console.error('Share failed:', error);
  }
}