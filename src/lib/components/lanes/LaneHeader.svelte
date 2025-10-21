<script>
	import { Pin } from 'lucide-svelte';

	let { name } = $props();
</script>

<!-- Vintage label tag for lane name - centered -->
<div class="mb-4 flex justify-center">
	<div class="relative inline-block">
		<!-- Pin holding the label -->
		<div
			class="absolute -top-2 left-1/2 z-10 -translate-x-1/2 text-gray-600"
			style="filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.3));"
		>
			<Pin size={16} fill="currentColor" />
		</div>

		<!-- Label tag -->
		<h2
			class="relative px-4 py-1.5 text-sm font-medium text-gray-800"
			style="
				background: linear-gradient(135deg, #f5f5dc 0%, #e8dcc0 100%);
				border: 1px solid rgba(139, 92, 46, 0.3);
				border-radius: 2px;
				box-shadow: 
					2px 3px 5px rgba(0, 0, 0, 0.15),
					inset 0 1px 0 rgba(255, 255, 255, 0.5);
				transform: rotate(-1deg);
			"
		>
			{name}
		</h2>
	</div>
</div>
