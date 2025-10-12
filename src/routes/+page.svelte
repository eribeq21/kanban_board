<script>
	import { onMount } from 'svelte';

	// components
	import Lane from '$lib/components/lanes/Lane.svelte';
	import CreateIssueDialog from '$lib/components/issues/CreateIssueDialog.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	// utils
	import { loadIssues, saveIssues } from '$lib/utils/storage.js';
	import { getCountry } from '$lib/utils/geoUtils.js';

	let issues = $state([]);
	let showDialog = $state(false);

	let countryData = $state({ country: 'Loading...', flag: null });

	onMount(async () => {
		issues = loadIssues();

		// Fetch country data
		try {
			countryData = await getCountry();
		} catch (error) {
			console.error('Failed to get country:', error);
			countryData = { country: 'Unknown', flag: null };
		}
	});

	// Save issues to localStorage whenever they change
	$effect(() => {
		saveIssues(issues);
	});

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

	// Callback for deleting an issue
	function deleteIssue(id) {
		issues = issues.filter((i) => i.id !== id); // Reactive update
	}
</script>

<main class="flex h-screen flex-col">
	<Header {countryData} onCreateOpen={() => (showDialog = true)} />

	<div class="flex flex-1 overflow-auto">
		<Lane name="Do" color="bg-blue-50" issues={doIssues} {updateStatus} {deleteIssue} />
		<Lane name="Doing" color="bg-yellow-50" issues={doingIssues} {updateStatus} {deleteIssue} />
		<Lane name="Done" color="bg-green-50" issues={doneIssues} {updateStatus} {deleteIssue} />
		<Lane name="Archive" color="bg-gray-50" issues={archiveIssues} {updateStatus} {deleteIssue} />
	</div>

	{#if showDialog}
		<CreateIssueDialog onCreate={addIssue} onClose={() => (showDialog = false)} />
	{/if}
</main>
