# 🎯 TaskFlow - Sistema de Gerenciamento de Tarefas

<div align="center">
  <img src="https://img.shields.io/badge/Java-17+-blue" alt="Java">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5+-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/TailwindCSS-3.3-06B6D4" alt="TailwindCSS">
</div>

## 📋 Sobre o Projeto

TaskFlow é um sistema moderno e completo de gerenciamento de tarefas, desenvolvido com tecnologias de ponta para oferecer uma experiência excepcional de produtividade e organização.

### ✨ Características Principais

- 🔐 **Sistema de Autenticação JWT** - Login seguro e persistente
- 📝 **CRUD Completo de Tarefas** - Criar, editar, excluir e organizar
- 📊 **Dashboard Inteligente** - Métricas e estatísticas em tempo real  
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS
- 🔍 **Busca e Filtros** - Encontre rapidamente suas tarefas
- 📈 **Relatórios Detalhados** - Acompanhe sua produtividade
- ⚡ **Performance Otimizada** - Carregamento rápido e fluido

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17+** - Linguagem principal
- **Spring Boot 3.2** - Framework web
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Persistência de dados
- **PostgreSQL 15** - Banco de dados
- **Docker** - Containerização
- **JWT** - Autenticação stateless
- **Hibernate** - ORM

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones modernos
- **React Hot Toast** - Notificações
- **Axios** - Cliente HTTP
- **Date-fns** - Manipulação de datas

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clonando o Repositório

git clone https://github.com/SEU_USERNAME/taskflow-fullstack.git
cd taskflow-fullstack

### 2. Configurando o Backend

Navegar para o backend

cd backend
Subir PostgreSQL com Docker

docker run --name taskflow-postgres
-e POSTGRES_DB=taskflow_db
-e POSTGRES_USER=taskflow_user
-e POSTGRES_PASSWORD=taskflow_pass
-p 5432:5432
-d postgres:15-alpine
Executar aplicação Spring Boot

./mvnw spring-boot:run


### 3. Configurando o Frontend

Em outro terminal, navegar para o frontend

cd frontend
Instalar dependências

npm install
Configurar variáveis de ambiente

cp .env.example .env.local
Editar .env.local com suas configurações
Executar aplicação Next.js

npm run dev


### 4. Acessando a Aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Banco de Dados:** localhost:5432

## 📱 Funcionalidades

### 🔐 Autenticação
- [x] Registro de usuário
- [x] Login com JWT
- [x] Logout seguro
- [x] Persistência de sessão

### 📝 Gerenciamento de Tarefas
- [x] Criar tarefas com título, descrição e prioridade
- [x] Editar tarefas existentes
- [x] Alterar status (Pendente, Em Progresso, Concluída)
- [x] Excluir tarefas
- [x] Marcar como concluída rapidamente
- [x] Sistema de prioridades (Alta, Média, Baixa)

### 🔍 Busca e Organização
- [x] Busca por título e descrição
- [x] Filtros por status
- [x] Ordenação por data e prioridade
- [x] Indicadores visuais de tarefas atrasadas

### 📊 Dashboard e Estatísticas
- [x] Visão geral de tarefas
- [x] Gráficos de produtividade
- [x] Taxa de conclusão
- [x] Métricas detalhadas
- [x] Histórico de atividades

### ⚙️ Configurações
- [x] Edição de perfil
- [x] Configurações de notificação
- [x] Preferências da conta



## 🧪 Testando a API

### Registro de Usuário

curl -X POST http://localhost:8080/api/auth/register
-H "Content-Type: application/json"
-d '{
"name": "Seu Nome",
"email": "seu@email.com",
"password": "123456"
}'



### Login

curl -X POST http://localhost:8080/api/auth/login
-H "Content-Type: application/json"
-d '{
"email": "seu@email.com",
"password": "123456"
}'



### Criar Tarefa

curl -X POST http://localhost:8080/api/tasks
-H "Content-Type: application/json"
-H "Authorization: Bearer SEU_TOKEN"
-d '{
"title": "Minha Tarefa",
"description": "Descrição da tarefa",
"priority": "HIGH",
"status": "PENDING"
}'



## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Autor

**Victor Augusto Ferreira dos Santos**


## 🎯 Próximas Funcionalidades

- [ ] Notificações em tempo real
- [ ] Tema escuro
- [ ] Calendário integrado
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Upload de avatar
- [ ] Alteração de senha
- [ ] Animações e transições
- [ ] PWA (Progressive Web App)
- [ ] Colaboração em equipe

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
</div>
