import React, {useCallback, useRef, useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {BannerAds, Screen, Button} from '@/components';
import * as S from './styles';
import {useOrientation} from '@/hooks/useScreenOrientation';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';
import RNLanguageDetector from '@/utils/languageDetector';

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
  const {t} = useTranslation();
  const [result, setResult] = useState<number>();
  const [values, setValues] = useState<{
    value1: number;
    greatness1: number;
    value2: number;
  }>();
  const {isPortrait} = useOrientation();
  const inputValue1 = useRef<TextInput>();
  const inputGreatness1 = useRef<TextInput>();
  const inputValue2 = useRef<TextInput>();
  const {control, handleSubmit, reset} = useForm<FormInputs>({
    resolver: yupResolver(
      yup.object().shape({
        [InputKeys.VALUE1]: yup.string().required(t('form.typeValue')),
        [InputKeys.GREATNESS1]: yup.string().required(t('form.typeValue')),
        [InputKeys.VALUE2]: yup.string().required(t('form.typeValue')),
      }),
    ),
  });

  const handleCalc = (values: Record<InputKeys, string>) => {
    const v1 = parseFloat(values.value1);
    const v2 = parseFloat(values.greatness1);
    const v3 = parseFloat(values.value2);
    const _result = (v2 * v3) / v1;

    setValues({
      value1: v1,
      greatness1: v2,
      value2: v3,
    });

    setResult(_result);
  };

  const handleClear = () => {
    reset();
    setResult(undefined);
    inputValue1.current.focus();
  };

  const formatResult = useCallback((): string => {
    if (!result) return '';

    const numResult = parseFloat(result.toFixed(2));
    if (RNLanguageDetector.detect() === 'pt') {
      return String(numResult).replace('.', ',');
    }
    return String(numResult);
  }, [result]);

  const handleCopy = () => {
    Clipboard.setString(formatResult());
    ToastAndroid.show(t('copied'), ToastAndroid.SHORT);
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
            placeholder={t('form.if')}
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
            placeholder={t('form.equals')}
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
            placeholder={t('form.then')}
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
        <S.ResultDescription>
          {t('resultDescription', {
            if: values?.value1,
            equals: values?.greatness1,
            then: values?.value2,
          })}
        </S.ResultDescription>
        <S.AnswerContainer>
          <S.Result
            selectable
            onPress={handleCopy}
            isBigger={formatResult().length > 9}>
            {formatResult()}
          </S.Result>
          <S.CopyButton text={t('copy')} onPress={handleCopy} />
        </S.AnswerContainer>
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
              <S.XLabel>{t('form.x')}</S.XLabel>
            </S.Row>
            <Button
              onPress={() => handleSubmit(handleCalc)()}
              text={t('form.calc')}
            />
            <Button
              onPress={handleClear}
              text={t('form.clean')}
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
