<script>
	let { issue } = $props();
</script>

<div
    role="article"
	class="mb-4 rounded bg-white p-4 shadow cursor-move"
	draggable="true"
	ondragstart={(e) => {
		e.dataTransfer.setData('text/plain', issue.id);
	}}
>	<h3 class="font-bold">{issue.title}</h3>
	<p>{issue.description}</p>
	<p>Due: {issue.dueDate.toLocaleDateString()}</p>
	<p>Points: {issue.storyPoints}</p>
	<p>Priority: {issue.priority}</p>
</div>
