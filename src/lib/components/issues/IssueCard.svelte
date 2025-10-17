<script>
	import { Trash2, Calendar, Share2, AlertTriangle, Edit } from 'lucide-svelte';
	import { exportICS, shareIssue } from '$lib/utils/exportUtils.js';
	import { isOverdue, formatDate } from '$lib/utils/dateUtils.js';
	import { formatDistanceToNow } from 'date-fns';

	let { issue, deleteIssue, editIssue } = $props();
	let overdue = $derived(isOverdue(issue.dueDate));
	
	// Only show overdue banner if the issue is not done
	let showOverdueBanner = $derived(overdue && issue.status !== 'Done' && issue.status !== 'Archive');

	// Format relative time for creation date
	let createdAgo = $derived(
		issue.creationDate 
			? formatDistanceToNow(new Date(issue.creationDate), { addSuffix: true })
			: 'Unknown'
	);

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
	class={`group relative mb-4 w-40 cursor-move select-none rounded-md p-3 text-gray-800 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_6px_12px_rgba(0,0,0,0.25)] ${randomColor} ${showOverdueBanner ? 'ring-2 ring-red-400' : ''}`}
	style="transform: rotate({randomRotation}deg);"
>
	<!-- Paper gradient to simulate texture -->
	<div class="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-white/40 via-transparent to-white/20"></div>

	<!-- Realistic bent corner with gradient shadow -->
	<div
		class="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-tr-md bg-gradient-to-tl from-gray-400/50 via-gray-300/20 to-transparent shadow-inner transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
		style="clip-path: polygon(100% 0, 0% 100%, 100% 100%);"
	></div>

	<!-- Diagonal OVERDUE banner -->
	{#if showOverdueBanner}
		<div 
			class="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
			style="transform: rotate(-15deg);"
		>
			<div 
				class="flex items-center gap-1.5 px-4 py-1 font-bold text-white text-xs uppercase tracking-wide"
				style="
					background: linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);
					border-top: 2px solid rgba(255, 255, 255, 0.3);
					border-bottom: 2px solid rgba(0, 0, 0, 0.3);
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
					text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
				"
			>
				<AlertTriangle size={14} />
				<span>Overdue</span>
				<AlertTriangle size={14} />
			</div>
		</div>
	{/if}

	<!-- Vintage style action buttons -->
	<div class="absolute top-2 right-2 flex gap-1">
		<button
			class="px-1.5 py-1 text-orange-700 transition-all hover:scale-105 cursor-pointer"
			style="
				background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
				border: 1px solid rgba(249, 115, 22, 0.3);
				border-radius: 2px;
				box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
				transform: rotate(2deg);
			"
			onclick={() => editIssue(issue)}
			title="Edit"
		>
			<Edit size={12} />
			
		</button>
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

	<!-- Note Content - moved below buttons -->
	<div class="mt-8">
		<h3 class="mb-1.5 text-sm font-semibold">
			{issue.title}
		</h3>

		<p class="mb-2 text-xs leading-snug">{issue.description}</p>

		<div class="space-y-0.5 text-xs">
			<p><strong>Created:</strong> {issue.creationDate ? formatDate(issue.creationDate) : 'N/A'} <span class="text-gray-600 italic">({createdAgo})</span></p>
			<p><strong>Due:</strong> {formatDate(issue.dueDate)}</p>
			<p><strong>Points:</strong> {issue.storyPoints}</p>
			<p><strong>Priority:</strong> {issue.priority}</p>
			<p><strong>Status:</strong> {issue.status}</p>
		</div>
	</div>
</div>
