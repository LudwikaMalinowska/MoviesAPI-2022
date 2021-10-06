//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
        <ProductForm/>
      <ProductList/>
    </div>
  );
}

export default App;