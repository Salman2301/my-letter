<script context="module" lang="ts">
	import { BookIcon, CircleIcon, LoaderIcon, PackageIcon, PenToolIcon, SettingsIcon, UsersIcon } from 'svelte-feather-icons';

	export const iconMap = {
		circle: CircleIcon,
		users: UsersIcon,
		setting: SettingsIcon,
		'pen-tool': PenToolIcon,
		book: BookIcon,
		loader: LoaderIcon,
		package: PackageIcon
	} as const;
</script>
