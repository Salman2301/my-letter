interface ClickOutsideOption {
	disabled?: boolean;
	disabledOnEsc: boolean;
	cb: () => any;
}

// NOTE: Can cause memory leak, Each popup create a event listener. Better to create one listener
export default function clickOutside(
	node: HTMLElement,
	{ disabled, disabledOnEsc, cb }: ClickOutsideOption
) {


	const handleOutsideClick = ({ target }: any) => {
		if (!node.contains(target)) cb();

	};

	const handleKeyPress = ({ code }: KeyboardEvent) => {
		if (code === "Escape" ) cb();
	}
	
	function update() {
		if (disabled) {
			window.removeEventListener('click', handleOutsideClick);
		} else {
			window.addEventListener('click', handleOutsideClick);
		}

		if (disabled || disabledOnEsc) {
			window.removeEventListener('keydown', handleKeyPress);
		}
		else {
			window.addEventListener('keydown', handleKeyPress);
		}
	}

	update();
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleKeyPress);
		}
	};
}
