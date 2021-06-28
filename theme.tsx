import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: { error: { light: '#E94948', main: '#B00020', dark: '#790000' } },
  typography: {
    h1: { fontSize: '3.75rem' },
    h2: { fontSize: '3rem' },
    h3: { fontSize: '2.125rem' },
    h4: { fontSize: '1.5rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1.2rem' },
  },
});

export default theme;
