<script lang="ts">
	import { page } from '$app/stores';
	import Letter from '$lib/components/form_bind/letter/Letter.svelte';
</script>

<Letter isEditMode={true} editId={$page.params.id} />
