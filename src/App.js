import {HashRouter as Router, Route} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import Main from './Pages/Main';
import Search from './Pages/Search';
import Anime from './Pages/Anime';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import ToolBar from '@material-ui/core/Toolbar';

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
        <Header />
        <SideBar />
        <ToolBar />
        <div style={{ marginLeft: '230px' }}>
          <Route exact path="/" component={Main} />
          <Route exact path="/search" component={Search} />
          <Route path="/anime/:id" component={Anime} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}