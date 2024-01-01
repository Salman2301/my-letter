<script context="module" lang="ts">
	import { BookIcon, CircleIcon, LoaderIcon, PenToolIcon, SettingsIcon, UsersIcon } from 'svelte-feather-icons';

	export const iconMap = {
		circle: CircleIcon,
		users: UsersIcon,
		setting: SettingsIcon,
		'pen-tool': PenToolIcon,
		book: BookIcon,
		loader: LoaderIcon
	} as const;
</script>
