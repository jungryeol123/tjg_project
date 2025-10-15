import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';
import Home1 from 'pages/Home';
import ProductList from 'features/catalog/ProductList/ProductList';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home1/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
