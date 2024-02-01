import styled from 'styled-components/native';
import getColorDS from '~/modules/plugins/energiaV1/utils/getColorDS';
import {
	IconButtonDS,
	TextDS,
} from '~/modules/plugins/energiaV1/presentation/components/DesignSystem';
import {
	Close as XIcon,
	ArrowLeft1 as LeftArrowIcon,
} from '@superlogica/design-system-icons/mobile/gruvi';

export const Header = styled.View`
	padding: 0 8px;
	height: 56px;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background: ${getColorDS('neutral0')};
	border-bottom-width: 1px;
	border-bottom-color: ${getColorDS('neutral100')};
`;

export const Title = styled(TextDS).attrs({
	size: 'H6',
	color: 'neutral950',
	fontWeight: 'bold',
})`
	flex: 1;
	padding-left: 8px;
`;

export const HeaderCloseButton = styled(IconButtonDS).attrs({
	appearanceStyle: 'ghost',
})``;

export const CloseIcon = styled(XIcon).attrs({
	fill: 'neutral950',
	width: '20',
	height: '20',
})``;

export const LeftIcon = styled(LeftArrowIcon).attrs({
	fill: 'neutral950',
	width: '20',
	height: '20',
})``;

export const ContainerShape = styled.View`
	margin-top: 8px;
	align-items: center;
	justify-content: center;
`;

export const Shape = styled.View`
	width: 32px;
	height: 4px;
	background-color: ${getColorDS('neutral100')};
	border-radius: 4px;
`;
