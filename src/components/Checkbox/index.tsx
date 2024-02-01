import React from 'react';
import * as S from './styles';

type CheckboxProps = {
  label: string;
  isChecked?: boolean;
  onCheck?: (isChecked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({label, isChecked, onCheck}) => {
  const handlePress = () => {
    onCheck?.(!isChecked);
  };

  return (
    <S.Container onPress={handlePress}>
      <S.Box isChecked={isChecked}>
        <S.CheckIcon />
      </S.Box>
      <S.Label>{label}</S.Label>
    </S.Container>
  );
};

export default Checkbox;
