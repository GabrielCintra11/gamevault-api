const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS - permite acesso do frontend na Vercel
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Dados em memória - Catálogo de Jogos
let jogos = [
  {
    id: 1,
    nome: "The Legend of Zelda: Tears of the Kingdom",
    genero: "Aventura / RPG",
    plataforma: "Nintendo Switch",
    nota: 9.7,
    ano: 2023,
    descricao: "Explore o vasto mundo de Hyrule em uma aventura épica.",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/5/54/The_Legend_of_Zelda_Tears_of_the_Kingdom_capa.png"
  },
  {
    id: 2,
    nome: "God of War: Ragnarök",
    genero: "Ação / Aventura",
    plataforma: "PlayStation 5",
    nota: 9.5,
    ano: 2022,
    descricao: "Kratos e Atreus enfrentam o Ragnarök nórdico.",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/e/ee/God_of_War_Ragnar%C3%B6k_capa.png"
  },
  {
    id: 3,
    nome: "Elden Ring",
    genero: "RPG / Ação",
    plataforma: "PC / PS5 / Xbox",
    nota: 9.8,
    ano: 2022,
    descricao: "Um mundo aberto sombrio criado por Miyazaki e George R.R. Martin.",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/1/16/Elden_Ring_capa.jpeg"
  },
  {
    id: 4,
    nome: "Hollow Knight",
    genero: "Metroidvania",
    plataforma: "PC / Switch / PS4",
    nota: 9.3,
    ano: 2017,
    descricao: "Explore um vasto reino subterrâneo de insetos e heróis.",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/3/3b/Hollow_Knight_capa.png"
  },
  {
    id: 5,
    nome: "Red Dead Redemption 2",
    genero: "Ação / Aventura",
    plataforma: "PC / PS4 / Xbox",
    nota: 9.6,
    ano: 2018,
    descricao: "Uma história épica sobre o fim da era dos fora-da-lei.",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/e/e7/Rdr2-cover.jpg"
  },
  {
    id: 6,
    nome: "Celeste",
    genero: "Plataforma",
    plataforma: "PC / Switch / PS4",
    nota: 9.1,
    ano: 2018,
    descricao: "Ajude Madeline a escalar a Montanha Celeste nesta aventura desafiadora.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Celeste_box_art_full.png"
  }
];

// Rota raiz - Health check
app.get("/", (req, res) => {
  res.json({
    status: "🎮 GameVault API rodando com sucesso!",
    versao: "1.0.1",
    autor: "Gabriel",
    totalJogos: jogos.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /jogos - Listar todos os jogos
app.get("/jogos", (req, res) => {
  res.json({
    total: jogos.length,
    jogos: jogos,
  });
});

// GET /jogos/:id - Buscar jogo por ID
app.get("/jogos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = jogos.find((j) => j.id === id);

  if (!jogo) {
    return res.status(404).json({ erro: "Jogo não encontrado" });
  }

  res.json(jogo);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎮 GameVault API rodando na porta ${PORT}`);
});
