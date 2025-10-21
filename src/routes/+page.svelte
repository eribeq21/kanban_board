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
	import { LANES } from '$lib/utils/laneConstants.js';
	import {
		checkScrollPosition,
		createScrollHandler,
		smoothScrollDown
	} from '$lib/utils/scrollUtils.js';

	// State
	let issues = $state([]);
	let showDialog = $state(false);
	let showEditDialog = $state(false);
	let editingIssue = $state(null);
	let countryData = $state({ country: 'Loading...', flag: null });
	let showScrollIndicator = $state(true);
	let boardContainer = $state(null);

	// Helper function to get issues for a specific lane
	function getLaneIssues(status) {
		return issues.filter((issue) => issue.status === status);
	}

	// API calls
	async function init() {
		issues = loadIssues();

		try {
			const data = await getCountry();
			countryData = data;
			console.log('Location detected:', data.country);
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
		issues = issues.map((i) => (i.id === updatedIssue.id ? updatedIssue : i));
		showEditDialog = false;
		editingIssue = null;
	}

	// Scroll handling
	const handleScroll = createScrollHandler(({ showIndicator }) => {
		showScrollIndicator = showIndicator;
	});

	// Check if there's content to scroll
	$effect(() => {
		if (boardContainer) {
			const { showIndicator } = checkScrollPosition(boardContainer);
			showScrollIndicator = showIndicator;
		}
	});

	// Smooth scroll down when indicator is clicked
	function scrollDown() {
		smoothScrollDown(boardContainer);
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
	class="flex h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-200 font-sans text-gray-800"
>
	<!-- Header -->
	<Header {countryData} onCreateOpen={() => (showDialog = true)} onExportCSV={handleExportCSV} />

	<!-- Board Area -->
	<div
		bind:this={boardContainer}
		onscroll={handleScroll}
		class="relative flex-1 overflow-auto border-t border-b border-gray-300 bg-white/80 shadow-inner backdrop-blur-sm"
	>
		<div class="flex min-h-full">
			{#each LANES as lane}
				<Lane
					name={lane.name}
					color={lane.color}
					issues={getLaneIssues(lane.name)}
					{updateStatus}
					{deleteIssue}
					{editIssue}
				/>
			{/each}
		</div>
	</div>

	<!-- Scroll Indicator - Vintage Style (Fixed to viewport bottom, OUTSIDE scroll container) -->
	{#if showScrollIndicator}
		<button
			onclick={scrollDown}
			class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 cursor-pointer transition-transform hover:scale-110"
		>
			<div
				class="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-700"
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
