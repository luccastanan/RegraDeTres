import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import Text from '@/components/Text';

export const Container = styled.View`
  flex: 1;
`;

export const StyledInput = styled(TextInput).attrs(({theme}) => ({
  placeholderTextColor: theme.colors.TEXT_SECONDARY_COLOR,
}))`
  background-color: ${({theme}) => theme.colors.NEUTRAL_COLOR};
  font-size: 16px;
  color: ${({theme}) => theme.colors.TEXT_PRIMARY_COLOR};
  border-radius: 16px;
  padding-horizontal: 12px;
  padding-vertical: 0;
`;

export const ErrorContainer = styled.View`
  min-height: 20px;
`;

export const ErrorMessage = styled(Text).attrs(({theme}) => ({
  color: theme.colors.DANGER_COLOR,
  size: 'H7',
}))``;
