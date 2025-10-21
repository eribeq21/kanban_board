<script>
	let {
		text,
		variant = 'primary',
		onclick,
		icon: Icon,
		iconSize = 13,
		type = 'button',
		ariaLabel,
		color, // For icon-action variant
		size = 12, // For icon-action variant
		title // For icon-action variant
	} = $props();

	// Icon-action variant: gradient backgrounds
	let bg = $derived(
		color === 'orange'
			? 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)'
			: color === 'green'
				? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
				: color === 'blue'
					? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
					: color === 'red'
						? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
						: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)'
	);

	let borderColor = $derived(
		color === 'orange'
			? 'rgba(249, 115, 22, 0.3)'
			: color === 'green'
				? 'rgba(34, 197, 94, 0.3)'
				: color === 'blue'
					? 'rgba(59, 130, 246, 0.3)'
					: color === 'red'
						? 'rgba(239, 68, 68, 0.3)'
						: 'rgba(107, 114, 128, 0.3)'
	);

	let textColor = $derived(
		color === 'orange'
			? 'text-orange-700'
			: color === 'green'
				? 'text-green-700'
				: color === 'blue'
					? 'text-blue-700'
					: color === 'red'
						? 'text-red-700'
						: 'text-gray-700'
	);

	let rotation = $derived(Math.random() * 4 - 2); // Random small rotation for icon-action

	let classes = $derived(
		variant === 'primary'
			? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-green-500 hover:bg-green-600 text-white'
			: variant === 'secondary'
				? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-gray-200 hover:bg-gray-300 text-gray-700'
				: variant === 'danger'
					? 'rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all font-medium bg-red-500 hover:bg-red-600 text-white'
					: variant === 'close'
						? 'absolute -top-2 -right-2 p-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all hover:scale-110 z-10'
						: variant === 'header-blue'
							? 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-blue-100 border border-blue-300 rounded-sm shadow-sm hover:bg-blue-200 transition-all'
							: variant === 'header-amber'
								? 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-amber-100 border border-amber-300 rounded-sm shadow-sm hover:bg-amber-200 transition-all'
								: variant === 'icon-action'
									? `px-1.5 py-1 ${textColor} transition-all hover:scale-105 cursor-pointer`
									: ''
	);
</script>

{#if variant === 'icon-action'}
	<button
		class={classes}
		style="
			background: {bg};
			border: 1px solid {borderColor};
			border-radius: 2px;
			box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
			transform: rotate({rotation}deg);
		"
		{onclick}
		{type}
		{title}
		aria-label={ariaLabel}
	>
		<Icon {size} />
	</button>
{:else}
	<button class={classes} {onclick} {type} aria-label={ariaLabel}>
		{#if Icon}
			<Icon size={iconSize} />
		{/if}
		{#if text}
			{text}
		{/if}
	</button>
{/if}
