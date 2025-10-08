<script>
  import Do from '$lib/components/Do.svelte';
  import Doing from '$lib/components/Doing.svelte';
  import Done from '$lib/components/Done.svelte';
  import Archive from '$lib/components/Archive.svelte';
</script>

<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 bg-gray-50 min-h-screen">
  <Do />
  <Doing />
  <Done />
  <Archive />
</div>

