// Available card colors
export const CARD_COLORS = [
	{ name: 'Yellow', class: 'bg-yellow-200', value: 'bg-yellow-200' },
	{ name: 'Pink', class: 'bg-pink-200', value: 'bg-pink-200' },
	{ name: 'Green', class: 'bg-green-200', value: 'bg-green-200' },
	{ name: 'Blue', class: 'bg-blue-200', value: 'bg-blue-200' },
	{ name: 'Orange', class: 'bg-orange-200', value: 'bg-orange-200' },
	{ name: 'Purple', class: 'bg-purple-200', value: 'bg-purple-200' }
];

//  Available priority levels
export const PRIORITY_LEVELS = ['Low', 'Medium', 'High'];

// Default values for new issues
export const DEFAULT_VALUES = {
	STORY_POINTS: 1,
	PRIORITY: 'Medium',
	CARD_COLOR: 'bg-yellow-200'
};
