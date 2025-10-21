<script>
	let { label, icon: Icon, iconSize = 16, iconColor = 'text-amber-600', children } = $props();
</script>

<label class="flex flex-col gap-1">
	<span class="flex items-center gap-1.5 font-medium text-gray-700">
		{#if Icon}
			<Icon size={iconSize} class={iconColor} />
		{/if}
		{label}
	</span>
	{@render children()}
</label>
