<script>
    import { Pin, Paperclip } from 'lucide-svelte';
	let { countryData, onCreateOpen } = $props();
</script>

<header
	class="relative flex items-center justify-between px-6 py-3 border-b border-gray-400 shadow-inner bg-gradient-to-b from-stone-200 to-stone-300"
	style="font-family: 'Permanent Marker', cursive;"
>
	<!-- Decorative pins -->
	<div class="absolute top-1 left-4 text-gray-500 opacity-60">
		<Pin size={18} />
	</div>
	<div class="absolute top-1 right-4 text-gray-500 opacity-60">
		<Paperclip size={18} />
	</div>

	<!-- Country label -->
	<div class="flex items-center gap-2">
		{#if countryData.flag}
			<img
				src={countryData.flag}
				alt="{countryData.country} flag"
				class="h-6 w-6 rounded shadow-sm border border-gray-400"
			/>
		{/if}
		<span class="text-lg tracking-wide">{countryData.country}</span>
	</div>

	<!-- Button -->
	<button
		onclick={onCreateOpen}
		class="rounded bg-yellow-200/70 border border-yellow-400 px-3 py-1 text-sm font-semibold text-gray-800 shadow-[2px_2px_0_rgba(0,0,0,0.2)] transition hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.2)] active:translate-y-[2px]"
	>
		 Add Card
	</button>
</header>