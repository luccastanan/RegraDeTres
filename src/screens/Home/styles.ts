import styled from 'styled-components/native';
import {Input as BaseInput, Text, Icon} from '@/components';
import BoxShadow from '@/components/BoxShadow';

export const Container = styled.View`
  flex: 1;
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

export const CardContainer = styled(BoxShadow).attrs({
  containerStyle: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
})``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const ArrowIcon = styled(Icon).attrs({
  name: 'ArrowRight',
  size: 20,
  color: 'black',
})`
  margin: 0px 8px 20px 8px;
`;

export const Input = styled(BaseInput)``;

export const XLabel = styled(Text)`
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
`;

export const ResultContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Result = styled(Text).attrs({
  type: 'Title',
  size: 70,
})`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 32px;
`;
