import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components/native";
import Text from "@/components/Text";

export const PressContainer = styled(TouchableNativeFeedback)``;

export const Container = styled.View`
  padding: 8px 16px;
  align-items: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.ACCENT_COLOR};
`;

export const Label = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.TEXT_SECONDARY_COLOR,
}))``;
