import styled from "styled-components/native";

type CustomTextProps = {
  size: number;
  fontWeight: number;
  color: string;
};

export const CustomText = styled.Text<CustomTextProps>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
