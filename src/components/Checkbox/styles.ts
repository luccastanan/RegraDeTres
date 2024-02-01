import styled, {css} from 'styled-components/native';
import Icon from '../Icon';
import Text from '../Text';

export type BaseProps = {
  isChecked?: boolean;
};

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Label = styled(Text).attrs({
  type: 'Normal',
  fontWeight: 'regular',
})``;

export const Box = styled.View<BaseProps>`
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.ACCENT_COLOR};
  padding: 2px;
  margin-right: 4px;
  ${({isChecked}) =>
    isChecked &&
    css`
      background-color: ${({theme}) => theme.colors.ACCENT_COLOR};
    `}
`;

export const CheckIcon = styled(Icon).attrs(({theme}) => ({
  name: 'Check',
  size: 16,
  color: theme.colors.BACKGROUND_COLOR,
}))``;
