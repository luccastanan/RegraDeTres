import React from 'react';

import * as S from './styles';
import {IStyledComponent} from 'styled-components/native';
import {TextProps} from 'react-native';
import {Substitute} from 'styled-components/native/dist/types';
import {TextTypes} from '../Text/types';

export type AppearanceStyle = 'normal' | 'ghost' | 'outline';

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  appearanceStyle?: AppearanceStyle;
};

const Containers: Record<AppearanceStyle, IStyledComponent<'native'>> = {
  normal: S.NormalContainer,
  ghost: S.GhostContainer,
  outline: S.OutlineContainer,
};

const Labels: Record<
  AppearanceStyle,
  IStyledComponent<
    'native',
    Omit<
      Omit<
        Substitute<
          Omit<
            {
              type?: TextTypes | undefined;
              children: React.ReactNode;
            } & TextProps,
            never
          >,
          Omit<
            {
              type?: TextTypes | undefined;
              children: React.ReactNode;
            } & TextProps,
            never
          >
        >,
        never
      >,
      never
    >
  >
> = {
  normal: S.NormalLabel,
  ghost: S.GhostLabel,
  outline: S.OutlineLabel,
};

const Button: React.FC<ButtonProps> = ({
  text = {},
  onPress = () => undefined,
  appearanceStyle = 'normal',
}) => {
  const Container = Containers[appearanceStyle];
  const Label = Labels[appearanceStyle];

  return (
    <S.PressContainer onPress={onPress}>
      <Container>
        <Label>{text.toString()}</Label>
      </Container>
    </S.PressContainer>
  );
};

export default Button;
