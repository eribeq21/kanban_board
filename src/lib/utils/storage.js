export function saveIssues(issues) {
	if (typeof window !== 'undefined') {
		localStorage.setItem('kanbanIssues', JSON.stringify(issues));
	}
}

export function loadIssues() {
	if (typeof window === 'undefined') return [];

	const stored = localStorage.getItem('kanbanIssues');
	if (!stored) return [];

	return JSON.parse(stored).map((issue) => ({
		...issue,
		creationDate: new Date(issue.creationDate),
		dueDate: new Date(issue.dueDate)
	}));
}
