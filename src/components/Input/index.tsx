import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

import * as S from './styles';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';

type InputProps = {
  message?: string;
  status?: 'error' | 'default';
} & TextInputProps;

const Input: React.ForwardedRef<InputProps> = React.forwardRef(
  (
    {
      message = '',
      status = 'default',
      onBlur,
      onFocus,
      placeholder,
      value,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const isFocused = useSharedValue(false);
    const inputValue = useSharedValue('');
    const inputStyle = useAnimatedStyle(() => {
      const fontSize = withTiming(!!value ? 14 : 20);
      const top = withTiming(!!value ? -10 : 8);
      const color = withTiming(
        !!value
          ? theme.colors.PRIMARY_COLOR
          : theme.colors.TEXT_SECONDARY_COLOR,
      );
      return {fontSize, top, color};
    });

    const handleFocus = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      isFocused.value = true;
      onFocus?.(event);
    };

    const handleBlur = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      isFocused.value = false;
      onBlur?.(event);
    };

    const renderMessage = () => {
      if (!message && status !== 'error') return null;

      return <S.ErrorMessage>{message}</S.ErrorMessage>;
    };

    return (
      <S.Container>
        <View style={{marginTop: 4}}>
          <S.StyledInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            {...props}
            ref={ref}
          />
          <S.PlaceholderContainer>
            <S.Placeholder style={inputStyle}>{placeholder}</S.Placeholder>
          </S.PlaceholderContainer>
        </View>
        <S.ErrorContainer>{renderMessage()}</S.ErrorContainer>
      </S.Container>
    );
  },
);

export default Input;
