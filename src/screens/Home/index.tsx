import React, {useRef, useState} from 'react';
import {Screen, Button} from '@/components';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import * as S from './styles';
import {TextInput} from 'react-native';
import analytics from '@react-native-firebase/analytics';

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
  const [result, setResult] = useState(0);
  const inputValue1 = useRef<TextInput>();
  const inputGreatness1 = useRef<TextInput>();
  const inputValue2 = useRef<TextInput>();
  const {control, handleSubmit} = useForm<FormInputs>({
    resolver: yupResolver(
      yup.object().shape({
        [InputKeys.VALUE1]: yup.string().required('Digite um valor'),
        [InputKeys.GREATNESS1]: yup.string().required('Digite um valor'),
        [InputKeys.VALUE2]: yup.string().required('Digite um valor'),
      }),
    ),
  });

  const calc = (values: Record<InputKeys, string>) => {
    console.log(values);

    const v1 = parseFloat(values.value1);
    const v2 = parseFloat(values.greatness1);
    const v3 = parseFloat(values.value2);
    const _result = (v2 * v3) / v1;
    analytics().logEvent('calc', {
      result: _result,
    });
    setResult(_result);
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
            onSubmitEditing={() => handleSubmit(calc)()}
            selectTextOnFocus
          />
        )}
        name={InputKeys.VALUE2}
      />
    );
  };

  return (
    <Screen>
      <S.BackgroundImage />
      <S.Container>
        <S.CardContainer>
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
          <Button onPress={() => handleSubmit(calc)()} text="Calcular" />
        </S.CardContainer>
        <S.ResultContainer>
          <S.Result>{result}</S.Result>
        </S.ResultContainer>
      </S.Container>
    </Screen>
  );
};

export default Home;
