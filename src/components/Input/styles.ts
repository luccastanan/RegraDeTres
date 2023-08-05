import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import Text from '@/components/Text';
import Animated from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Container = styled.View`
  flex: 1;
`;

export const StyledInput = styled(AnimatedTextInput).attrs(({theme}) => ({
  placeholderTextColor: theme.colors.TEXT_SECONDARY_COLOR,
}))`
  background-color: ${({theme}) => theme.colors.NEUTRAL_COLOR};
  font-size: 20px;
  color: ${({theme}) => theme.colors.TEXT_PRIMARY_COLOR};
  border-radius: 8px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;
// export const Label = styled(AnimatedText)``;

export const ErrorContainer = styled.View`
  min-height: 20px;
`;

export const ErrorMessage = styled(Text).attrs(({theme}) => ({
  color: theme.colors.DANGER_COLOR,
  size: 'H7',
}))``;
