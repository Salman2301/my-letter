let initialEnabled = true;
export default function clickOutside(
	node: HTMLElement,
	{ enabled, cb }: { enabled?: boolean; cb: () => any }
) {
	const handleOutsideClick = ({ target }: any) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }: any) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
