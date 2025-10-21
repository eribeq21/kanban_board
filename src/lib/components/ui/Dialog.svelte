<script>
	let { children } = $props();
</script>

<dialog open class="issue-dialog">
	{@render children()}
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0;
		border: none;
		background: transparent;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
	}

	.issue-dialog {
		animation: popIn 0.2s ease-out;
	}

	@keyframes popIn {
		from {
			transform: scale(0.9) translate(-50%, -50%);
			opacity: 0;
		}
		to {
			transform: scale(1) translate(-50%, -50%);
			opacity: 1;
		}
	}
</style>
