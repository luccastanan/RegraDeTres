import React from "react";
import * as LibIcons from "phosphor-react-native";
import { IconProps as LibIconProps } from "phosphor-react-native";

type IconProps = {
  name: keyof typeof LibIcons;
} & LibIconProps;

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const BaseIcon = LibIcons[name];

  return <BaseIcon {...props} />;
};

export default Icon;
