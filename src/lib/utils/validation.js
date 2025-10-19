export function validateTitle(title) {
	if (!title.trim()) return 'Please enter a title for the issue';
	if (title.trim().length < 3) return 'Title must be at least 3 characters';
	return '';
}

export function validateDescription(description) {
	if (!description.trim()) return 'Please provide a description';
	if (description.trim().length < 10) return 'Description must be at least 10 characters';
	return '';
}

export function validateDueDate(dueDate) {
	return dueDate ? '' : 'Please select a due date';
}
