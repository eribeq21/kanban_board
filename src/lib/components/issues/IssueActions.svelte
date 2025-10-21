<script>
	import { Trash2, Calendar, Share2, Edit } from 'lucide-svelte';
	// utils
	import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
	// components
	import Button from '$lib/components/ui/Button.svelte';

	let { issue, deleteIssue, editIssue } = $props();
</script>

<div class="absolute top-2 right-2 flex gap-1">
	<Button
		variant="icon-action"
		icon={Edit}
		size={12}
		color="orange"
		onclick={() => editIssue(issue)}
		title="Edit"
	/>
	<Button
		variant="icon-action"
		icon={Share2}
		size={12}
		color="green"
		onclick={() => shareIssue(issue)}
		title="Share"
	/>
	<Button
		variant="icon-action"
		icon={Calendar}
		size={12}
		color="blue"
		onclick={() => exportICS(issue)}
		title="Export to Calendar"
	/>
	<Button
		variant="icon-action"
		icon={Trash2}
		size={12}
		color="red"
		onclick={() => deleteIssue(issue.id)}
		title="Delete"
	/>
</div>
