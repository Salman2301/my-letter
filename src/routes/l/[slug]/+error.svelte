<script>
	import { page } from '$app/stores';
</script>

<!-- Show letter error -->
<h1>{$page.status}: {$page?.error?.message}</h1>