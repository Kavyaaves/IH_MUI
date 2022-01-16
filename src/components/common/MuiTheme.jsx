import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
let theme = createTheme();
theme = responsiveFontSizes(theme);
theme = createTheme({
    palette: {
        // mode: 'dark',
        primary: {
            main: "#36454F",
        },
        secondary: {
            main: "#ffffff"
        }
    },

});

export default theme