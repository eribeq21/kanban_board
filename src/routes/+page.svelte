<script>
	import Lane from '$lib/components/lanes/Lane.svelte';
	import CreateIssueDialog from '$lib/components/CreateIssueDialog.svelte';

	let issues = $state([]);
	let showDialog = $state(false);

	// Derived filtered issues for each lane
	let doIssues = $derived(issues.filter((issue) => issue.status === 'Do'));
	let doingIssues = $derived(issues.filter((issue) => issue.status === 'Doing'));
	let doneIssues = $derived(issues.filter((issue) => issue.status === 'Done'));
	let archiveIssues = $derived(issues.filter((issue) => issue.status === 'Archive'));

	// Callback for adding new issue
	function addIssue(newIssue) {
		issues.push({ ...newIssue, status: 'Do', creationDate: new Date() });
		showDialog = false;
	}

  // Callback for updating issue status (used in drag-drop)
	function updateStatus(id, newStatus) {
		const issue = issues.find((i) => i.id === id);
		if (issue) {
			issue.status = newStatus;
		}
	}

</script>

<main class="flex h-screen flex-col">
	<header class="bg-gray-800 p-4 text-white">
		<button onclick={() => (showDialog = true)}>Create Issue</button>
	</header>

	<div class="flex flex-1 overflow-auto">
		<Lane name="Do" color="bg-blue-50" issues={doIssues} updateStatus={updateStatus} />
		<Lane name="Doing" color="bg-yellow-50" issues={doingIssues} updateStatus={updateStatus} />
		<Lane name="Done" color="bg-green-50" issues={doneIssues} updateStatus={updateStatus} />
		<Lane name="Archive" color="bg-gray-50" issues={archiveIssues} updateStatus={updateStatus} />
	</div>

	{#if showDialog}
		<CreateIssueDialog onCreate={addIssue} onClose={() => (showDialog = false)} />
	{/if}
</main>
