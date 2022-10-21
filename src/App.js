import React from 'react';
import './App.css';
import ProviderTable from './context/ProviderTable';
import Table from './pages/Table';

function App() {
  return (
    <ProviderTable>
      <h1 className="title">Star Wars</h1>
      <Table />
    </ProviderTable>
  );
}

export default App;
