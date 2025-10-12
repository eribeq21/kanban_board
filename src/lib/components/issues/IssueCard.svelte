<script>
    import { Trash2, Calendar, Share2} from 'lucide-svelte';
    import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
    
	let { issue, deleteIssue } = $props();
</script>

<div
    role="article"
	class="mb-4 rounded bg-white p-4 shadow cursor-move relative group"
	draggable="true"
	ondragstart={(e) => {
		e.dataTransfer.setData('text/plain', issue.id);
	}}
>	<h3 class="font-bold">{issue.title}</h3>
	<p>{issue.description}</p>
	<p>Due: {issue.dueDate.toLocaleDateString()}</p>
	<p>Points: {issue.storyPoints}</p>
	<p>Priority: {issue.priority}</p>
    <p>Status: {issue.status}</p>

    <button
        class="absolute top-2 right-8 text-red-600 hover:text-red-800 transition-colors"
        onclick={() => deleteIssue(issue.id)}
    >
        <Trash2 size={16} />
    </button>

    <button
        class="absolute top-2 right-2 text-blue-600 hover:text-blue-800 transition-colors"
        onclick={() => exportICS(issue)}
    >
        <Calendar size={16} />
    </button>

    <button
		class="absolute top-2 right-14 text-green-600 "
		onclick={() => shareIssue(issue)}
	>
		<Share2 size={16} />
	</button>
</div>
