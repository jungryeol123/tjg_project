import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';
import Home from 'pages/Home';
function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
