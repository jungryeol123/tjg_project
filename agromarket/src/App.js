// import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';
import Home from 'pages/Home';
import { Delivery } from 'pages/Delivery';
function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="/delivery" element={<Delivery/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
