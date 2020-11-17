import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#2C3000',
      mainGradient: "linear-gradient(to top,#2C3B72,#2C3000)",
    },
    secondary: {
      main: '#bcd900',
      mainGradient: "linear-gradient(to top,#6eba27,#bcd900)",
    },
    disabled: {
      main: 'rgba(0, 0, 0, 0.54)'
    }
  },
  fonts: {
    small: '0.8rem',
    extraLarge: '4rem'
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    }
  }
});

theme = {
  ...theme,
  overrides: {
    MuiTab: {
      root: {
        [theme.breakpoints.up("xs")]: {
          minWidth: 80
        }
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: theme.fonts.icon
      }
    },
    MuiListItem: {
      gutters: {
        [theme.breakpoints.down("md")]: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    }
  }
}

export default theme;
