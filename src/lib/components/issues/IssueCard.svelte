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
	class={`group relative mb-4 w-40 cursor-move select-none rounded-md p-3 text-gray-800 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_6px_12px_rgba(0,0,0,0.25)] ${randomColor} ${overdue ? 'ring-2 ring-red-400' : ''}`}
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
	<h3 class="mb-1.5 text-sm font-semibold">
		{issue.title}
		{#if overdue}
			<span class="ml-1 text-xs text-red-600">(Overdue)</span>
		{/if}
	</h3>

	<p class="mb-2 text-xs leading-snug">{issue.description}</p>

	<div class="space-y-0.5 text-xs">
		<p><strong>Due:</strong> {formatDate(issue.dueDate)}</p>
		<p><strong>Points:</strong> {issue.storyPoints}</p>
		<p><strong>Priority:</strong> {issue.priority}</p>
		<p><strong>Status:</strong> {issue.status}</p>
	</div>

	<!-- Vintage style action buttons -->
	<div class="absolute top-2 right-2 flex gap-1">
		<button
			class="px-1.5 py-1 text-green-700 transition-all hover:scale-105 cursor-pointer"
			style="
				background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
				border: 1px solid rgba(34, 197, 94, 0.3);
				border-radius: 2px;
				box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
				transform: rotate(-2deg);
			"
			onclick={() => shareIssue(issue)}
			title="Share"
		>
			<Share2 size={12} />
		</button>
		<button
			class="px-1.5 py-1 text-blue-700 transition-all hover:scale-105 cursor-pointer"
			style="
				background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
				border: 1px solid rgba(59, 130, 246, 0.3);
				border-radius: 2px;
				box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
				transform: rotate(1deg);
			"
			onclick={() => exportICS(issue)}
			title="Export to Calendar"
		>
			<Calendar size={12} />
		</button>
		<button
			class="px-1.5 py-1 text-red-700 transition-all hover:scale-105 cursor-pointer"
			style="
				background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
				border: 1px solid rgba(239, 68, 68, 0.3);
				border-radius: 2px;
				box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
				transform: rotate(-1.5deg);
			"
			onclick={() => deleteIssue(issue.id)}
			title="Delete"
		>
			<Trash2 size={12} />
		</button>
	</div>
</div>
