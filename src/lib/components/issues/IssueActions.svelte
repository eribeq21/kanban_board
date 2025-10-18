<script>
    import { Trash2, Calendar, Share2, Edit } from 'lucide-svelte';
    import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
    import IconButton from '$lib/components/ui/IconButton.svelte';

    let { issue, deleteIssue, editIssue } = $props();
</script>

<div class="absolute top-2 right-2 flex gap-1">
    <IconButton
        icon={Edit}
        size={12}
        color="orange"
        onclick={() => editIssue(issue)}
        title="Edit"
    />
    <IconButton
        icon={Share2}
        size={12}
        color="green"
        onclick={() => shareIssue(issue)}
        title="Share"
    />
    <IconButton
        icon={Calendar}
        size={12}
        color="blue"
        onclick={() => exportICS(issue)}
        title="Export to Calendar"
    />
    <IconButton
        icon={Trash2}
        size={12}
        color="red"
        onclick={() => deleteIssue(issue.id)}
        title="Delete"
    />
</div>