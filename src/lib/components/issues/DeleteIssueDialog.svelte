<script>
    import { AlertTriangle, X, Trash2 } from 'lucide-svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import Dialog from '$lib/components/ui/Dialog.svelte';
    import FoldedCorner from '$lib/components/ui/FoldedCorner.svelte';

    let { issue, onDelete, onClose } = $props();

    function handleDelete() {
        onDelete(issue.id);
    }
</script>

<Dialog>
    <div
        class="relative w-96 rounded-sm border-t border-l bg-red-50
        p-6 text-gray-800 
        shadow-[4px_6px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
        transition-all duration-300"
        style="transform: rotate(-0.8deg);"
    >
        <!-- Close button -->
        <Button variant="close" onclick={onClose} icon={X} iconSize={16} ariaLabel="Close dialog" />

        <!-- Top folded corner -->
        <FoldedCorner cardColor="bg-red-50" />

        <!-- Header with warning icon -->
        <div class="relative z-10 mb-4 flex items-center gap-3">
            <AlertTriangle class="text-red-600" size={28} />
            <h2 class="text-lg font-semibold text-gray-800">Delete Issue?</h2>
        </div>

        <!-- Issue Preview -->
        <div class="relative z-10 mb-4 p-3 bg-white/60 rounded border border-red-200">
            <h3 class="font-semibold text-gray-800 mb-1">{issue.title}</h3>
            <p class="text-xs text-gray-600 line-clamp-2">
                {issue.description || 'No description'}
            </p>
            <div class="mt-2 flex gap-2 text-xs text-gray-500">
                <span>Status: {issue.status}</span>
                <span>•</span>
                <span>Priority: {issue.priority}</span>
            </div>
        </div>

        <!-- Warning Message -->
        <div class="relative z-10 mb-6">
            <p class="text-sm text-gray-700">
                This action <strong>cannot be undone</strong>. The issue will be permanently deleted.
            </p>
        </div>

        <!-- Actions -->
        <div class="relative z-10 flex gap-3 justify-end">
            <Button variant="secondary" onclick={onClose} text="Cancel">
            </Button>
            <Button 
                variant="primary" 
                onclick={handleDelete}
                class="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                text="Delete Issue"
            >
                
            </Button>
        </div>
    </div>
</Dialog>