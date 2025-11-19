# a4pm-masterchef

Repositório com **API** (NestJS + MySQL + Sequelize) e **Web** (Vue 2 + Vuetify + Tailwind).  
Esta versão é preparada para subir tudo com **Docker Compose** (MySQL, Adminer, API e Web/Nginx).

---

## 1) Pré-requisitos

- Docker Desktop (ou Docker + Docker Compose)
- **(Windows)** WSL2 recomendado para melhor performance
- Node 20+

---

## 2) Clonar o projeto

```bash
git clone https://github.com/andreosHeller/a4pm-masterchef.git
cd a4pm-masterchef
```

## 3) Subir o stack com Docker

```bash
docker compose up -d --build
```

## URL's -->

- Web (SPA): http://localhost:8081
- API (Swagger): http://localhost:3000/docs
