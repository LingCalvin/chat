import '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  export interface Palette {
    accept: Palette['primary'];
    decline: Palette['primary'];
  }
  export interface PaletteOptions {
    accept?: PaletteOptions['primary'];
    decline?: PaletteOptions['primary'];
  }
}
