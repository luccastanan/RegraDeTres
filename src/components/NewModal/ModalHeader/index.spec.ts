import { fireEvent } from '@testing-library/react-native';
import { renderWithMiniAppEnergia } from '~/modules/plugins/energiaV1/infra/jest/jestComponentHelper';
import ModalHeader, { ModalHeaderProps } from '.';
import { NEW_MODAL_HEADER_ACCESSIBILITY_LABELS } from '.';

const createRender = (props: ModalHeaderProps) => {
	return renderWithMiniAppEnergia(ModalHeader, props);
};

describe('ModalHeader snapshot', () => {
	it('Should be able to render', () => {
		const { toJSON } = createRender({
			onClose: jest.fn(),
			title: 'Anexar imagem',
		});

		expect(toJSON()).toMatchSnapshot();
	});
});

describe('ModalHeader callbacks', () => {
	it('should call onClose when closed', () => {
		const onCloseMock = jest.fn();
		const { getByLabelText } = createRender({
			onClose: onCloseMock,
			title: 'Anexar imagem',
		});

		const closeButton = getByLabelText(
			NEW_MODAL_HEADER_ACCESSIBILITY_LABELS.CLOSE_BUTTON,
		);

		fireEvent.press(closeButton);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});
});
