import React, { useEffect, useState } from "react";

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// API
import { API_URL } from "./api";

// FAMÍLIA
import Laura from "./componentes/corpo/home/familia/laura/laura";
import Amanda from "./componentes/corpo/home/familia/amanda/amanda";
import Nestor from "./componentes/corpo/home/familia/nestor/nestor";
import Cida from "./componentes/corpo/home/familia/cida/cida";
import Daniel from "./componentes/corpo/home/familia/daniel/daniel";
import Kiba from "./componentes/corpo/home/familia/kiba/kiba";
import Hector from "./componentes/corpo/home/familia/hector/hector";
import Katlen from "./componentes/corpo/home/familia/katlen/katlen";
import Megan from "./componentes/corpo/home/familia/megan/megan";
import Ingrid from "./componentes/corpo/home/familia/ingrid/ingrid";
import Marcus from "./componentes/corpo/home/familia/marcus/marcus";

// ÁREAS
import Home from "./componentes/corpo/home/home";
import Ex from "./ex";
import Login from "./componentes/corpo/home/login";
import Cadastro from "./componentes/corpo/home/cadastro";
import Painel from "../painel/painel";
import Sobre from "../sobre/sobre";
import TesteApi8888 from "./componentes/corpo/home/erros";


// =========================================================
// RASTREAMENTO DE ROTAS
// =========================================================

function RastrearNavegacao() {
  const location = useLocation();

  useEffect(() => {
    const rastrear = async () => {
      try {
        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/rastreio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            caminho: location.pathname,
          }),
          keepalive: true,
        });
      } catch (erro) {
        console.error("Erro ao registrar rastreio:", erro);
      }
    };

    rastrear();
  }, [location.pathname]);

  return null;
}


// =========================================================
// ROTA PROTEGIDA DO DANIEL
// =========================================================

function RotaDaniel() {
  const [verificando, setVerificando] = useState(true);
  const [podeVerDaniel, setPodeVerDaniel] = useState(false);

  useEffect(() => {
    const verificarPermissao = async () => {
      const logado = localStorage.getItem("logado");
      const token = localStorage.getItem("token");

      if (logado !== "true" || !token) {
        setPodeVerDaniel(false);
        setVerificando(false);
        return;
      }

      try {
        const resposta = await fetch(
          `${API_URL}/eu/permissoes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (resposta.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("logado");

          setPodeVerDaniel(false);
          setVerificando(false);
          return;
        }

        if (!resposta.ok) {
          throw new Error(
            `Erro na API de permissões: ${resposta.status}`
          );
        }

        const dados = await resposta.json();

        setPodeVerDaniel(
          dados.pode_ver_daniel === true
        );

      } catch (erro) {
        console.error(
          "Erro ao verificar permissão do Daniel:",
          erro
        );

        setPodeVerDaniel(false);

      } finally {
        setVerificando(false);
      }
    };

    verificarPermissao();
  }, []);

  if (verificando) {
    return null;
  }

  if (!podeVerDaniel) {
    return <Navigate to="/" replace />;
  }

  return <Daniel />;
}


// =========================================================

// =========================================================

export default function App() {
  return (
    <BrowserRouter>

      {/* RASTREIA TODAS AS ROTAS */}
      <RastrearNavegacao />

      <Routes>

        <Route
          path="/test"
          element={<TesteApi8888 />}
        />

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
          path="/marcus"
          element={<Marcus />}
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
          element={<RotaDaniel />}
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
  );
}