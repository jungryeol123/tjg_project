import ProductList from 'features/catalog/ProductList/ProductList';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<ProductList/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
