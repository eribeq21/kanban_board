<script>
	import IssueCard from '$lib/components/issues/IssueCard.svelte';
	import { isOverdue } from '$lib/utils/dateUtils.js';

	let { name, color, issues, updateStatus, deleteIssue } = $props();

	let isOver = $state(false); // For dropzone highlighting

	// Derived stats for the lane
	let count = $derived(issues.length);
	let totalPoints = $derived(
		issues.reduce((sum, issue) => sum + Number(issue.storyPoints || 0), 0)
	);
	let avgPoints = $derived(count > 0 ? (totalPoints / count).toFixed(1) : 0);
	let overdueCount = $derived(issues.filter((issue) => isOverdue(issue.dueDate)).length);

	// Drag and drop event handlers
	function handleDragOver(e) {
		e.preventDefault();
		isOver = true;
	}

	function handleDragLeave() {
		isOver = false;
	}

	function handleDrop(e) {
		e.preventDefault();
		isOver = false;
		const id = e.dataTransfer.getData('text/plain');
		updateStatus(id, name);
	}
</script>

<div
	role="region"
	class="flex-1 border-r border-gray-300 p-4 {color} {isOver
		? 'border-2 border-dashed border-blue-500'
		: ''}"
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
>
	<h2 class="mb-4 text-lg font-bold">{name}</h2>

	<div class="mb-4 flex flex-col rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
		<p class="text-gray-700">Issues: {count}</p>
		<p class="text-gray-700">Total Points: {totalPoints}</p>
		<p class="text-gray-700">Avg Points: {avgPoints}</p>
		<p class="text-gray-700">Overdue: {overdueCount}</p>
	</div>

	{#each issues as issue (issue.id)}
		<IssueCard {issue} {deleteIssue} />
	{/each}
</div>