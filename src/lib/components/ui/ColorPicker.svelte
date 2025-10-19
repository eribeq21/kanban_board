<script>
	let { 
		selectedColor = $bindable('bg-yellow-200'),
		colors = []
	} = $props();
</script>

<div class="flex gap-2">
	{#each colors as color}
		<button
			type="button"
			onclick={() => selectedColor = color.value}
			class={`w-10 h-10 rounded-md border-2 transition-all hover:scale-110 ${color.class} 
			${selectedColor === color.value ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300'}`}
			title={color.name}
		></button>
	{/each}
</div>