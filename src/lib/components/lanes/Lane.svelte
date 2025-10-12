<script>
	import IssueCard from '$lib/components/IssueCard.svelte';

	let { name, color, issues, updateStatus , deleteIssue } = $props();

    let isOver = $state(false); // For dropzone highlighting
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

	{#each issues as issue (issue.id)}
		<IssueCard {issue} deleteIssue={deleteIssue} />
	{/each}
</div>
