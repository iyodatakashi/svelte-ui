<!-- CleanupCalendar.svelte - DatepickerCalendar opened by ref, for listener cleanup tests -->
<script lang="ts">
	import DatepickerCalendar from '#lib/sharedComponents/DatepickerCalendar.svelte';

	let calendarRef: ReturnType<typeof DatepickerCalendar>;

	export const openCalendar = (): void => {
		calendarRef.handlePopupOpen();
	};
</script>

<DatepickerCalendar bind:this={calendarRef} value={undefined} />
