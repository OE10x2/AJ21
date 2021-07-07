import { HashRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';
import Main from './Pages/Main';
import Search from './Pages/Search';
import AJ from './Pages/AJ';
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
      <EasybaseProvider ebconfig={ebconfig}>
        <HashRouter basename='/'>
          <Header />
          <SideBar />
          <ToolBar />
          <div style={{ marginLeft: '230px' }}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/search" component={Search} />
              <Route path="/anime/:id" component={Anime} />
              <Route path="/test" component={AJ} />
            </Switch>
          </div>
        </HashRouter>
      </EasybaseProvider>
    </MuiThemeProvider>
  );
}