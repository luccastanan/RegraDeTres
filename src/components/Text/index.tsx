import React from "react";

import * as S from "./styles";
import { TextSizes, TextTypes, TextWeight } from "./types";

const TextTypesProps: Record<TextTypes, TextProps> = {
  Title: {
    size: "H5",
    fontWeight: "bold",
    color: "#000",
  },
  Subtitle: {
    size: "H7",
    fontWeight: "regular",
    color: "#000",
  },
  Normal: {
    size: "H7",
    fontWeight: "medium",
    color: "#000",
  },
};

type AllTextProps = {
  type?: TextTypes;
  children: React.ReactNode;
} & TextProps;

type TextProps = {
  size?: keyof typeof TextSizes | number;
  fontWeight?: keyof typeof TextWeight;
  color?: string;
};

const Text: React.FC<AllTextProps> = ({
  children,
  type = "Normal",
  size,
  fontWeight,
  color,
  ...props
}) => {
  const base = TextTypesProps[type];

  const getSize = (): number => {
    if (typeof size === "number") {
      return size;
    }
    if (size) {
      return TextSizes[size];
    }
    return TextSizes[base.size];
  };

  const getFontWeight = (): number => {
    if (fontWeight) {
      return TextWeight[fontWeight];
    }
    return TextWeight[base.fontWeight];
  };

  const getColor = (): string => {
    return color || base.color;
  };

  return (
    <S.CustomText
      size={getSize()}
      fontWeight={getFontWeight()}
      color={getColor()}
      {...props}
    >
      {children}
    </S.CustomText>
  );
};

export default Text;
