import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!isOpen) return;
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose?.();
				onChange?.(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, rootRef, onClose, onChange]);
};
