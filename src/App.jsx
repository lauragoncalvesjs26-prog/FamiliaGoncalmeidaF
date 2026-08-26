import React from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";


// ===============
// familias
import Laura from './componentes/corpo/home/familia/laura/laura';
import Amanda from './componentes/corpo/home/familia/amanda/amanda';
import Nestor from './componentes/corpo/home/familia/nestor/nestor';
import Cida from './componentes/corpo/home/familia/cida/cida';
import Daniel from './componentes/corpo/home/familia/daniel/daniel';
import Kiba from './componentes/corpo/home/familia/kiba/kiba';
import Hector from './componentes/corpo/home/familia/hector/hector';
import Katlen from './componentes/corpo/home/familia/katlen/katlen';
import Megan from './componentes/corpo/home/familia/megan/megan';
import Ingrid from './componentes/corpo/home/familia/ingrid/ingrid';
//==================

//==========================
// areas
import Home from './componentes/corpo/home/home';
import Ex from './ex';
import Login from './componentes/corpo/home/login';
import Cadastro from './componentes/corpo/home/cadastro';
import Painel from '../painel/painel';
import Sobre from '../sobre/sobre';
//==========================

export default function App() {



  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/sobre"
          element={<Sobre />}
        />
        
        <Route
          path="/painel"
          element={<Painel />}
        />

          <Route
          path="/login"
          element={<Login />}
        />
          <Route
          path="/katlen"
          element={<Katlen />}
        />
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />
          <Route
          path="/ex"
          element={<Ex />}
        />
          <Route
          path="/nestor"
          element={<Nestor />}
        />

        <Route
          path="/cida"
          element={<Cida />}
        />

        <Route
          path="/laura"
          element={<Laura />}
        />

        <Route
          path="/amanda"
          element={<Amanda />}
        />

        <Route
          path="/daniel"
          element={<Daniel />}
        />

        <Route
          path="/hector"
          element={<Hector />}
        />

        <Route
          path="/kiba"
          element={<Kiba />}
        />

        <Route
          path="/megan"
          element={<Megan />}
        />

        <Route
          path="/ingrid"
          element={<Ingrid />}
        />

        <Route
          path="/"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  )
}