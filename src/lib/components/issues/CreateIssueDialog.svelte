<script>
	import { StickyNote, Calendar, Zap, AlertCircle, CheckCircle, X } from 'lucide-svelte';
	
	let { onCreate, onClose } = $props();

	// Available colors
	const colors = [
		{ name: 'Yellow', class: 'bg-yellow-200', value: 'bg-yellow-200' },
		{ name: 'Pink', class: 'bg-pink-200', value: 'bg-pink-200' },
		{ name: 'Green', class: 'bg-green-200', value: 'bg-green-200' },
		{ name: 'Blue', class: 'bg-blue-200', value: 'bg-blue-200' },
		{ name: 'Orange', class: 'bg-orange-200', value: 'bg-orange-200' },
		{ name: 'Purple', class: 'bg-purple-200', value: 'bg-purple-200' }
	];

	// Local state for inputs
	let title = $state('');
	let description = $state('');
	let dueDate = $state(new Date().toISOString().split('T')[0]); // Default today
	let storyPoints = $state(1);
	let priority = $state('Medium');
	let cardColor = $state('bg-yellow-200');

	function handleCreate() {
		if (!title) return;
		onCreate({
			id: crypto.randomUUID(), // Unique ID
			title,
			description,
			dueDate: new Date(dueDate),
			storyPoints: Number(storyPoints),
			priority,
			cardColor
		});
		reset();
	}

	function reset() {
		title = '';
		description = '';
		dueDate = new Date().toISOString().split('T')[0];
		storyPoints = 1;
		priority = 'Medium';
		cardColor = 'bg-yellow-200';
	}
</script>

<dialog open class="issue-dialog">
	<div
		class={`relative w-80 rounded-sm p-6 text-gray-800
		transition-all duration-300 
		shadow-[4px_6px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
		border-t border-l ${cardColor}`}
		style="
			transform: rotate(-1.2deg);
		"
	>
		<!-- Paper texture overlay -->
		<div class="absolute inset-0 pointer-events-none opacity-10 rounded-sm"
			style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
		</div>

		<!-- Close button -->
		<button
			onclick={onClose}
			class="absolute -top-2 -right-2 p-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
			aria-label="Close dialog"
		>
			<X size={16} />
		</button>

		<!-- Top folded corner -->
		<div
			class={`pointer-events-none absolute top-0 right-0 h-10 w-10 ${cardColor}`}
			style="
				clip-path: polygon(100% 0, 0 0, 100% 100%);
				filter: brightness(0.85);
				box-shadow: -2px 2px 4px rgba(0,0,0,0.15);
			"
		></div>

		<!-- Header with icon -->
		<div class="mb-5 flex items-center gap-2 relative z-10">
			<StickyNote class="text-amber-600" size={24} />
			<h2 class="text-lg font-semibold text-gray-800">Create New Issue</h2>
		</div>

		<div class="flex flex-col gap-4 text-sm relative z-10">
			<label class="flex flex-col gap-1">
				<span class="font-medium text-gray-700 flex items-center gap-1.5">
					<StickyNote size={16} class="text-amber-600" />
					Title
				</span>
				<input
					class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
					focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
					transition-all"
					type="text"
					bind:value={title}
					placeholder="Enter issue title..."
					required
				/>
			</label>

			<label class="flex flex-col gap-1">
				<span class="font-medium text-gray-700 flex items-center gap-1.5">
					<AlertCircle size={16} class="text-blue-600" />
					Description
				</span>
				<textarea
					class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
					focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
					transition-all resize-none"
					bind:value={description}
					placeholder="Describe the issue..."
					rows="3"
				></textarea>
			</label>

			<div class="grid grid-cols-2 gap-3">
				<label class="flex flex-col gap-1">
					<span class="font-medium text-gray-700 flex items-center gap-1.5">
						<Calendar size={16} class="text-green-600" />
						Due Date
					</span>
					<input
						class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
						focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
						transition-all"
						type="date"
						bind:value={dueDate}
					/>
				</label>

				<label class="flex flex-col gap-1">
					<span class="font-medium text-gray-700 flex items-center gap-1.5">
						<Zap size={16} class="text-purple-600" />
						Story Points
					</span>
					<input
						class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
						focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
						transition-all"
						type="number"
						bind:value={storyPoints}
						min="1"
					/>
				</label>
			</div>

			<label class="flex flex-col gap-1">
				<span class="font-medium text-gray-700 flex items-center gap-1.5">
					<AlertCircle size={16} class="text-red-600" />
					Priority
				</span>
				<select
					class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
					focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
					transition-all"
					bind:value={priority}
				>
					<option>Low</option>
					<option>Medium</option>
					<option>High</option>
				</select>
			</label>

			<label class="flex flex-col gap-1">
				<span class="font-medium text-gray-700 flex items-center gap-1.5">
					<StickyNote size={16} class="text-amber-600" />
					Card Color
				</span>
				<div class="flex gap-2">
					{#each colors as color}
						<button
							type="button"
							onclick={() => cardColor = color.value}
							class={`w-10 h-10 rounded-md border-2 transition-all hover:scale-110 ${color.class} ${cardColor === color.value ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300'}`}
							title={color.name}
						></button>
					{/each}
				</div>
			</label>

			<div class="mt-4 flex justify-end gap-2">
				<button
					class="rounded-md bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 
					transition-all hover:shadow-lg flex items-center gap-1.5 font-medium"
					onclick={handleCreate}
				>
					<CheckCircle size={18} />
					Create
				</button>
				<button
					class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 shadow hover:bg-gray-300
					transition-all flex items-center gap-1.5 font-medium"
					onclick={onClose}
				>
					<X size={18} />
					Cancel
				</button>
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0;
		border: none;
		background: transparent;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
	}

	.issue-dialog {
		animation: popIn 0.2s ease-out;
	}

	@keyframes popIn {
		from {
			transform: scale(0.9) translate(-50%, -50%);
			opacity: 0;
		}
		to {
			transform: scale(1) translate(-50%, -50%);
			opacity: 1;
		}
	}
</style>