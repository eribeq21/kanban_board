<script>
	import IssueCard from '$lib/components/issues/IssueCard.svelte';
	import { isOverdue } from '$lib/utils/dateUtils.js';
	import { ListTodo, Target, TrendingUp, AlertTriangle, Pin } from 'lucide-svelte';

	let { name, color, issues, updateStatus, deleteIssue } = $props();

	let isOver = $state(false); // For dropzone highlighting

	// Derived stats for the lane
	let count = $derived(issues.length);
	let totalPoints = $derived(
		issues.reduce((sum, issue) => sum + Number(issue.storyPoints || 0), 0)
	);
	let avgPoints = $derived(count > 0 ? (totalPoints / count).toFixed(1) : 0);
	let overdueCount = $derived(issues.filter((issue) => isOverdue(issue.dueDate)).length);

	// Drag and drop event handlers
	function handleDragOver(e) {
		e.preventDefault();
		isOver = true;
	}

	function handleDragLeave() {
		isOver = false;
	}

	function handleDrop(e) {
		e.preventDefault();
		isOver = false;
		const id = e.dataTransfer.getData('text/plain');
		updateStatus(id, name);
	}
</script>
<div
	role="region"
	class={`lane-container flex-1 relative border-r border-gray-400/50 p-4 
		bg-[radial-gradient(circle_at_1px_1px,_#d1d5db_1px,_transparent_0)] 
		[background-size:20px_20px] 
		${color} ${isOver ? 'border-2 border-dashed border-blue-500' : ''}`}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
>
	<!-- Vintage label tag for lane name - centered -->
	<div class="mb-4 flex justify-center">
		<div class="relative inline-block">
			<!-- Pin holding the label -->
			<div 
				class="absolute -top-2 left-1/2 -translate-x-1/2 text-gray-600 z-10"
				style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.3));"
			>
				<Pin size={16} fill="currentColor" />
			</div>
			
			<!-- Label tag -->
			<h2 
				class="px-4 py-1.5 text-sm font-medium text-gray-800 relative"
				style="
					background: linear-gradient(135deg, #f5f5dc 0%, #e8dcc0 100%);
					border: 1px solid rgba(139, 92, 46, 0.3);
					border-radius: 2px;
					box-shadow: 
						2px 3px 5px rgba(0, 0, 0, 0.15),
						inset 0 1px 0 rgba(255, 255, 255, 0.5);
					transform: rotate(-1deg);
				"
			>
				{name}
			</h2>
		</div>
	</div>

	<!-- Old-fashioned hand-stamped style statistics -->
	<div class="mb-4 flex flex-wrap gap-2">
		<!-- Issues count stamp -->
		<div
			class="stat-stamp relative"
			style="
				transform: rotate(-2deg);
				background: linear-gradient(135deg, #f5f5dc 0%, #f0e68c 50%, #f5f5dc 100%);
			"
		>
			<div class="absolute inset-0 opacity-20 rounded"
				style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%221.5%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');">
			</div>
			<div class="relative flex items-center gap-1">
				<ListTodo size={12} class="text-gray-600" />
				<span class="text-xs font-mono font-semibold text-gray-700">{count}</span>
			</div>
		</div>

		<!-- Total points stamp -->
		<div
			class="stat-stamp relative"
			style="
				transform: rotate(1.5deg);
				background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 50%, #ffeaa7 100%);
			"
		>
			<div class="absolute inset-0 opacity-20 rounded"
				style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%221.5%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');">
			</div>
			<div class="relative flex items-center gap-1">
				<Target size={12} class="text-orange-700" />
				<span class="text-xs font-mono font-semibold text-gray-700">{totalPoints}</span>
			</div>
		</div>

		<!-- Average points stamp -->
		<div
			class="stat-stamp relative"
			style="
				transform: rotate(-1deg);
				background: linear-gradient(135deg, #dfe6e9 0%, #b2bec3 50%, #dfe6e9 100%);
			"
		>
			<div class="absolute inset-0 opacity-20 rounded"
				style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%221.5%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');">
			</div>
			<div class="relative flex items-center gap-1">
				<TrendingUp size={12} class="text-gray-600" />
				<span class="text-xs font-mono font-semibold text-gray-700">~{avgPoints}</span>
			</div>
		</div>

		<!-- Overdue stamp (only if there are overdue items) -->
		{#if overdueCount > 0}
			<div
				class="stat-stamp relative border-2 border-red-700"
				style="
					transform: rotate(2deg);
					background: linear-gradient(135deg, #fab1a0 0%, #ff7675 50%, #fab1a0 100%);
				"
			>
				<div class="absolute inset-0 opacity-20 rounded"
					style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%221.5%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');">
				</div>
				<div class="relative flex items-center gap-1">
					<AlertTriangle size={12} class="text-red-900" />
					<span class="text-xs font-mono font-bold text-red-900">{overdueCount}</span>
				</div>
			</div>
		{/if}
	</div>

	{#each issues as issue (issue.id)}
		<IssueCard {issue} {deleteIssue} />
	{/each}
</div>

<style>
	.lane-container {
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
		border-left: 2px solid rgba(0, 0, 0, 0.05);
	}

	.stat-stamp {
		padding: 4px 8px;
		border-radius: 3px;
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -1px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.15);
		transition: transform 0.2s ease;
		cursor: default;
	}

	.stat-stamp:hover {
		transform: rotate(0deg) scale(1.05) !important;
	}
</style>
