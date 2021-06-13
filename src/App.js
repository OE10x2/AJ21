import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import Main from './Pages/Main';
import Search from './Pages/Search';
import './App.css';

//CHANGE LATER
export const theme = createMuiTheme({
  primary: {
    main: "#05121D",
    light: "#00166A",
    dark: "#0051A5",
    contrastText: "#FFFFFF"
  },
  secondary: {
    main: "#05121D",
    light: "FFBA00",
    dark: "#FFFFFF",
    contrastText: "#FFFFFF"
  }
});

export default function App(){
  return(
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/Search" component={Search} />
      </Router>
    </MuiThemeProvider>
  );
}