import React from "react";

import * as S from "./styles";

enum TextSizes {
  "H1" = 26,
  "H2" = 24,
  "H3" = 22,
  "H4" = 20,
  "H5" = 18,
  "H6" = 16,
  "H7" = 14,
  "H8" = 12,
}

enum TextWeight {
  "Regular" = 400,
  "Medium" = 500,
  "Bold" = 700,
}

type TextTypes = "Title" | "Subtitle" | "Normal";

const TextTypesProps: Record<TextTypes, S.CustomTextProps> = {
  Title: {
    size: TextSizes.H5,
    fontWeight: TextWeight.Bold,
  },
  Subtitle: {
    size: TextSizes.H7,
    fontWeight: TextWeight.Regular,
  },
  Normal: {
    size: TextSizes.H7,
    fontWeight: TextWeight.Medium,
  },
};

type TextProps = {
  type?: TextTypes;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({ type = "Normal", children }) => {
  return <S.CustomText {...TextTypesProps[type]}>{children}</S.CustomText>;
};

export default Text;
