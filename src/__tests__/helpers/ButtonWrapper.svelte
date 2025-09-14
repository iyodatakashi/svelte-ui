<!-- ButtonWrapper.svelte - Test wrapper component for Button with Snippet -->
<script lang="ts">
	import Button from '../../lib/components/Button.svelte';

	let {
		buttonText = 'Default Text',
		...buttonProps
	}: {
		buttonText?: string;
		[key: string]: any;
	} = $props();
</script>

<Button {...buttonProps}>
	{buttonText}
</Button>
