import React from 'react';

import * as S from './styles';

enum HeaderSide {
	LEFT = 'left',
	RIGHT = 'right',
}

type HeaderIcon = 'close' | 'left-arrow';

export type ModalHeaderProps = {
	title?: string;
	headerIcon?: HeaderIcon;
	showHeaderIcon?: boolean;
	isFullScreen?: boolean;
	onClose?: () => void;
};

export const NEW_MODAL_HEADER_ACCESSIBILITY_LABELS = {
	CONTAINER: 'new-modal-header-container',
	CLOSE_BUTTON: 'new-modal-header-close-button',
	TITLE: 'new-modal-header-title',
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
	title,
	headerIcon,
	showHeaderIcon = true,
	isFullScreen,
	onClose,
}) => {
	const renderCloseButton = (side: HeaderSide) => {
		if (
			!showHeaderIcon ||
			(side == HeaderSide.LEFT && !isFullScreen) ||
			(side == HeaderSide.RIGHT && isFullScreen)
		)
			return;

		const Icon = headerIcon === 'close' ? S.CloseIcon : S.LeftIcon;
		return (
			<S.HeaderCloseButton
				onPress={onClose}
				icon={<Icon />}
				accessibilityLabel={NEW_MODAL_HEADER_ACCESSIBILITY_LABELS.CLOSE_BUTTON}
			/>
		);
	};

	const renderShape = () => {
		if (isFullScreen) return;

		return (
			<S.ContainerShape>
				<S.Shape />
			</S.ContainerShape>
		);
	};

	const renderTitle = () => {
		if (!title) return;

		return (
			<S.Title accessibilityLabel={NEW_MODAL_HEADER_ACCESSIBILITY_LABELS.TITLE}>
				{title}
			</S.Title>
		);
	};

	return (
		<>
			{renderShape()}
			<S.Header
				accessibilityLabel={NEW_MODAL_HEADER_ACCESSIBILITY_LABELS.CONTAINER}>
				{renderCloseButton(HeaderSide.LEFT)}
				{renderTitle()}
				{renderCloseButton(HeaderSide.RIGHT)}
			</S.Header>
		</>
	);
};

export default ModalHeader;
