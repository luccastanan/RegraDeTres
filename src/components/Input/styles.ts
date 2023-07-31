import { TextInput } from "react-native";
import styled from "styled-components/native";
import Text from "@/components/Text";

export const Container = styled.View`
  height: 52px;
  flex: 1;
`;

export const StyledInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.NEUTRAL_COLOR};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.TEXT_PRIMARY_COLOR};
  border-radius: 16px;
  padding-horizontal: 12px;
  height: 32px;
`;

export const ErrorMessage = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.DANGER_COLOR,
}))``;
