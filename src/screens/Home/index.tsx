import React, {useCallback, useRef, useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {BannerAds, Screen, Button, Checkbox} from '@/components';
import * as S from './styles';
import {useOrientation} from '@/hooks/useScreenOrientation';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';
import RNLanguageDetector from '@/utils/languageDetector';

export type FormInputs = {
  value1: string;
  greatness1: string;
  value2: string;
  inversely: boolean;
};

export enum InputKeys {
  VALUE1 = 'value1',
  GREATNESS1 = 'greatness1',
  VALUE2 = 'value2',
  INVERSELY = 'inversely',
}

const Home: React.FC = () => {
  const {t} = useTranslation();
  const [result, setResult] = useState<number>();
  const {isPortrait} = useOrientation();
  const inputValue1 = useRef<TextInput>();
  const inputGreatness1 = useRef<TextInput>();
  const inputValue2 = useRef<TextInput>();
  const {control, handleSubmit, reset, getValues} = useForm<FormInputs>({
    defaultValues: {
      value1: '',
      greatness1: '',
      value2: '',
      inversely: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        [InputKeys.VALUE1]: yup
          .number()
          .typeError(t('form.messages.typeValue'))
          .required(t('form.messages.enterValue')),
        [InputKeys.GREATNESS1]: yup
          .number()
          .typeError(t('form.messages.typeValue'))
          .required(t('form.messages.enterValue')),
        [InputKeys.VALUE2]: yup
          .number()
          .typeError(t('form.messages.typeValue'))
          .required(t('form.messages.enterValue')),
        [InputKeys.INVERSELY]: yup.boolean().notRequired(),
      }),
    ),
  });

  const handleCalc = (values: Record<InputKeys, string>) => {
    const v1 = parseFloat(values.value1);
    const g1 = parseFloat(values.greatness1);
    const v2 = parseFloat(values.value2);

    let _result;
    if (values.inversely) {
      _result = (g1 * v1) / v2;
    } else {
      _result = (g1 * v2) / v1;
    }

    setResult(_result);
  };

  const handleClear = () => {
    reset({
      inversely: getValues().inversely,
    });
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

  const renderInverselyCheck = () => {
    return (
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Checkbox
            label={t('form.inversely')}
            isChecked={value}
            onCheck={onChange}
          />
        )}
        name={InputKeys.INVERSELY}
      />
    );
  };

  const renderResult = () => {
    if (result === undefined) return;

    return (
      <>
        <S.ResultDescription>
          {t('resultDescription', {
            if: getValues(InputKeys.VALUE1),
            equals: getValues(InputKeys.GREATNESS1),
            then: getValues(InputKeys.VALUE2),
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
            {renderInverselyCheck()}
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
      <BannerAds />
    </Screen>
  );
};

export default Home;
