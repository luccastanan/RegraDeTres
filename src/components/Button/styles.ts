import {
  Pressable,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import Text from '@/components/Text';

export const PressContainer = styled(Pressable)``;

export const BaseContainer = styled.View`
  padding: 8px 16px;
  align-items: center;
  border-radius: 50px;
`;

export const NormalContainer = styled(BaseContainer)`
  background-color: ${({theme}) => theme.colors.ACCENT_COLOR};
`;

export const GhostContainer = styled(BaseContainer)``;

export const OutlineContainer = styled(BaseContainer)`
  border-color: ${({theme}) => theme.colors.ACCENT_COLOR};
  border-width: 1px;
`;

export const BaseLabel = styled(Text)`
  text-align: center;
`;

export const NormalLabel = styled(BaseLabel).attrs(({theme}) => ({
  color: theme.colors.BACKGROUND_COLOR,
}))``;

export const GhostLabel = styled(BaseLabel).attrs(({theme}) => ({
  color: theme.colors.ACCENT_COLOR,
}))``;

export const OutlineLabel = styled(BaseLabel).attrs(({theme}) => ({
  color: theme.colors.ACCENT_COLOR,
}))``;
