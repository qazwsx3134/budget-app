// linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



export const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      padding: 0,
      backgroundColor: '#fd868c',
      '&:hover': {
        backgroundColor: '#b15d62',
      },
    },
  }))(Button);
  
export const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    height: 3000,
  }));
  

export const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#fd9ea3',
        main: '#fd868c',
        dark: '#b15d62',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f381a7',
        main: '#f06292',
        dark: '#a84466',
        contrastText: '#fff',
      },
    },
  });
