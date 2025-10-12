<script>
	import { Trash2, Calendar, Share2 } from 'lucide-svelte';
	import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
	import { isOverdue, formatDate } from '$lib/utils/dateUtils.js';

	let { issue, deleteIssue } = $props();
	let overdue = $derived(isOverdue(issue.dueDate));
</script>

<div
	role="article"
	class="group relative mb-4 cursor-move rounded bg-white p-4 shadow {overdue
		? 'border-l-4 border-red-500'
		: ''}"
	draggable="true"
	ondragstart={(e) => {
		e.dataTransfer.setData('text/plain', issue.id);
	}}
>
	<h3 class="font-bold">
		{issue.title}
		{#if overdue}<span class="text-sm text-red-600">(Overdue)</span>{/if}
	</h3>
	<p>{issue.description}</p>
	<p>Due: {formatDate(issue.dueDate)}</p>
	<p>Points: {issue.storyPoints}</p>
	<p>Priority: {issue.priority}</p>
	<p>Status: {issue.status}</p>

	<button
		class="absolute top-2 right-8 text-red-600 transition-colors hover:text-red-800"
		onclick={() => deleteIssue(issue.id)}
	>
		<Trash2 size={16} />
	</button>

	<button
		class="absolute top-2 right-2 text-blue-600 transition-colors hover:text-blue-800"
		onclick={() => exportICS(issue)}
	>
		<Calendar size={16} />
	</button>

	<button class="absolute top-2 right-14 text-green-600" onclick={() => shareIssue(issue)}>
		<Share2 size={16} />
	</button>
</div>
