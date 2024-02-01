import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import getColorDS from '~/modules/plugins/energiaV1/utils/getColorDS';

import { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
	isFullScreen: boolean;
};

export const Container = styled(Animated.View)<ContainerProps>`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	${({ isFullScreen }) =>
		isFullScreen &&
		css`
			top: 0;
		`}
`;

export const MirrorContainer = styled(Animated.View)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
`;
export const Mirror = styled.TouchableOpacity`
	flex: 1;
`;

export const Content = styled(SafeAreaView)`
	flex: 1;
	background-color: ${getColorDS('neutral0')};
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
`;

export const Children = styled.View`
	flex: 1;
`;
