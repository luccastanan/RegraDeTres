import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import NewModal, { NEW_MODAL_ACCESSIBILITY_LABELS, NewModalProps } from '.';
import { TextDS } from '~/modules/plugins/energiaV1/presentation/components/DesignSystem';
import { NEW_MODAL_HEADER_ACCESSIBILITY_LABELS } from './ModalHeader';

const createRender = (props: NewModalProps) => {
	render(
		<NewModal {...props}>
			<TextDS>Novas funções para acessibilidade foram disponibilizadas</TextDS>
		</NewModal>,
	);
};

describe('NewModal snapshot', () => {
	it('Should be able to render', () => {
		createRender({
			onClose: jest.fn(),
			visible: true,
		});
		expect(screen.toJSON()).toMatchSnapshot();
	});
});

describe('NewModal callbacks', () => {
	it('should call onClose when closed', () => {
		const onCloseMock = jest.fn();
		createRender({
			onClose: onCloseMock,
			visible: true,
		});

		const closeButton = screen.getByLabelText(
			NEW_MODAL_HEADER_ACCESSIBILITY_LABELS.CLOSE_BUTTON,
		);

		fireEvent.press(closeButton);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});
});

describe('NewModal views', () => {
	test('children should be visible when it initial prop visible true', () => {
		createRender({
			onClose: jest.fn(),
			visible: true,
		});

		expect(
			screen.getByLabelText(NEW_MODAL_ACCESSIBILITY_LABELS.CHILDREN),
		).toBeTruthy();
	});

	test('children should be invisible when it initial prop visible false', () => {
		createRender({
			onClose: jest.fn(),
			visible: false,
		});

		expect(
			screen.queryByLabelText(NEW_MODAL_ACCESSIBILITY_LABELS.CHILDREN),
		).toBeFalsy();
	});

	it('should be render children regardless of visibility when showContentWhenModalIsHidden is true', () => {
		createRender({
			onClose: jest.fn(),
			visible: false,
			showContentWhenModalIsHidden: true,
		});

		expect(
			screen.queryByLabelText(NEW_MODAL_ACCESSIBILITY_LABELS.CHILDREN),
		).toBeTruthy();
	});
});
