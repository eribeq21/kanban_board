<script>
	let { 
		text, 
		variant = 'primary',
		onclick,
		icon: Icon,
		iconSize = 13,
		type = 'button',
		ariaLabel
	} = $props();
	
	let classes = $derived(
		variant === 'primary' ? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-green-500 hover:bg-green-600 text-white' :
		variant === 'secondary' ? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-gray-200 hover:bg-gray-300 text-gray-700' :
		variant === 'danger' ? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-red-500 hover:bg-red-600 text-white' :
		variant === 'close' ? 'absolute -top-2 -right-2 p-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all hover:scale-110 z-10' :
		variant === 'header-blue' ? 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-blue-100 border border-blue-300 rounded-sm shadow-sm hover:bg-blue-200 transition-all' :
		variant === 'header-amber' ? 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-amber-100 border border-amber-300 rounded-sm shadow-sm hover:bg-amber-200 transition-all' :
		''
	);
</script>

<button
	class={classes}
	{onclick}
	{type}
	aria-label={ariaLabel}
>
	{#if Icon}
		<Icon size={iconSize} />
	{/if}
	{#if text}
		{text}
	{/if}
</button>
