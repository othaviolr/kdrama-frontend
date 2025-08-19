# 📺 KDrama System - Frontend

Sistema completo para acompanhamento de doramas asiáticos, construído com Next.js 14, TypeScript e Tailwind CSS seguindo princípios de DDD (Domain Driven Design).

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Instalação

```bash
# 1. Criar o projeto
npx create-next-app@latest kdrama-frontend --typescript --tailwind --eslint --app --src-dir

cd kdrama-frontend

# 2. Instalar dependências principais
npm install @types/node @types/react @types/react-dom

# 3. UI e Ícones
npm install lucide-react @headlessui/react @heroicons/react

# 4. Formulários e Validação
npm install react-hook-form @hookform/resolvers zod

# 5. Requisições HTTP
npm install axios @tanstack/react-query

# 6. Estado Global
npm install zustand

# 7. Utilitários CSS
npm install clsx tailwind-merge

# 8. Dev Dependencies
npm install -D @types/jest prettier eslint-config-prettier
```

### Configuração

1. **Copie os arquivos de configuração** dos artifacts acima:
   - `tsconfig.json`
   - `tailwind.config.js`
   - `.eslintrc.json`
   - `prettier.config.js`

2. **Configure variáveis de ambiente**:

```bash
# Copie o .env.example para .env.local
cp .env.example .env.local

# Edite com suas configurações
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Execute o projeto**:

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router (Next.js 14)
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Home page
│   ├── login/
│   │   └── page.tsx            # Página de login
│   ├── catalog/
│   │   └── page.tsx            # Catálogo de doramas
│   └── providers.tsx           # Providers (React Query, etc)
├── components/                  # Componentes reutilizáveis
│   ├── ui/                     # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── layout/                 # Componentes de layout
│   │   ├── Navbar.tsx
│   │   └── QuickActionsFooter.tsx
│   ├── home/                   # Componentes da home
│   │   ├── ContinueWatchingSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── DiscoverSection.tsx
│   │   └── RecentActivitiesSection.tsx
│   └── shared/                 # Componentes compartilhados
├── domain/                     # Camada de domínio (DDD)
│   ├── entities/              # Entidades do negócio
│   │   ├── Drama.ts
│   │   ├── User.ts
│   │   └── UserDrama.ts
│   ├── interfaces/            # Contratos/interfaces
│   └── types/                 # Tipos TypeScript
├── infrastructure/            # Camada de infraestrutura
│   ├── api/                  # Configuração de APIs
│   │   └── client.ts
│   ├── services/             # Serviços externos
│   │   ├── authService.ts
│   │   └── dramaService.ts
│   └── storage/              # LocalStorage, cookies, etc
├── application/              # Camada de aplicação
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useDramas.ts
│   ├── store/               # Estado global (Zustand)
│   │   └── authStore.ts
│   └── utils/               # Utilitários
│       ├── cn.ts           # Class name utility
│       ├── format.ts       # Formatação
│       └── validation.ts   # Validações
└── styles/                  # Estilos globais e temas
```

## 🎨 Design System

### Cores Principais

- **Primary**: Blue (Tailwind 600)
- **Secondary**: Gray
- **Success**: Green
- **Warning**: Yellow
- **Danger**: Red

### Componentes Base

- **Button**: 4 variantes (primary, secondary, outline, ghost)
- **Card**: Container base com header, content
- **Input**: Com label e error states
- **LoadingSpinner**: 3 tamanhos
- **ErrorMessage**: Com retry option

## 🔧 Funcionalidades Implementadas

### ✅ Home Page

- [x] Navbar responsiva com busca
- [x] Seção "Continue Assistindo"
- [x] Cards de estatísticas
- [x] Seção "Descobrir" com filtros
- [x] Feed de atividades recentes
- [x] Footer com ações rápidas

### ✅ Autenticação

- [x] Página de login
- [x] Gerenciamento de estado global (Zustand)
- [x] Interceptors para token
- [x] Hooks de autenticação

### ✅ UI Components

- [x] Design system completo
- [x] Componentes reutilizáveis
- [x] Responsividade mobile-first
- [x] Estados de loading e erro

### ✅ Infraestrutura

- [x] Client HTTP configurado (Axios)
- [x] React Query setup
- [x] Tipagem TypeScript completa
- [x] Utilitários e validações

