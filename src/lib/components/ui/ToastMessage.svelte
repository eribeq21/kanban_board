<script>
    import { fly } from 'svelte/transition';
    import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-svelte';
    
    let { message, type = 'success', onClose } = $props();
    
    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertCircle,
        info: Info
    };
    
    const colors = {
        success: { bg: '#d4edda', border: '#8b5c2e', text: 'text-green-800', icon: 'text-green-600' },
        error: { bg: '#f8d7da', border: '#8b5c2e', text: 'text-red-800', icon: 'text-red-600' },
        warning: { bg: '#fff3cd', border: '#8b5c2e', text: 'text-yellow-800', icon: 'text-yellow-600' },
        info: { bg: '#d1ecf1', border: '#8b5c2e', text: 'text-blue-800', icon: 'text-blue-600' }
    };
    
    const Icon = icons[type];
    const color = colors[type];
</script>

<div
    transition:fly={{ x: 300, duration: 300 }}
    class={`
        relative min-w-[300px] max-w-[400px] p-4
        ${color.text}
        border-2 rounded-sm
        shadow-[3px_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.6)]
        font-sans text-sm
    `}
    style="
        transform: rotate(-0.5deg);
        background: 
            repeating-linear-gradient(
                0deg,
                ${color.bg},
                ${color.bg} 24px,
                rgba(139, 92, 46, 0.05) 24px,
                rgba(139, 92, 46, 0.05) 25px
            );
        border-color: ${color.border};
        box-shadow: 
            3px 4px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 0 40px rgba(139, 92, 46, 0.03);
    "
>
    <!-- Small folded corner -->
    <div 
        class="absolute top-0 right-0 w-6 h-6 z-20"
        style="
            background: linear-gradient(135deg, transparent 50%, rgba(139, 92, 46, 0.2) 50%);
            clip-path: polygon(100% 0, 0 0, 100% 100%);
        "
    ></div>

    <!-- Content -->
    <div class="relative z-10 flex items-start gap-3">
        <Icon class={color.icon} size={20} />
        <p class="flex-1 leading-relaxed">{message}</p>
        <button
            onclick={onClose}
            class="text-gray-500 hover:text-gray-700 transition-colors -mt-1"
            aria-label="Close"
        >
            <X size={16} />
        </button>
    </div>
</div>