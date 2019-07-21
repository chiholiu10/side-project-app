import React from 'react';
import './App.scss';
import Button from './components/Button';
import Page from './components/Page';
import FooterBar from './components/FooterBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button/>
        <Page />
        <FooterBar/>
      </header>
    </div>
  );
}

export default App;
