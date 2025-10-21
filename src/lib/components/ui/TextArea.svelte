<script>
	let { value = $bindable(''), placeholder = '' } = $props();
</script>

<textarea
	class="resize-none rounded border border-amber-200 bg-white/80 px-3 py-2
	shadow-sm transition-all focus:border-amber-400 focus:ring-2
	focus:ring-amber-200 focus:outline-none"
	bind:value
	{placeholder}
	rows="3"
></textarea>
