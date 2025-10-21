<script>
	import { Pin, StickyNote, FileDown } from 'lucide-svelte';
	// components
	import Button from '$lib/components/ui/Button.svelte';

	let { countryData, onCreateOpen, onExportCSV } = $props();
</script>

<header
	class="relative flex items-center justify-between border-b border-gray-300 px-5 py-2.5 shadow-sm"
	style="
		font-family: 'Permanent Marker', cursive;
		background: linear-gradient(180deg, #faf8f3 0%, #f5f1e8 100%);
	"
>
	<!-- Small decorative pins -->
	<div class="absolute top-1 left-8 z-10 text-red-400 opacity-60">
		<Pin size={12} fill="currentColor" />
	</div>
	<div
		class="absolute top-1 right-8 z-10 text-blue-400 opacity-60"
		style="transform: rotate(18deg);"
	>
		<Pin size={12} fill="currentColor" />
	</div>

	<!-- Country label -->
	<div class="relative z-10 flex items-center gap-2">
		{#if countryData.flag}
			<img
				src={countryData.flag}
				alt="{countryData.country} flag"
				class="h-4 w-4 rounded-sm border border-gray-300 shadow-sm"
			/>
		{/if}
		<span class="text-sm tracking-wide text-gray-700">{countryData.country}</span>
		{#if countryData.isOffline}
			<span
				class="rounded-sm border border-orange-300 bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700"
				title="Using cached location data (offline)"
			>
				OFFLINE
			</span>
		{/if}
	</div>

	<!-- Buttons container -->
	<div class="relative z-10 flex items-center gap-2">
		<!-- Export CSV button -->
		<Button
			variant="header-blue"
			onclick={onExportCSV}
			icon={FileDown}
			iconSize={13}
			text="Export CSV"
		/>

		<!-- Add Card button -->
		<Button
			variant="header-amber"
			onclick={onCreateOpen}
			icon={StickyNote}
			iconSize={13}
			text="Add Card"
		/>
	</div>
</header>
