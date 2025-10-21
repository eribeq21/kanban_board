<script>
	// utils
	import { formatDate } from '$lib/utils/dateUtils.js';
	import { formatDistanceToNow } from 'date-fns';

	let { issue } = $props();
	let createdAgo = $derived(
		issue.creationDate
			? formatDistanceToNow(new Date(issue.creationDate), { addSuffix: true })
			: 'Unknown'
	);
</script>

<div class="mt-8">
	<h3 class="mb-1.5 text-sm font-semibold">
		{issue.title}
	</h3>
	<p class="mb-2 text-xs leading-snug">{issue.description}</p>
	<div class="space-y-0.5 text-xs">
		<p>
			<strong>Created:</strong>
			{issue.creationDate ? formatDate(issue.creationDate) : 'N/A'}
			<span class="text-gray-600 italic">({createdAgo})</span>
		</p>
		<p><strong>Due:</strong> {formatDate(issue.dueDate)}</p>
		<p><strong>Points:</strong> {issue.storyPoints}</p>
		<p><strong>Priority:</strong> {issue.priority}</p>
		<p><strong>Status:</strong> {issue.status}</p>
	</div>
</div>
