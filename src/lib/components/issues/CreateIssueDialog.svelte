<script>
	import { StickyNote, Calendar, Zap, AlertCircle, X } from 'lucide-svelte';
	// components
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import TextArea from '$lib/components/ui/TextArea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ColorPicker from '$lib/components/ui/ColorPicker.svelte';
	import FormField from '$lib/components/ui/FormField.svelte';
	import FoldedCorner from '$lib/components/ui/FoldedCorner.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';

	// utils
	import { validateTitle, validateDescription, validateDueDate } from '$lib/utils/validation';
	import { createIssue } from '$lib/utils/formState';
	import { CARD_COLORS, PRIORITY_LEVELS } from '$lib/utils/issueConstants';

	let { onCreate, onClose } = $props();

	let title = $state('');
	let description = $state('');
	let dueDate = $state(new Date().toISOString().split('T')[0]);
	let storyPoints = $state(1);
	let priority = $state('Medium');
	let cardColor = $state('bg-yellow-200');
	let errors = $state({ title: '', description: '', dueDate: '' });

	function handleCreate() {
		errors.title = validateTitle(title);
		errors.description = validateDescription(description);
		errors.dueDate = validateDueDate(dueDate);

		if (errors.title || errors.description || errors.dueDate) return;

		onCreate(createIssue({ title, description, dueDate, storyPoints, priority, cardColor }));
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
		errors = { title: '', description: '', dueDate: '' };
	}
</script>

<Dialog>
	<div
		class={`relative w-80 rounded-sm border-t border-l
		p-6 text-gray-800 
		shadow-[4px_6px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
		transition-all duration-300 ${cardColor}`}
		style="
			transform: rotate(-1.2deg);
		"
	>
		<!-- Close button -->
		<Button variant="close" onclick={onClose} icon={X} iconSize={16} ariaLabel="Close dialog" />

		<!-- Top folded corner -->
		<FoldedCorner {cardColor} />

		<!-- Header with icon -->
		<div class="relative z-10 mb-5 flex items-center gap-2">
			<StickyNote class="text-amber-600" size={24} />
			<h2 class="text-lg font-semibold text-gray-800">Create New Issue</h2>
		</div>

		<div class="relative z-10 flex flex-col gap-4 text-sm">
			<FormField label="Title" icon={StickyNote} iconColor="text-amber-600">
				<TextInput bind:value={title} placeholder="Enter issue title..." />
				{#if errors.title}
					<p class="mt-1 text-xs text-red-600">{errors.title}</p>
				{/if}
			</FormField>

			<FormField label="Description" icon={AlertCircle} iconColor="text-blue-600">
				<TextArea bind:value={description} placeholder="Describe the issue..." />
				{#if errors.description}
					<p class="mt-1 text-xs text-red-600">{errors.description}</p>
				{/if}
			</FormField>

			<div class="grid grid-cols-2 gap-3">
				<FormField label="Due Date" icon={Calendar} iconColor="text-green-600">
					<TextInput bind:value={dueDate} type="date" />
					{#if errors.dueDate}
						<p class="mt-1 text-xs text-red-600">{errors.dueDate}</p>
					{/if}
				</FormField>

				<FormField label="Story Points" icon={Zap} iconColor="text-purple-600">
					<TextInput bind:value={storyPoints} type="number" />
				</FormField>
			</div>

			<FormField label="Priority" icon={AlertCircle} iconColor="text-red-600">
				<Select bind:value={priority} options={PRIORITY_LEVELS} />
			</FormField>

			<FormField label="Card Color" icon={StickyNote} iconColor="text-amber-600">
				<ColorPicker bind:selectedColor={cardColor} colors={CARD_COLORS} />
			</FormField>

			<div class="mt-4 flex justify-end gap-2">
				<Button text="Create" variant="primary" onclick={handleCreate} />
				<Button text="Cancel" variant="secondary" onclick={onClose} />
			</div>
		</div>
	</div>
</Dialog>
