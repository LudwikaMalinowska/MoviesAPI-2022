
import './App.css';
import axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
import ProductList from './components/ProductList';

function App() {
  return (
    <ConfirmProvider>
    <div className="App">
        
      <ProductList/>
    </div>
    </ConfirmProvider>
  );
}

export default App;