<script>
	import { onMount } from 'svelte';

	// Components
	import Lane from '$lib/components/lanes/Lane.svelte';
	import CreateIssueDialog from '$lib/components/issues/CreateIssueDialog.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	// Utils
	import { loadIssues, saveIssues } from '$lib/utils/storage.js';
	import { getCountry } from '$lib/utils/geoUtils.js';
  import { showDoneNotification } from '$lib/utils/notifications.js';
  import { exportCSV } from '$lib/utils/exportUtils.js';

	// Constants
	const UNSPLASH_KEY = 'VembbgeQ3PYT_PjTuMDWhUMIOXB2JWaj2D4IchDJZGM';
	const DEFAULT_BACKGROUND = 'https://via.placeholder.com/1920x1080?text=Default+Background';
	
	const LANES = [
		{ name: 'Do', color: 'bg-blue-200/30' },
		{ name: 'Doing', color: 'bg-yellow-200/30' },
		{ name: 'Done', color: 'bg-green-200/30' },
		{ name: 'Archive', color: 'bg-gray-200/30' }
	];

	// State
	let issues = $state([]);
	let showDialog = $state(false);
	let countryData = $state({ country: 'Loading...', flag: null });
	let backgroundUrl = $state('');

	// Derived filtered issues for each lane
	let doIssues = $derived(issues.filter((issue) => issue.status === 'Do'));
	let doingIssues = $derived(issues.filter((issue) => issue.status === 'Doing'));
	let doneIssues = $derived(issues.filter((issue) => issue.status === 'Done'));
	let archiveIssues = $derived(issues.filter((issue) => issue.status === 'Archive'));

	// API calls
	async function fetchBackgroundImage(country) {
		const query = `${country} landscape`;

		try {
			const response = await fetch(
				`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=30`,
				{ headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
			);
			const data = await response.json();

			if (data.results.length > 0) {
				const randomIndex = Math.floor(Math.random() * data.results.length);
				backgroundUrl = data.results[randomIndex].urls.full;
			} else {
				backgroundUrl = DEFAULT_BACKGROUND;
			}
		} catch (error) {
			console.error('Unsplash error:', error);
			backgroundUrl = DEFAULT_BACKGROUND;
		}
	}

	async function init() {
		issues = loadIssues();

		try {
			const data = await getCountry();
			countryData = data;
			await fetchBackgroundImage(data.country);
		} catch (error) {
			console.error('Geolocation error:', error.message);
			countryData = { country: 'Unknown', city: 'Unknown', flag: null };
		}
	}

	// Issue management
	function addIssue(newIssue) {
		issues.push({ ...newIssue, status: 'Do', creationDate: new Date() });
		showDialog = false;
	}

	function updateStatus(id, newStatus) {
    const issue = issues.find((i) => i.id === id);
    if (issue) {
      issue.status = newStatus;
      if (newStatus === 'Done') {
        showDoneNotification(issue); // Call notification
      }
    }
  }
	function deleteIssue(id) {
		issues = issues.filter((i) => i.id !== id);
	}

	// Lifecycle
	onMount(init);

	// Save issues to localStorage whenever they change
	$effect(() => {
		saveIssues(issues);
	});

  // Callback for CSV export
  function handleExportCSV() {
    exportCSV(issues);
  }

</script>


<main
	class="flex h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-sans"
>
	<!-- Header -->
	<Header {countryData} onCreateOpen={() => (showDialog = true)}  onExportCSV={handleExportCSV} />

	<!-- Board Area -->
	<div
		class="flex flex-1 overflow-auto bg-white/80 backdrop-blur-sm border-t border-b border-gray-300 shadow-inner"
	>
		<Lane
			name="Do"
			color="bg-blue-50"
			issues={doIssues}
			{updateStatus}
			{deleteIssue}
		/>
		<Lane
			name="Doing"
			color="bg-yellow-50"
			issues={doingIssues}
			{updateStatus}
			{deleteIssue}
		/>
		<Lane
			name="Done"
			color="bg-green-50"
			issues={doneIssues}
			{updateStatus}
			{deleteIssue}
		/>
		<Lane
			name="Archive"
			color="bg-gray-50"
			issues={archiveIssues}
			{updateStatus}
			{deleteIssue}
		/>
	</div>


	{#if showDialog}
		<CreateIssueDialog onCreate={addIssue} onClose={() => (showDialog = false)} />
	{/if}
</main>
