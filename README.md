# 🛍️ FCER - E-Commerce Premium

> Uma aplicação front-end de e-commerce de moda focada em UX/UI de alto padrão, integração com APIs reais e gerenciamento avançado de estados com React.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-success)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

## 📌 Sobre o Projeto
O **FCER** é uma simulação completa de uma loja virtual boutique. O foco principal deste projeto é demonstrar as melhores práticas de arquitetura front-end, consumo de APIs RESTful assíncronas e a criação de uma jornada de compra fluida e segura para o usuário (UX/UI), desde a vitrine até o checkout.

## 🚀 Funcionalidades Implementadas

### 🌐 Vitrine e Navegação
- **Home Page Dinâmica:** Layout responsivo focado na conversão, com destaques estilizados e design premium de alto contraste.
- **Integração com API Externa:** A página "Store" consome dados reais (produtos, imagens e preços) vindos da `Fake Store API`.
- **Filtros e Tratamento de Dados:** Adaptação do JSON da API para exibir apenas roupas, formatando e convertendo preços dinamicamente para Real (BRL).

### 🛒 Carrinho e Gerenciamento de Estado
- **Context API Global:** Uso avançado de Context API (`CartContext` e `AuthContext`) para gerenciar compras e sessão do usuário em toda a aplicação.
- **Persistência de Dados:** Uso do `localStorage` para garantir que o carrinho e o login não sejam perdidos ao recarregar a página.
- **Sincronização de Sessão:** O carrinho é automaticamente esvaziado ao realizar o Logout, evitando armazenamento de dados fantasmas.

### 🔒 Autenticação e UX
- **Modais Inteligentes:** Popups customizados para Login, Logout e visualização rápida do Carrinho sem necessidade de recarregar a página.
- **Proteção de Ações:** Sistema de validação que exige login ativo para permitir a adição de produtos ao carrinho.

### 💳 Checkout
- **Máscaras Dinâmicas (Input Masking):** Formatação automática de CEP, Número do Cartão e Data de Validade via expressões regulares (RegEx).
- **Simulação de Gateway:** Botões com estado dinâmico de `Loading` e temporizadores simulando a verificação de operadoras de crédito.
- **Cálculo em Tempo Real:** Múltiplos métodos de pagamento, incluindo aba Pix com aplicação de 5% de desconto imediato no resumo da compra.

---

## 🛠️ Tecnologias Utilizadas

- **React.js** (Componentização, Hooks: `useState`, `useEffect`, `useContext`)
- **React Router DOM** (Navegação Single Page Application)
- **CSS3** (Estilização pura com foco em Flexbox, Grid e UI Premium)
- **Fake Store API** (Mock de dados e consumo via `fetch`)
- **FontAwesome** (Ícones SVG e badges de segurança)

---
## 💻 Como rodar o projeto localmente

```bash
1. Clone este repositório:
   git clone [https://github.com/andredevdantas/FCRE.git](https://github.com/andredevdantas/FCRE.git)
   
2. Acesse a pasta do projeto:
   cd FCRE
   
3. Instale as dependências:
   npm install
   
4. Inicie o servidor de desenvolvimento:
   npm start

   
A aplicação será aberta automaticamente no seu navegador padrão em http://localhost:3000.
```

## 👨‍💻 Autor
Desenvolvido por André Luis.
