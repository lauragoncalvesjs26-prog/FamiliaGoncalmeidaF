import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";
import { API_URL } from "../../../api";

export default function Cadastro() {

  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmar_senha: "",
    gostos: [],
    trabalho: "",
    coisas_favoritas: [],
    data_nascimento: "",
    foto_perfil: "",
    conexao: ""
  });

  const [gostoAtual, setGostoAtual] = useState("");
  const [favoritoAtual, setFavoritoAtual] = useState("");
  const [foto, setFoto] = useState(null);

  // ==========================================
  // PRIMEIRA LETRA MAIÚSCULA
  // RESTANTE MINÚSCULO
  // EM CADA PALAVRA
  // ==========================================

  function formatarNome(valor) {

    return valor
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map(
        palavra =>
          palavra.charAt(0).toUpperCase() + palavra.slice(1)
      )
      .join(" ");
  }

  // ==========================================
  // TELEFONE
  // (11) 99999-9999
  // ==========================================

  function formatarTelefone(valor) {

    let numero = valor.replace(/\D/g, "");

    numero = numero.substring(0, 11);

    if (numero.length <= 2) {
      return `(${numero}`;
    }

    if (numero.length <= 7) {
      return `(${numero.substring(0, 2)}) ${numero.substring(2)}`;
    }

    return `(${numero.substring(0, 2)}) ${numero.substring(2, 7)}-${numero.substring(7)}`;
  }

  // ==========================================
  // ALTERAR INPUT
  // ==========================================

  function alterar(e) {

    const { name, value } = e.target;

    if (name === "nome" || name === "sobrenome") {

      setFormulario({
        ...formulario,
        [name]: formatarNome(value)
      });

      return;
    }

    if (name === "telefone") {

      setFormulario({
        ...formulario,
        telefone: formatarTelefone(value)
      });

      return;
    }

    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  // ==========================================
  // ADICIONAR GOSTO
  // ==========================================

  function adicionarGosto() {

    const valor = gostoAtual.trim();

    if (!valor) {
      return;
    }

    setFormulario({
      ...formulario,
      gostos: [
        ...formulario.gostos,
        valor
      ]
    });

    setGostoAtual("");
  }

  // ==========================================
  // REMOVER GOSTO
  // ==========================================

  function removerGosto(index) {

    setFormulario({
      ...formulario,
      gostos: formulario.gostos.filter(
        (_, i) => i !== index
      )
    });
  }

  // ==========================================
  // ADICIONAR COISA FAVORITA
  // ==========================================

  function adicionarFavorito() {

    const valor = favoritoAtual.trim();

    if (!valor) {
      return;
    }

    setFormulario({
      ...formulario,
      coisas_favoritas: [
        ...formulario.coisas_favoritas,
        valor
      ]
    });

    setFavoritoAtual("");
  }

  // ==========================================
  // REMOVER FAVORITO
  // ==========================================

  function removerFavorito(index) {

    setFormulario({
      ...formulario,
      coisas_favoritas:
        formulario.coisas_favoritas.filter(
          (_, i) => i !== index
        )
    });
  }

  // ==========================================
  // FOTO
  // ==========================================

  function selecionarFoto(e) {

    const arquivo = e.target.files[0];

    if (!arquivo) {
      return;
    }

    setFoto(arquivo);
  }

  // ==========================================
  // CADASTRAR
  // ==========================================

  async function cadastrar(e) {

    e.preventDefault();

    // Senha mínima
    if (formulario.senha.length < 6) {

      alert("A senha precisa ter no mínimo 6 caracteres.");

      return;
    }

    // Senhas iguais
    if (formulario.senha !== formulario.confirmar_senha) {

      alert("As senhas não são iguais.");

      return;
    }

    try {

      let caminhoFoto = "";

      // ======================================
      // ENVIAR FOTO
      // ======================================

      if (foto) {

        const dadosFoto = new FormData();

        dadosFoto.append("foto", foto);

        const respostaFoto = await fetch(
          `${API_URL}/upload-foto`,
          {
            method: "POST",
            body: dadosFoto
          }
        );

        const resultadoFoto = await respostaFoto.json();

        if (!respostaFoto.ok) {

          alert(
            resultadoFoto.detail ||
            "Erro ao enviar a foto."
          );

          return;
        }

        caminhoFoto = resultadoFoto.caminho;
      }

      // ======================================
      // TRANSFORMAR LISTAS EM TEXTO COM ||
      // ======================================

      const dadosCadastro = {

        nome: formulario.nome,

        sobrenome: formulario.sobrenome,

        telefone: formulario.telefone,

        email: formulario.email,

        senha: formulario.senha,

        gostos: formulario.gostos.join("||"),

        trabalho: formulario.trabalho,

        coisas_favoritas:
          formulario.coisas_favoritas.join("||"),

        data_nascimento:
          formulario.data_nascimento,

        foto_perfil:
          caminhoFoto,

        conexao:
          formulario.conexao
      };

      // ======================================
      // ENVIAR CADASTRO
      // ======================================

      const resposta = await fetch(
        `${API_URL}/cadastro`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(dadosCadastro)
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {

        alert(
          dados.detail ||
          "Erro ao realizar cadastro."
        );

        return;
      }

      alert(
        "Cadastro realizado com sucesso!"
      );

      navigate("/login");

    } catch (erro) {

      console.error(erro);

      alert(
        "Erro ao conectar com o servidor."
      );
    }
  }

  return (

    <div className="cadastro">

      <h1>Cadastro</h1>

      <form onSubmit={cadastrar}>

        {/* NOME */}

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formulario.nome}
          onChange={alterar}
          required
        />

        {/* SOBRENOME */}

        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={formulario.sobrenome}
          onChange={alterar}
          required
        />

        {/* TELEFONE */}

        <input
          type="tel"
          name="telefone"
          placeholder="(11) 99999-9999"
          value={formulario.telefone}
          onChange={alterar}
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={alterar}
          required
        />

        {/* SENHA */}

        <input
          type="password"
          name="senha"
          placeholder="Senha — mínimo 6 caracteres"
          value={formulario.senha}
          onChange={alterar}
          minLength={6}
          required
        />

        {/* CONFIRMAR SENHA */}

        <input
          type="password"
          name="confirmar_senha"
          placeholder="Digite a senha novamente"
          value={formulario.confirmar_senha}
          onChange={alterar}
          minLength={6}
          required
        />

        {/* GOSTOS */}

        <div className="campo-lista">

          <label>Gostos</label>

          <div className="campo-adicionar">

            <input
              type="text"
              placeholder="Digite um gosto"
              value={gostoAtual}
              onChange={(e) =>
                setGostoAtual(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  adicionarGosto();
                }
              }}
            />

            <button
              type="button"
              onClick={adicionarGosto}
            >
              +
            </button>

          </div>

          <div className="lista-itens">

            {formulario.gostos.map(
              (gosto, index) => (

                <div
                  className="item"
                  key={index}
                >

                  <span>{gosto}</span>

                  <button
                    type="button"
                    onClick={() =>
                      removerGosto(index)
                    }
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* TRABALHO */}

        <input
          type="text"
          name="trabalho"
          placeholder="Trabalho"
          value={formulario.trabalho}
          onChange={alterar}
        />

        {/* COISAS FAVORITAS */}

        <div className="campo-lista">

          <label>Coisas favoritas</label>

          <div className="campo-adicionar">

            <input
              type="text"
              placeholder="Digite algo favorito"
              value={favoritoAtual}
              onChange={(e) =>
                setFavoritoAtual(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  adicionarFavorito();
                }
              }}
            />

            <button
              type="button"
              onClick={adicionarFavorito}
            >
              +
            </button>

          </div>

          <div className="lista-itens">

            {formulario.coisas_favoritas.map(
              (favorito, index) => (

                <div
                  className="item"
                  key={index}
                >

                  <span>{favorito}</span>

                  <button
                    type="button"
                    onClick={() =>
                      removerFavorito(index)
                    }
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* DATA DE NASCIMENTO */}

        <input
          type="date"
          name="data_nascimento"
          value={formulario.data_nascimento}
          onChange={alterar}
          required
        />

        {/* FOTO */}

        <label>
          Foto de perfil
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={selecionarFoto}
        />

        {foto && (
          <p>
            Foto selecionada: {foto.name}
          </p>
        )}

        {/* CONEXÃO */}

        <label>
          Conexão familiar
        </label>

        <input
          list="familiares"
          name="conexao"
          placeholder="Escolha a conexão"
          value={formulario.conexao}
          onChange={alterar}
        />

        <datalist id="familiares">

          <option value="Mãe" />
          <option value="Pai" />
          <option value="Filho" />
          <option value="Filha" />
          <option value="Irmão" />
          <option value="Irmã" />
          <option value="Avô" />
          <option value="Avó" />
          <option value="Neto" />
          <option value="Neta" />
          <option value="Tio" />
          <option value="Tia" />
          <option value="Sobrinho" />
          <option value="Sobrinha" />
          <option value="Primo" />
          <option value="Prima" />
          <option value="Marido" />
          <option value="Esposa" />
          <option value="Padrasto" />
          <option value="Madrasta" />
          <option value="Enteado" />
          <option value="Enteada" />
          <option value="Cunhado" />
          <option value="Cunhada" />
          <option value="Genro" />
          <option value="Nora" />
          <option value="Bisavô" />
          <option value="Bisavó" />

        </datalist>

        {/* BOTÃO */}

        <button type="submit">
          Cadastrar
        </button>

      </form>

      <button
        type="button"
        onClick={() => navigate("/login")}
      >
        Já tenho uma conta
      </button>

    </div>
  );
}