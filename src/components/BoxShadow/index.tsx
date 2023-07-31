import React from "react";
import { View, StyleSheet, ViewProps, StyleProp } from "react-native";

export type BoxShadowProps = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewProps>;
};

const BoxShadow: React.FC<BoxShadowProps> = ({
  children,
  containerStyle = {},
}) => {
  return (
    <View style={[boxShadowStyles.container, containerStyle]}>{children}</View>
  );
};

export const boxShadowStyles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: "#fff",
  },
});

export default BoxShadow;
