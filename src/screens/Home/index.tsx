import React, {useRef, useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {BannerAds, Screen, Button} from '@/components';
import * as S from './styles';
import {useOrientation} from '@/hooks/useScreenOrientation';
import Clipboard from '@react-native-clipboard/clipboard';

export type FormInputs = {
  value1: string;
  greatness1: string;
  value2: string;
};

export enum InputKeys {
  VALUE1 = 'value1',
  GREATNESS1 = 'greatness1',
  VALUE2 = 'value2',
}

const Home: React.FC = () => {
  const [result, setResult] = useState<number>();
  const {isPortrait} = useOrientation();
  const inputValue1 = useRef<TextInput>();
  const inputGreatness1 = useRef<TextInput>();
  const inputValue2 = useRef<TextInput>();
  const {control, handleSubmit, reset} = useForm<FormInputs>({
    resolver: yupResolver(
      yup.object().shape({
        [InputKeys.VALUE1]: yup.string().required('Digite um valor'),
        [InputKeys.GREATNESS1]: yup.string().required('Digite um valor'),
        [InputKeys.VALUE2]: yup.string().required('Digite um valor'),
      }),
    ),
  });

  const handleCalc = (values: Record<InputKeys, string>) => {
    const v1 = parseFloat(values.value1);
    const v2 = parseFloat(values.greatness1);
    const v3 = parseFloat(values.value2);
    const _result = (v2 * v3) / v1;

    setResult(_result);
  };

  const handleClear = () => {
    reset();
    setResult(undefined);
    inputValue1.current.focus();
  };

  const formatResult = () => {
    return String(parseFloat(result.toFixed(4))).replace('.', ',');
  };

  const handleCopy = () => {
    Clipboard.setString(formatResult());
    ToastAndroid.show('Resultado copiado!', ToastAndroid.SHORT);
  };

  const renderValue1Input = () => {
    return (
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <S.Input
            ref={inputValue1}
            value={value}
            onChangeText={onChange}
            placeholder="Valor 1"
            onBlur={onBlur}
            message={error?.message}
            status={!!error && 'error'}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => inputGreatness1.current.focus()}
            selectTextOnFocus
          />
        )}
        name={InputKeys.VALUE1}
      />
    );
  };

  const renderGreatness1Input = () => {
    return (
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <S.Input
            ref={inputGreatness1}
            value={value}
            onChangeText={onChange}
            placeholder="Valor 2"
            onBlur={onBlur}
            message={error?.message}
            status={!!error && 'error'}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => inputValue2.current.focus()}
            selectTextOnFocus
          />
        )}
        name={InputKeys.GREATNESS1}
      />
    );
  };

  const renderValue2Input = () => {
    return (
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <S.Input
            ref={inputValue2}
            value={value}
            onChangeText={onChange}
            placeholder="Valor 3"
            onBlur={onBlur}
            message={error?.message}
            status={!!error && 'error'}
            keyboardType="numeric"
            onSubmitEditing={() => handleSubmit(handleCalc)()}
            selectTextOnFocus
          />
        )}
        name={InputKeys.VALUE2}
      />
    );
  };

  const renderResult = () => {
    if (result === undefined) return;

    return (
      <>
        <S.Result selectable onPress={handleCopy}>
          {formatResult()}
        </S.Result>
        <S.CopyButton text="Copiar" onPress={handleCopy} />
      </>
    );
  };

  return (
    <Screen>
      <S.BackgroundImage />
      <BannerAds />
      <S.Container isPortrait={isPortrait}>
        <S.CardContainer isPortrait={isPortrait}>
          <S.Card>
            <S.Row>
              {renderValue1Input()}
              <S.ArrowIcon />
              {renderGreatness1Input()}
            </S.Row>
            <S.Row>
              {renderValue2Input()}
              <S.ArrowIcon />
              <S.XLabel>X</S.XLabel>
            </S.Row>
            <Button
              onPress={() => handleSubmit(handleCalc)()}
              text="Calcular"
            />
            <Button
              onPress={handleClear}
              text="Limpar"
              appearanceStyle="ghost"
            />
          </S.Card>
        </S.CardContainer>
        <S.ResultContainer>{renderResult()}</S.ResultContainer>
      </S.Container>
    </Screen>
  );
};

export default Home;
