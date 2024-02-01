import styled, {css} from 'styled-components/native';
import {Input as BaseInput, Text, Icon, Button} from '@/components';
import BoxShadow from '@/components/BoxShadow';

type OrientationProps = {
  isPortrait: boolean;
};

export const Container = styled.View<OrientationProps>`
  flex: 1;
  ${({isPortrait}) =>
    !isPortrait &&
    css`
      flex-direction: row;
    `}
`;

export const BackgroundImage = styled.Image.attrs({
  source: require('@/assets/images/grid.png'),
  resizeMode: 'repeat',
})`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.colors.BACKGROUND_COLOR};
`;

export const CardContainer = styled.ScrollView<OrientationProps>`
  flex-grow: 0;
  ${({isPortrait}) =>
    !isPortrait &&
    css`
      flex: 1;
    `}
`;

export const Card = styled(BoxShadow)`
  border-radius: 16px;
  padding: 12px 16px 16px 16px;
  margin-horizontal: 16px;
  margin-top: 16px;
  margin-bottom: 1px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const ArrowIcon = styled(Icon).attrs({
  name: 'ArrowRight',
  size: 20,
  color: 'black',
  weight: 'bold',
})`
  margin: 0px 8px 20px 8px;
`;

export const Input = styled(BaseInput)``;

export const XLabel = styled(Text).attrs({
  size: 'H4',
})`
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
`;

export const ResultContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 8,
  },
})`
  flex: 1;
  margin: 0px 16px;
`;

export const ResultDescription = styled(Text).attrs({
  size: 'H3',
})`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 32px;
  text-align: center;
`;

export const AnswerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

type ResultProps = {
  isBigger: boolean;
};

export const Result = styled(Text).attrs<ResultProps>(({isBigger}) => ({
  type: 'Title',
  size: isBigger ? 52 : 72,
}))`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 32px;
`;

export const CopyButton = styled(Button)``;
