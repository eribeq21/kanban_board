<script>
	let { cardColor = 'bg-yellow-200' } = $props();
</script>

<div
	class={`pointer-events-none absolute top-0 right-0 h-10 w-10 ${cardColor}`}
	style="
		clip-path: polygon(100% 0, 0 0, 100% 100%);
		filter: brightness(0.85);
		box-shadow: -2px 2px 4px rgba(0,0,0,0.15);
	"
></div>
