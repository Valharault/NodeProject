import React from 'react';
import { Button } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import Login from "./components/Login";

const App = () => (
    <div className="App">
        <Login/>
      <Button type="primary">Button</Button>
    </div>
);

export default App;
