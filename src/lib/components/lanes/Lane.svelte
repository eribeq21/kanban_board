<script>
	import IssueCard from '$lib/components/issues/IssueCard.svelte';
    import { isOverdue } from '$lib/utils/dateUtils.js';

	let { name, color, issues, updateStatus , deleteIssue } = $props();

    let isOver = $state(false); // For dropzone highlighting

    // Derived stats for the lane
	let count = $derived(issues.length);
	let totalPoints = $derived(issues.reduce((sum, issue) => sum + Number(issue.storyPoints || 0), 0));
	let avgPoints = $derived(count > 0 ? (totalPoints / count).toFixed(1) : 0);
	let overdueCount = $derived(issues.filter(issue => isOverdue(issue.dueDate)).length);
</script>

<div
	role="region"
	class="flex-1 border-r border-gray-300 p-4 {color} {isOver ? 'border-2 border-dashed border-blue-500 bg-opacity-50' : ''}"
	ondragover={(e) => {
		e.preventDefault();
		isOver = true;
	}}
	ondragleave={() => (isOver = false)}
	ondrop={(e) => {
		e.preventDefault();
		isOver = false;
		const id = e.dataTransfer.getData('text/plain');
		updateStatus(id, name);
	}}
>
	<h2 class="mb-4 text-lg font-bold">{name}</h2>

    <div class="flex flex-col text-sm bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
		<p class="text-gray-700">Issues: {count}</p>
		<p class="text-gray-700">Total Points: {totalPoints}</p>
		<p class="text-gray-700">Avg Points: {avgPoints}</p>
		<p class="text-gray-700">Overdue: {overdueCount}</p>
	</div>

	{#each issues as issue (issue.id)}
		<IssueCard {issue} deleteIssue={deleteIssue} />
	{/each}
</div>
