
import './App.css';
import axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
import {BrowserRouter as Router} from 'react-router-dom';

import ProductList from './components/ProductList';
import Page from './components/Page.js';

function App() {
  return (
    
    <ConfirmProvider>
    <Router>
    <div className="App">
        
        {/* <ProductList/> */}
        <Page/>
      </div>
    </Router>
    
    </ConfirmProvider>
  );
}

export default App;