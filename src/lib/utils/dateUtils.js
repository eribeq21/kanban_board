import { format, isPast } from 'date-fns';

export function formatDate(date) {
	return format(new Date(date), 'PP'); // e.g., 'Oct 12, 2025'
}

export function isOverdue(date) {
	return date ? isPast(new Date(date)) : false;
}
