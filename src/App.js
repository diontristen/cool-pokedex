import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom"
import {
  ChakraProvider,
  ColorModeProvider,
} from '@chakra-ui/react';
import customTheme from './styles/theme'
import Banner from './components/Banner'
import NavBar from './components/Navbar'
import { GlobalStyle } from './styles/Global'
import Pokedex from './pages/Pokedex'



function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true
        }}
      >
        <Router>
          <GlobalStyle>
          <Banner/>
            <NavBar />
            <Route path="/" exact component={Pokedex} />
          </GlobalStyle>
        </Router>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
