import { extendTheme } from "@chakra-ui/react";

// Theme configuration
const config = {
  initialColorMode: "dark", // Set default color mode to dark
  useSystemColorMode: false, // Disable syncing with system color mode
};

// Extend the theme with the configuration
const theme = extendTheme({ config });

export default theme;
