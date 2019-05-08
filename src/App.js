import React from 'react';
import './App.css';
import ComponentA from './Containers/ComponentA';
import ComponentB from './Containers/ComponentB';
import ComponentC from './Containers/ComponentC';
import UsersData from './Data.json'

function App() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <ComponentA data={UsersData} />
        <ComponentB data={UsersData} />
        <ComponentC data={UsersData} />
      </div>
      <br />
    </div>
  );
}

export default App;
