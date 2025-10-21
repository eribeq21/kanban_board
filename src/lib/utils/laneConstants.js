// Available lanes for the kanban board
export const LANES = [
	{ name: 'Do', color: 'bg-blue-200/30' },
	{ name: 'Doing', color: 'bg-yellow-200/30' },
	{ name: 'Done', color: 'bg-green-200/30' },
	{ name: 'Archive', color: 'bg-gray-200/30' }
];

// Lane status names for easy reference
export const LANE_STATUS = {
	DO: 'Do',
	DOING: 'Doing',
	DONE: 'Done',
	ARCHIVE: 'Archive'
};
