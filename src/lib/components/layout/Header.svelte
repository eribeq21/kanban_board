<script>
    import { Pin, StickyNote } from 'lucide-svelte';
	let { countryData, onCreateOpen } = $props();
</script>

<header
	class="relative flex items-center justify-between px-5 py-2.5 border-b border-gray-300 shadow-sm"
	style="
		font-family: 'Permanent Marker', cursive;
		background: linear-gradient(180deg, #faf8f3 0%, #f5f1e8 100%);
	"
>
	<!-- Subtle paper texture -->
	<div 
		class="absolute inset-0 pointer-events-none opacity-5"
		style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence baseFrequency=%221.2%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');">
	</div>

	<!-- Small decorative pins -->
	<div class="absolute top-1 left-8 text-red-400 opacity-60 z-10">
		<Pin size={12} fill="currentColor" />
	</div>
	<div class="absolute top-1 right-8 text-blue-400 opacity-60 z-10" style="transform: rotate(18deg);">
		<Pin size={12} fill="currentColor" />
	</div>

	<!-- Country label -->
	<div class="flex items-center gap-2 relative z-10">
		{#if countryData.flag}
			<img
				src={countryData.flag}
				alt="{countryData.country} flag"
				class="h-4 w-4 rounded-sm shadow-sm border border-gray-300"
			/>
		{/if}
		<span class="text-sm tracking-wide text-gray-700">{countryData.country}</span>
	</div>

	<!-- Simple button -->
	<button
		onclick={onCreateOpen}
		class="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 
		bg-amber-100 border border-amber-300 rounded-sm shadow-sm 
		hover:bg-amber-200 transition-all z-10"
	>
		<StickyNote size={13} />
		Add Card
	</button>
</header>