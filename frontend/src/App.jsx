import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import Header from '../components/Header';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

export default App;
