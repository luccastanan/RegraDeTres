import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import * as S from "./styles";

type ScreenProps = {
  children: React.ReactNode;
};

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <S.Container>{children}</S.Container>
    </SafeAreaView>
  );
};

export default Screen;
