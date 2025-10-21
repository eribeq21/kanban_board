<script>
	// components
	import IssueCard from '$lib/components/issues/IssueCard.svelte';
	import LaneHeader from './LaneHeader.svelte';
	import LaneStats from './LaneStats.svelte';
	// utils
	import { isOverdue } from '$lib/utils/dateUtils.js';

	let { name, color, issues, updateStatus, deleteIssue, editIssue } = $props();

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
	class={`lane-container relative min-h-full flex-1 border-r border-gray-400/50 bg-[radial-gradient(circle_at_1px_1px,_#d1d5db_1px,_transparent_0)]
		[background-size:20px_20px] 
		p-4 
		${color} ${isOver ? 'border-2 border-dashed border-blue-500' : ''}`}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
>
	<LaneHeader {name} />

	<LaneStats {count} {totalPoints} {avgPoints} {overdueCount} />

	<!-- Cards container with flex wrap for multiple columns -->
	<div class="flex flex-wrap items-start justify-start gap-3">
		{#each issues as issue (issue.id)}
			<IssueCard {issue} {deleteIssue} {editIssue} />
		{/each}
	</div>
</div>

<style>
	.lane-container {
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
		border-left: 2px solid rgba(0, 0, 0, 0.05);
	}
</style>