## 🚧 Próximos Passos

### Páginas a Implementar

- [ ] Página de cadastro
- [ ] Página de perfil do usuário
- [ ] Página de detalhes do drama
- [ ] Página de amigos
- [ ] Página de listas
- [ ] Página de configurações

### Funcionalidades

- [ ] Sistema de notificações
- [ ] Upload de imagens
- [ ] Filtros avançados
- [ ] Sistema de comentários
- [ ] Progressive Web App (PWA)
- [ ] Dark mode

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Responsividade

O projeto foi desenvolvido com abordagem mobile-first:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Breakpoints Tailwind

```css
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

## 🔌 Integração com API

### Configuração do Cliente HTTP

```typescript
// src/infrastructure/api/client.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor automático para tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Endpoints Esperados

```bash
# Autenticação
POST /auth/login
POST /auth/register
POST /auth/logout
POST /auth/refresh
GET  /auth/profile

# Doramas
GET  /dramas
GET  /dramas/:id
GET  /dramas/recommended
GET  /dramas/trending
GET  /dramas/search?q=query

# User Dramas
GET    /users/:id/dramas
POST   /user-dramas
PUT    /user-dramas/:id
DELETE /user-dramas/:id

# Social
GET  /users/:id/friends
GET  /activities/feed
POST /activities
```

## 🎯 Boas Práticas Implementadas

### TypeScript

- **Tipagem completa**: Todas as entidades, props e responses tipadas
- **Interfaces bem definidas**: Separação clara entre domain, application e infrastructure
- **Utility types**: Uso de Partial, Pick, Omit quando necessário

### React/Next.js

- **Server Components**: Uso apropriado de client/server components
- **App Router**: Nova estrutura de roteamento do Next.js 14
- **Hooks customizados**: Reutilização de lógica através de custom hooks
- **Memoização**: Performance otimizada com useMemo/useCallback quando necessário

### Estado Global

- **Zustand**: Store simples e performático
- **Persistência**: Dados importantes persistidos no localStorage
- **React Query**: Cache inteligente para dados da API

### Styling

- **Tailwind CSS**: Utility-first approach
- **Design System**: Componentes consistentes e reutilizáveis
- **Mobile-first**: Responsividade desde o início
- **Dark mode ready**: Estrutura preparada para tema escuro

### Arquitetura

- **DDD adaptado**: Separação clara de responsabilidades
- **Clean Architecture**: Dependências apontando para dentro
- **SOLID principles**: Código mantenível e extensível

## 🧪 Testes (Próximos passos)

### Configuração Jest + Testing Library

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D jest-environment-jsdom
```

### Estrutura de Testes

```
__tests__/
├── components/
│   ├── ui/
│   └── home/
├── hooks/
├── utils/
└── pages/
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Segurança

### Implementações de Segurança

- **Token JWT**: Autenticação segura
- **Interceptors**: Tratamento automático de tokens expirados
- **Validação client-side**: Zod para validação de formulários
- **Environment variables**: Configurações sensíveis em variáveis de ambiente
- **HTTPS only**: Em produção, sempre usar HTTPS

### Headers de Segurança (next.config.js)

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
```

## 📊 Performance

### Otimizações Implementadas

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automático com App Router
- **Lazy Loading**: Componentes carregados sob demanda
- **React Query**: Cache inteligente de dados
- **Bundle Analysis**: Análise do tamanho do bundle

### Métricas a Monitorar

- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Cumulative Layout Shift (CLS)**
- **First Input Delay (FID)**

## 🐛 Debug e Desenvolvimento

### React Query Devtools

```bash
npm install @tanstack/react-query-devtools
```

### Zustand Devtools

```typescript
import { devtools } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  devtools(persist(/* ... */), { name: "auth-store" }),
);
```

## 📚 Recursos Úteis

### Documentação

- [Next.js 14](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)

### Design Inspiration

- [Dribbble - Movie Apps](https://dribbble.com/tags/movie_app)
- [MyAnimeList](https://myanimelist.net/)
- [Letterboxd](https://letterboxd.com/)

## 🤝 Contribuição

### Workflow

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrões de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação, lint
refactor: refatoração de código
test: adição de testes
chore: tarefas de manutenção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para a comunidade de doramas**

Para dúvidas ou sugestões, abra uma issue no repositório!
