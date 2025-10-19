<script>
	import { StickyNote, Calendar, Zap, AlertCircle, CheckCircle, X } from 'lucide-svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import TextArea from '$lib/components/ui/TextArea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ColorPicker from '$lib/components/ui/ColorPicker.svelte';
	import FormField from '$lib/components/ui/FormField.svelte';
	
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

	// Validation state
	let errors = $state({
		title: '',
		description: '',
		dueDate: ''
	});

	let touched = $state({
		title: false,
		description: false,
		dueDate: false
	});

	function validateField(field) {
		touched[field] = true;
		
		if (field === 'title') {
			if (!title.trim()) {
				errors.title = 'Please enter a title for the issue';
			} else if (title.trim().length < 3) {
				errors.title = 'Title must be at least 3 characters';
			} else {
				errors.title = '';
			}
		}
		
		if (field === 'description') {
			if (!description.trim()) {
				errors.description = 'Please provide a description';
			} else if (description.trim().length < 10) {
				errors.description = 'Description must be at least 10 characters';
			} else {
				errors.description = '';
			}
		}
		
		if (field === 'dueDate') {
			if (!dueDate) {
				errors.dueDate = 'Please select a due date';
			} else {
				errors.dueDate = '';
			}
		}
	}

	function validateAll() {
		validateField('title');
		validateField('description');
		validateField('dueDate');
		
		return !errors.title && !errors.description && !errors.dueDate;
	}

	function handleCreate() {
		// Mark all fields as touched
		touched.title = true;
		touched.description = true;
		touched.dueDate = true;
		
		if (!validateAll()) {
			console.log('Validation failed:', errors);
			return;
		}
		
		const newIssue = {
			id: crypto.randomUUID(), // Unique ID
			title,
			description,
			dueDate: new Date(dueDate),
			storyPoints: Number(storyPoints),
			priority,
			cardColor
		};
		
		console.log('Creating issue:', newIssue);
		onCreate(newIssue);
		reset();
		onClose();
	}

	function reset() {
		title = '';
		description = '';
		dueDate = new Date().toISOString().split('T')[0];
		storyPoints = 1;
		priority = 'Medium';
		cardColor = 'bg-yellow-200';
		
		// Reset validation state
		errors = {
			title: '',
			description: '',
			dueDate: ''
		};
		touched = {
			title: false,
			description: false,
			dueDate: false
		};
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
			<FormField label="Title" icon={StickyNote} iconColor="text-amber-600">
				<TextInput 
					bind:value={title} 
					placeholder="Enter issue title..." 
					onblur={() => validateField('title')}
					oninput={() => { if (touched.title) validateField('title'); }}
				/>
				{#if touched.title && errors.title}
					<p class="text-red-600 text-xs mt-1">{errors.title}</p>
				{/if}
			</FormField>

			<FormField label="Description" icon={AlertCircle} iconColor="text-blue-600">
				<TextArea 
					bind:value={description} 
					placeholder="Describe the issue..." 
					onblur={() => validateField('description')}
					oninput={() => { if (touched.description) validateField('description'); }}
				/>
				{#if touched.description && errors.description}
					<p class="text-red-600 text-xs mt-1">{errors.description}</p>
				{/if}
			</FormField>

			<div class="grid grid-cols-2 gap-3">
				<FormField label="Due Date" icon={Calendar} iconColor="text-green-600">
					<TextInput 
						bind:value={dueDate} 
						type="date" 
						onblur={() => validateField('dueDate')}
						onchange={() => validateField('dueDate')}
					/>
					{#if touched.dueDate && errors.dueDate}
						<p class="text-red-600 text-xs mt-1">{errors.dueDate}</p>
					{/if}
				</FormField>

				<FormField label="Story Points" icon={Zap} iconColor="text-purple-600">
					<TextInput bind:value={storyPoints} type="number" />
				</FormField>
			</div>

			<FormField label="Priority" icon={AlertCircle} iconColor="text-red-600">
				<Select bind:value={priority} options={['Low', 'Medium', 'High']} />
			</FormField>

			<FormField label="Card Color" icon={StickyNote} iconColor="text-amber-600">
				<ColorPicker bind:selectedColor={cardColor} {colors} />
			</FormField>

			<div class="mt-4 flex justify-end gap-2">
				<Button text="Create" variant="primary" onclick={handleCreate} />
				<Button text="Cancel" variant="secondary" onclick={onClose} />
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