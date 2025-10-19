<script>
	let { 
		text, 
		variant = 'primary',
		onclick
	} = $props();
	
	let bg = $derived(
		variant === 'primary' ? 'bg-green-500 hover:bg-green-600 text-white' :
		variant === 'secondary' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' :
		'bg-red-500 hover:bg-red-600 text-white'
	);
</script>

<button
	class={`rounded-md px-4 py-2 shadow-md hover:shadow-lg 
	transition-all font-medium ${bg}`}
	onclick={onclick}
>
	{text}
</button>
