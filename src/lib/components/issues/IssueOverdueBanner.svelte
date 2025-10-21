<script>
	import { AlertTriangle } from 'lucide-svelte';
</script>

<div
	class="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
	style="transform: rotate(-15deg);"
>
	<div
		class="flex items-center gap-1.5 px-4 py-1 text-xs font-bold tracking-wide text-white uppercase"
		style="
            background: linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);
            border-top: 2px solid rgba(255, 255, 255, 0.3);
            border-bottom: 2px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        "
	>
		<AlertTriangle size={14} />
		<span>Overdue</span>
		<AlertTriangle size={14} />
	</div>
</div>
