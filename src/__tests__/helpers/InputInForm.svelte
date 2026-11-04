<!-- InputInForm.svelte - form 内の Input で Enter による暗黙の送信を確かめる -->
<script lang="ts">
	import Input from '../../lib/components/Input.svelte';

	let { onsubmit }: { onsubmit: (event: SubmitEvent) => void } = $props();
</script>

<form
	onsubmit={(event) => {
		event.preventDefault();
		onsubmit(event);
	}}
>
	<Input value="" />
	<button type="submit">Submit</button>
</form>
