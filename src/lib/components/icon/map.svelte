<script context="module" lang="ts">
	import { CircleIcon, PenToolIcon, SettingsIcon, UsersIcon } from 'svelte-feather-icons';

	export const iconMap = {
		circle: CircleIcon,
		users: UsersIcon,
		setting: SettingsIcon,
		'pen-tool': PenToolIcon
	} as const;
</script>
