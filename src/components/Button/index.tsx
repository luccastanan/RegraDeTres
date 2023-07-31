import React from "react";

import * as S from "./styles";

type ButtonProps = {
  text?: string;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text = {},
  onPress = () => undefined,
}) => {
  return (
    <S.PressContainer onPress={onPress}>
      <S.Container>
        <S.Label>{text.toString()}</S.Label>
      </S.Container>
    </S.PressContainer>
  );
};

export default Button;
