<script>
	let { 
		value = $bindable(''),
		options = []
	} = $props();
</script>

<select
	class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
	focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
	transition-all"
	bind:value
>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
