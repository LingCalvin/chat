import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export function createTheme(options: ThemeOptions): Theme {
  // Need to construct a base theme to use Theme.palette.augmentColor()
  const theme = createMuiTheme({
    ...options,
    palette: {
      accept: { main: green[600] },
      decline: { main: red[500] },
      ...options.palette,
    },
  });

  // Return the theme with the appropriate colors for accept and decline set
  return createMuiTheme({
    ...options,
    palette: {
      ...options.palette,
      accept: {
        ...theme.palette.augmentColor(theme.palette.accept),
        ...theme.palette.accept,
      },
      decline: {
        ...theme.palette.augmentColor(theme.palette.decline),
        ...theme.palette.decline,
      },
    },
  });
}
