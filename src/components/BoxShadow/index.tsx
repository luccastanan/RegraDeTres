import React from 'react';
import {View, StyleSheet, ViewProps, StyleProp} from 'react-native';

export type BoxShadowProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewProps>;
};

const BoxShadow: React.FC<BoxShadowProps> = ({children, style = {}}) => {
  return <View style={[boxShadowStyles.container, style]}>{children}</View>;
};

export const boxShadowStyles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: '#fff',
  },
});

export default BoxShadow;
