import { forwardRef } from "react";
import { chakra, ImageProps } from "@chakra-ui/react";
import logo from "./teamseas-tm-logo.png";

export const Logo = forwardRef<ImageProps>((props, ref) => {
  return <chakra.img src={logo} ref={ref} {...props} />;
});
