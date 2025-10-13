<script>
	import { Trash2, Calendar, Share2 } from 'lucide-svelte';
	import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
	import { isOverdue, formatDate } from '$lib/utils/dateUtils.js';

	let { issue, deleteIssue } = $props();
	let overdue = $derived(isOverdue(issue.dueDate));

	// Random pastel colors for sticky notes
	const colors = [
		'bg-yellow-200',
		'bg-pink-200',
		'bg-green-200',
		'bg-blue-200',
		'bg-orange-200',
		'bg-purple-200'
	];

	// Random slight rotation and color per render
	const randomRotation = Math.random() * 2 - 1; // between -1 and 1 degrees
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<div
	role="article"
	draggable="true"
	ondragstart={(e) => e.dataTransfer.setData('text/plain', issue.id)}
	class={`group relative mb-6 w-56 cursor-move select-none rounded-md p-4 text-gray-800 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_6px_12px_rgba(0,0,0,0.25)] ${randomColor} ${overdue ? 'ring-2 ring-red-400' : ''}`}
	style="transform: rotate({randomRotation}deg);"
>
	<!-- Paper gradient to simulate texture -->
	<div class="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-white/40 via-transparent to-white/20"></div>

	<!-- Realistic bent corner with gradient shadow -->
	<div
		class="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-tr-md bg-gradient-to-tl from-gray-400/50 via-gray-300/20 to-transparent shadow-inner transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
		style="clip-path: polygon(100% 0, 0% 100%, 100% 100%);"
	></div>

	<!-- Note Content -->
	<h3 class="mb-2 text-base font-semibold">
		{issue.title}
		{#if overdue}
			<span class="ml-2 text-xs text-red-600">(Overdue)</span>
		{/if}
	</h3>

	<p class="mb-3 text-sm leading-snug">{issue.description}</p>

	<div class="space-y-1 text-xs">
		<p><strong>Due:</strong> {formatDate(issue.dueDate)}</p>
		<p><strong>Points:</strong> {issue.storyPoints}</p>
		<p><strong>Priority:</strong> {issue.priority}</p>
		<p><strong>Status:</strong> {issue.status}</p>
	</div>

	<!-- Buttons (appear on hover) -->
	<div class="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
		<button
			class="rounded-full bg-white/60 p-1 text-green-600 shadow hover:bg-white hover:shadow-md"
			onclick={() => shareIssue(issue)}
		>
			<Share2 size={14} />
		</button>
		<button
			class="rounded-full bg-white/60 p-1 text-blue-600 shadow hover:bg-white hover:shadow-md"
			onclick={() => exportICS(issue)}
		>
			<Calendar size={14} />
		</button>
		<button
			class="rounded-full bg-white/60 p-1 text-red-600 shadow hover:bg-white hover:shadow-md"
			onclick={() => deleteIssue(issue.id)}
		>
			<Trash2 size={14} />
		</button>
	</div>
</div>
