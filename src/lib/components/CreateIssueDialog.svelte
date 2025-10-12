<script>
	let { onCreate, onClose } = $props();

	// Local state for inputs
	let title = $state('');
	let description = $state('');
	let dueDate = $state(new Date().toISOString().split('T')[0]); // Default today
	let storyPoints = $state(1);
	let priority = $state('Medium');

	function handleCreate() {
		if (!title) return;
		onCreate({
			id: crypto.randomUUID(), // Unique ID
			title,
			description,
			dueDate: new Date(dueDate),
			storyPoints: Number(storyPoints),
			priority
		});
		reset();
	}

	function reset() {
		title = '';
		description = '';
		dueDate = new Date().toISOString().split('T')[0];
		storyPoints = 1;
		priority = 'Medium';
	}
</script>

<dialog open class="rounded bg-white p-6 shadow-lg">
	<h2>Create New Issue</h2>
	<div class="flex flex-col gap-4">
		<label>Title: <input type="text" bind:value={title} required /></label>
		<label>Description: <textarea bind:value={description}></textarea></label>
		<label>Due Date: <input type="date" bind:value={dueDate} /></label>
		<label>Story Points: <input type="number" bind:value={storyPoints} min="1" /></label>
		<label
			>Priority:
			<select bind:value={priority}>
				<option>Low</option>
				<option>Medium</option>
				<option>High</option>
			</select>
		</label>
		<div class="flex justify-end gap-2">
			<button onclick={handleCreate}>Create</button>
			<button onclick={onClose}>Cancel</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
