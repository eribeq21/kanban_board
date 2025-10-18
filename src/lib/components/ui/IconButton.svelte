<script>
	let { icon: Icon, size = 12, color, onclick, title } = $props();
	
	let bg = $derived(
		color === 'orange' ? 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' :
		color === 'green' ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' :
		color === 'blue' ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' :
		color === 'red' ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 
		'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)'
	);
	
	let borderColor = $derived(
		color === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
		color === 'green' ? 'rgba(34, 197, 94, 0.3)' :
		color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
		color === 'red' ? 'rgba(239, 68, 68, 0.3)' : 
		'rgba(107, 114, 128, 0.3)'
	);
	
	let textColor = $derived(
		color === 'orange' ? 'text-orange-700' :
		color === 'green' ? 'text-green-700' :
		color === 'blue' ? 'text-blue-700' :
		color === 'red' ? 'text-red-700' : 
		'text-gray-700'
	);
	
	let rotation = $derived(Math.random() * 4 - 2); // Random small rotation
</script>

<button
	class={`px-1.5 py-1 ${textColor} transition-all hover:scale-105 cursor-pointer`}
	style="
		background: {bg};
		border: 1px solid {borderColor};
		border-radius: 2px;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
		transform: rotate({rotation}deg);
	"
	{onclick}
	{title}
>
	<Icon {size} />
</button>