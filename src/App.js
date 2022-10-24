import React from 'react';
import './App.css';
import ProviderTable from './context/ProviderTable';
import Table from './pages/Table';
import logo from './img/mylogoStarWars.png';

function App() {
  return (
    <ProviderTable>
      <img
        src={ logo }
        className="logo-image"
        alt="logo Star Wars"
      />
      <Table />
    </ProviderTable>
  );
}

export default App;
