import styled from "styled-components/native";

export type CustomTextProps = {
  size: number;
  fontWeight: number;
};

export const CustomText = styled.Text<CustomTextProps>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.fontWeight};
  color: #000;
`;
