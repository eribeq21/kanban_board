<script>
	let { 
		value = $bindable(''),
		placeholder = '',
		type = 'text'
	} = $props();
</script>

<input
	class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
	focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
	transition-all"
	{type}
	bind:value
	{placeholder}
/>
