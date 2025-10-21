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
	<!-- Country label -->
	<div class="relative z-10 flex items-center gap-2">
		<!-- Pin above flag -->
		{#if countryData.flag}
			<div class="relative">
				<div class="absolute -top-2 left-1/2 -translate-x-1/2 z-20 text-green-400 opacity-70" style="transform: translate(-50%, -50%) rotate(-8deg);">
					<Pin size={14} fill="currentColor" />
				</div>
				<img
					src={countryData.flag}
					alt="{countryData.country} flag"
					class="h-4 w-4 rounded-sm border border-gray-300 shadow-sm"
				/>
			</div>
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
		<!-- Export CSV button with pin -->
		<div class="relative">
			<!-- Pin above button -->
			<div class="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-blue-400 opacity-70" style="transform: translate(-50%, -25%) rotate(12deg);">
				<Pin size={14} fill="currentColor" />
			</div>
			<Button
				variant="header-blue"
				onclick={onExportCSV}
				icon={FileDown}
				iconSize={13}
				text="Export CSV"
			/>
		</div>

		<!-- Add Card button with pin -->
		<div class="relative">
			<!-- Pin above button -->
			<div class="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-red-400 opacity-70" style="transform: translate(-50%, -25%) rotate(-15deg);">
				<Pin size={14} fill="currentColor" />
			</div>
			<Button
				variant="header-amber"
				onclick={onCreateOpen}
				icon={StickyNote}
				iconSize={13}
				text="Add Card"
			/>
		</div>
	</div>
</header>
