<script>
	import { onMount } from 'svelte';

	// Components
	import Lane from '$lib/components/lanes/Lane.svelte';
	import CreateIssueDialog from '$lib/components/issues/CreateIssueDialog.svelte';
	import EditIssueDialog from '$lib/components/issues/EditIssueDialog.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { ChevronDown } from 'lucide-svelte';

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
	let showEditDialog = $state(false);
	let editingIssue = $state(null);
	let countryData = $state({ country: 'Loading...', flag: null });
	let backgroundUrl = $state('');
	let showScrollIndicator = $state(true);
	let boardContainer = $state(null);

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
			console.log('Location detected:', data.country);
			
			await fetchBackgroundImage(data.country);
		} catch (error) {
			console.error('Geolocation error:', error.message);
			countryData = { country: 'Unknown', city: 'Unknown', flag: null };
		}

		// Register Service Worker for PWA
		if ('serviceWorker' in navigator) {
			try {
				await navigator.serviceWorker.register('/service-worker.js');
				console.log(' PWA Service Worker registered');
			} catch (error) {
				console.error(' Service Worker registration failed:', error);
			}
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

	function editIssue(issue) {
		editingIssue = issue;
		showEditDialog = true;
	}

	function updateIssue(updatedIssue) {
		issues = issues.map((i) => i.id === updatedIssue.id ? updatedIssue : i);
		showEditDialog = false;
		editingIssue = null;
	}

	// Handle scroll to check if we should show the indicator
	function handleScroll(e) {
		const element = e.target;
		const scrollTop = element.scrollTop;
		const scrollHeight = element.scrollHeight;
		const clientHeight = element.clientHeight;
		
		// Hide indicator only when at the bottom (within 20px of the bottom)
		if (scrollTop + clientHeight >= scrollHeight - 20) {
			showScrollIndicator = false;
		} else {
			showScrollIndicator = true;
		}
	}

	// Check if there's content to scroll - show button immediately when content is scrollable
	$effect(() => {
		if (boardContainer) {
			const hasScroll = boardContainer.scrollHeight > boardContainer.clientHeight;
			const isAtBottom = boardContainer.scrollTop + boardContainer.clientHeight >= boardContainer.scrollHeight - 20;
			// Show button if there's scrollable content AND we're not at the bottom
			showScrollIndicator = hasScroll && !isAtBottom;
		}
	});

	// Smooth scroll down when indicator is clicked
	function scrollDown() {
		if (boardContainer) {
			boardContainer.scrollBy({
				top: boardContainer.clientHeight * 0.8,
				behavior: 'smooth'
			});
		}
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
		bind:this={boardContainer}
		onscroll={handleScroll}
		class="flex-1 overflow-auto bg-white/80 backdrop-blur-sm border-t border-b border-gray-300 shadow-inner relative"
	>
		<div class="flex min-h-full">
			<Lane
				name="Do"
				color="bg-blue-50"
				issues={doIssues}
				{updateStatus}
				{deleteIssue}
				{editIssue}
			/>
			<Lane
				name="Doing"
				color="bg-yellow-50"
				issues={doingIssues}
				{updateStatus}
				{deleteIssue}
				{editIssue}
			/>
			<Lane
				name="Done"
				color="bg-green-50"
				issues={doneIssues}
				{updateStatus}
				{deleteIssue}
				{editIssue}
			/>
			<Lane
				name="Archive"
				color="bg-gray-50"
				issues={archiveIssues}
				{updateStatus}
				{deleteIssue}
				{editIssue}
			/>
		</div>
	</div>

	<!-- Scroll Indicator - Vintage Style (Fixed to viewport bottom, OUTSIDE scroll container) -->
	{#if showScrollIndicator}
		<button
			onclick={scrollDown}
			class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer hover:scale-110 transition-transform"
		>
			<div 
				class="px-2 py-1 text-[10px] flex items-center gap-1 text-gray-700"
				style="
					background: linear-gradient(135deg, #f5f5dc 0%, #e8dcc0 100%);
					border: 1px solid rgba(139, 92, 46, 0.3);
					border-radius: 2px;
					box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5);
					transform: rotate(-0.5deg);
				"
			>
				<ChevronDown size={10} />
				<span>Keep scrolling</span>
			</div>
		</button>
	{/if}


	{#if showDialog}
		<CreateIssueDialog onCreate={addIssue} onClose={() => (showDialog = false)} />
	{/if}

	{#if showEditDialog && editingIssue}
		<EditIssueDialog 
			issue={editingIssue} 
			onUpdate={updateIssue} 
			onClose={() => {
				showEditDialog = false;
				editingIssue = null;
			}} 
		/>
	{/if}
</main>
