<script>
	let { countryData, onCreateOpen } = $props();
</script>

<header class="flex items-center justify-between bg-gray-800 p-4 text-white">
	<span>
		{countryData.country}
		{#if countryData.flag}
			<img src={countryData.flag} alt="{countryData.country} flag" class="ml-2 inline h-auto w-6" />
		{/if}
	</span>

	<button onclick={onCreateOpen}>Create Issue</button>
</header>
