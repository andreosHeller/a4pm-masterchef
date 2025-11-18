a4pm-masterchef

Repositório com API (NestJS + MySQL + Sequelize) e Web (Vue 2 + Vuetify + Tailwind).
Esta versão é preparada para subir tudo com Docker Compose (MySQL, Adminer, API e Web/Nginx).

1) Pré-requisitos

Docker Desktop (ou Docker + Docker Compose)

(Windows) WSL2 recomendado para melhor performance

2) Clonar o projeto

git clone <URL_DO_REPOSITORIO> a4pm-masterchef
cd a4pm-masterchef

3) Subir o stack com Docker

docker compose up -d --build

Endereços

Web (SPA): http://localhost:8081
API (Swagger): http://localhost:3000/docs
Adminer: http://localhost:8080