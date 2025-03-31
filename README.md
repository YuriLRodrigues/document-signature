# 📄 Gerenciamento de Documentos

Este projeto é um teste técnico desenvolvido com **Next.js**, focado na autenticação e no gerenciamento de documentos. Ele permite que usuários façam login, façam upload de arquivos PDF, visualizem seus documentos e realizem uma assinatura digital simplificada.

## 🚀 Tecnologias Utilizadas

As principais tecnologias utilizadas neste projeto são:

- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) - Biblioteca para construção da interface
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) - Framework React para SSR e API Routes
- ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-0078D4?style=for-the-badge&logo=microsoft&logoColor=white) - Autenticação com provedor OAuth e credenciais
- ![API Routes](https://img.shields.io/badge/API%20Routes-000000?style=for-the-badge&logo=vercel&logoColor=white) - Back-end dentro do próprio Next.js
- ![UUID](https://img.shields.io/badge/UUID-4B0082?style=for-the-badge&) - Geração de identificadores únicos
- ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white) - Validação de dados
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) - Gerenciamento de formulários
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) - ORM para comunicação com o banco de dados
- ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) - Banco de dados leve e eficiente
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-FF9900?style=for-the-badge&) - Hashing seguro de senhas
- ![Shadcn](https://img.shields.io/badge/Shadcn/UI-000000?style=for-the-badge&) - Biblioteca de componentes acessíveis e customizáveis
- ![Date-fns](https://img.shields.io/badge/Date--fns-00C853?style=for-the-badge&) - Manipulação de datas em JavaScript
- ![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-000000?style=for-the-badge&) - Conjunto de ícones modernos para UI
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) - Estilização moderna e eficiente

## 📂 Estrutura de Pastas

O projeto segue uma estrutura organizada para facilitar a manutenção e escalabilidade:

```
src/
  ├── @types/         # Tipagens globais do projeto
  ├── app/            # Estrutura principal do Next.js
  │   ├── api/        # API Routes para manipulação de dados no backend
  │   │   ├── auth/   # Endpoints de autenticação (login, registro, logout)
  │   ├── auth/       # Páginas de login e registro
  │   ├── dashboard/  # Área autenticada para gerenciamento de documentos
  │   │   ├── documents/  # Listagem, visualização e upload de documentos
  │   ├── layout.tsx  # Layout principal da aplicação
  │   ├── page.tsx    # Página inicial
  ├── components/     # Componentes reutilizáveis
  ├── hooks/          # Hooks personalizados para otimizar lógica do React
  ├── http/           # Configuração de chamadas HTTP e APIs
  ├── lib/            # Utilitários globais, como configuração do Prisma
  ├── providers/      # Contextos globais e configuração do NextAuth
  ├── types/          # Definição de tipos para tipagem estática
  ├── utils/          # Funções auxiliares usadas no projeto
  ├── middleware.ts   # Middleware de autenticação e proteção de rotas
```

## 🌟 Funcionalidades Principais

### 1️⃣ Autenticação
✅ Página de login e registro

✅ Proteção de rotas privadas com middleware e o nextauth para as api routes

✅ Logout e gerenciamento de sessão


### 2️⃣ Gerenciamento de Documentos
✅ Listagem de documentos do usuário logado

✅ Upload de novos documentos (PDF)

✅ Visualização de documento

✅ Exclusão de documentos

### 3️⃣ Assinatura Digital (Simplificada)
✅ Interface para simular assinatura em documento 

✅ Registro da assinatura com timestamp

✅ Status do documento (Pendente, Assinado)

## ⚙️ Como Rodar o Projeto

```bash
# Instalar as dependências
pnpm install

# Gerar o prisma e suas tipagens
pnpm prisma generate

# Rodar o projeto em desenvolvimento
pnpm run dev
```
---

# Observações

## 1. Erros de Hydration com ícones do Lucide
Durante o desenvolvimento, foi identificado que os ícones do Lucide apresentaram erros de *hydration*, possivelmente devido à incompatibilidade entre o lado do servidor e do cliente no Next.js, porém só é visualizado em modo de desenvolvimento.

## 2. Upload de documentos
O processo de upload de documentos não é feito utilizando um serviço de armazenamento externo, como S3, R2 ou MinIO. Ao invés disso, optei por realizar o upload diretamente no código, salvando os arquivos dentro da pasta `uploads` da aplicação. Para referência e acesso ao PDF, utilizamos uma chave específica. Isso pode ser visualizado nas rotas de API para download de documentos e na rota de upload. Embora essa solução não seja escalável, ela funciona para a necessidade atual do projeto.

## 3. Integração de API Routes com Server Components
A intenção inicial era utilizar o método de API Routes juntamente com o `fetch` para promover um melhor desacoplamento e aproveitar a funcionalidade de cache do `fetch`. No entanto, o Next.js não permite que uma API Route seja chamada diretamente dentro de um Server Component, a não ser que haja uma interação do cliente, como um clique de botão. Diante disso, com o tempo limitado, optei por usar uma abordagem mais direta, chamando o Prisma diretamente nas funções necessárias. Para mais detalhes sobre a implementação original, confira os seguintes arquivos:
- `src/http/documents/get-admin-signed-documents.ts`
- `src/app/dashboard/components/admin-cards/admin-completion-rate-documents-card.tsx`

## 4. Testes Unitários/Componentes/E2E
Devido a compromissos de tempo e o curto tempo para desenvolver, não consegui adicionar testes unitários, de componentes ou E2E na aplicação. Testes unitários com Jest não são minha especialidade, embora eu seja capaz de desenvolvê-los. Minha preferência e maior facilidade é com o Cypress, especialmente para testes de componentes e E2E. No entanto, por falta de tempo, essa parte ficou pendente, mesmo que fosse um diferencial.

## 5. Desafio de integração com GitHub e NextAuth
O maior desafio foi conseguir fazer o callback do GitHub funcionar corretamente com o NextAuth em produção. Apesar de ter pesquisado bastante sobre o problema e realizado diversas tentativas de configuração, não consegui identificar o motivo do erro de callback URL que ocorre em produção. Localmente, ao configurar corretamente todas as variáveis, o sistema funciona perfeitamente. No entanto, em produção, persiste o erro de callback URL.

Foi possível observar, nos meus commits, o quanto modifiquei a configuração tentando ajustar esse problema em produção, incluindo mudanças nas credenciais do GitHub, ajustes nas rotas de autorização e permissões. Infelizmente, mesmo com essas modificações, a integração não funcionou como esperado em ambiente de produção, entretando, caso rode o projeto localmente, a autenticação funcionará da maneira esperada.


## 📬 Contato

- **Autor**: Yuri Leite Rodrigues
- **LinkedIn**: <a href="https://www.linkedin.com/in/yuri-leite-rodrigues/" target="_blank">Yuri Leite Rodrigues</a>

