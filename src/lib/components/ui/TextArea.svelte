<script>
	let { 
		value = $bindable(''),
		placeholder = ''
	} = $props();
</script>

<textarea
	class="rounded border border-amber-200 bg-white/80 px-3 py-2 shadow-sm 
	focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200
	transition-all resize-none"
	bind:value
	{placeholder}
	rows="3"
></textarea>