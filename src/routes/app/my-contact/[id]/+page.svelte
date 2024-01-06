<script lang="ts">
	import { page } from '$app/stores';
	import Contact from '$lib/components/form_bind/Contact.svelte';
</script>

<Contact isEditMode={true} editId={$page.params.id} />
