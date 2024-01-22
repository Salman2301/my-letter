<script lang="ts">
	import type { Tables } from "$lib/database.types";

	export let data: Tables<"letter">;
</script>

<h1>{data.title}</h1>
