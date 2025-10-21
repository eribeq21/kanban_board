<script>
	// utils
	import { isOverdue } from '$lib/utils/dateUtils.js';
	// components
	import IssueActions from './IssueActions.svelte';
	import IssueContent from './IssueContent.svelte';
	import IssueOverdueBanner from './IssueOverdueBanner.svelte';

	let { issue, deleteIssue, editIssue } = $props();
	let overdue = $derived(isOverdue(issue.dueDate));

	// Only show overdue banner if the issue is not done
	let showOverdueBanner = $derived(
		overdue && issue.status !== 'Done' && issue.status !== 'Archive'
	);

	// Reactive card color that updates when issue changes
	let cardColor = $state(issue.cardColor || 'bg-yellow-200');

	// Update color when issue prop changes
	$effect(() => {
		cardColor = issue.cardColor || 'bg-yellow-200';
	});

	// Random slight rotation per render
	const randomRotation = Math.random() * 2 - 1; // between -1 and 1 degrees
</script>

<div
	role="article"
	draggable="true"
	ondragstart={(e) => e.dataTransfer.setData('text/plain', issue.id)}
	class={`group relative mb-4 w-40 cursor-move rounded-md p-3 text-gray-800 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 select-none hover:-translate-y-1 hover:shadow-[4px_6px_12px_rgba(0,0,0,0.25)] ${cardColor} ${showOverdueBanner ? 'ring-2 ring-red-400' : ''}`}
	style="transform: rotate({randomRotation}deg);"
>
	<!-- Paper gradient to simulate texture -->
	<div
		class="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-white/40 via-transparent to-white/20"
	></div>

	<!-- Realistic bent corner with gradient shadow -->
	<div
		class="pointer-events-none absolute right-0 bottom-0 h-8 w-8 rounded-tr-md bg-gradient-to-tl from-gray-400/50 via-gray-300/20 to-transparent shadow-inner transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
		style="clip-path: polygon(100% 0, 0% 100%, 100% 100%);"
	></div>

	<!-- Diagonal OVERDUE banner -->
	{#if showOverdueBanner}
		<IssueOverdueBanner />
	{/if}

	<!-- Action buttons -->
	<IssueActions {issue} {deleteIssue} {editIssue} />

	<!-- Issue content -->
	<IssueContent {issue} />
</div>
