import React from 'react';
import {TextInputProps} from 'react-native';

import * as S from './styles';

type InputProps = {
  message?: string;
  status?: 'error' | 'default';
} & TextInputProps;

const Input: React.ForwardedRef<InputProps> = React.forwardRef(
  ({message = '', status = 'default', ...props}, ref) => {
    const renderMessage = () => {
      if (!message && status !== 'error') return null;

      return <S.ErrorMessage>{message}</S.ErrorMessage>;
    };

    return (
      <S.Container>
        <S.StyledInput {...props} ref={ref} />
        <S.ErrorContainer>{renderMessage()}</S.ErrorContainer>
      </S.Container>
    );
  },
);

export default Input;
