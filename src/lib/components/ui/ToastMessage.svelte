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
        success: { 
            bg: 'bg-green-100', 
            text: 'text-green-800', 
            icon: 'text-green-600',
            fold: 'bg-green-200'
        },
        error: { 
            bg: 'bg-red-100', 
            text: 'text-red-800', 
            icon: 'text-red-600',
            fold: 'bg-red-200'
        },
        warning: { 
            bg: 'bg-yellow-100', 
            text: 'text-yellow-800', 
            icon: 'text-yellow-600',
            fold: 'bg-yellow-200'
        },
        info: { 
            bg: 'bg-blue-100', 
            text: 'text-blue-800', 
            icon: 'text-blue-600',
            fold: 'bg-blue-200'
        }
    };
    
    const Icon = icons[type];
    const color = colors[type];
</script>

<div
    transition:fly={{ x: 300, duration: 300 }}
    class={`
        relative min-w-[300px] max-w-[400px] p-4 pr-12
        ${color.bg} ${color.text}
        font-sans text-sm
    `}
    style="
        transform: rotate(-0.5deg);
        border-radius: 2px 8px 2px 8px;
        box-shadow: 
            4px 6px 12px rgba(0, 0, 0, 0.25),
            inset 0 0 40px rgba(139, 92, 46, 0.03);
        background-image: 
            radial-gradient(circle at 20% 50%, rgba(139, 92, 46, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 46, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 46, 0.02) 0%, transparent 50%);
        filter: contrast(0.98) brightness(0.99);
    "
>
    <!-- Bigger folded corner with X button -->
    <button
        onclick={onClose}
        class={`
            absolute top-0 right-0 w-12 h-12 z-20
            ${color.fold}
            flex items-start justify-end
            hover:opacity-80 transition-opacity
            cursor-pointer
        `}
        style="
            clip-path: polygon(100% 0, 0 0, 100% 100%);
            border-radius: 0 8px 0 0;
        "
        aria-label="Close"
    >
        <X size={14} class="mt-1 mr-1 text-gray-700" />
    </button>

    <!-- Content -->
    <div class="relative z-10 flex items-start gap-3">
        <Icon class={color.icon} size={20} />
        <p class="flex-1 leading-relaxed">{message}</p>
    </div>
</div>