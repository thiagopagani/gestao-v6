# Gestão de Serviços v6

Este é o repositório oficial da aplicação de Gestão de Serviços v6, um sistema completo para gerenciamento de empresas contratantes, clientes, funcionários terceirizados e diárias de serviço.

---

## 🛠️ Stack de Tecnologias

-   **Frontend:** React 18, Vite, React Router, Tailwind CSS, Recharts
-   **Backend:** Node.js, Express, Sequelize
-   **Banco de Dados:** MariaDB
-   **Ambiente de Implantação:** Ubuntu 24.04, Apache2 (como Proxy Reverso), PM2

---

## 🚀 Guia de Implantação

Este guia detalha os passos para a implantação inicial e as atualizações futuras da aplicação no servidor.

### ✅ Pré-requisitos no Servidor

Antes de começar, garanta que seu servidor Ubuntu 24.04 já possui:

1.  **Apache2** instalado e configurado como proxy reverso.
2.  **Node.js** (preferencialmente via `nvm`) e **PM2** (`npm install pm2 -g`) instalados.
3.  **MariaDB** instalado e um banco de dados (`gestao_servicos`) + usuário (`gestao_user`) criados.
4.  **Git** instalado.
5.  O diretório `/var/www/gestao-v6` criado e com as permissões corretas para o seu usuário.

---

### Parte 1: Primeira Implantação (Setup Inicial)

Siga estes passos **apenas na primeira vez** para colocar o projeto no ar.

#### Passo 1: Clonar o Repositório no Servidor

Acesse seu servidor via SSH e clone o projeto para o diretório preparado.

```bash
# Navegue até o diretório da aplicação
cd /var/www/gestao-v6

# Clone o conteúdo do repositório para a pasta atual (note o ponto no final)
git clone https://github.com/thiagopagani/gestao-v6.git .
```

#### Passo 2: Configurar o Backend (Arquivo `.env`)

O arquivo `.env` armazena as senhas e configurações sensíveis do backend. Ele não é enviado para o GitHub por segurança. Vamos criá-lo no servidor.

```bash
# Navegue para a pasta do backend
cd backend

# Crie e abra o arquivo .env com o editor nano
nano .env
```

Agora, **copie o bloco de texto abaixo e cole-o** dentro do editor `nano`:

```ini
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=gestao_user
DB_PASSWORD=TeckapiFer2025
DB_NAME=gestao_servicos
DB_DIALECT=mariadb
```

Pressione `Ctrl + X`, depois `Y` e `Enter` para salvar e sair.

#### Passo 3: Instalar Dependências e Fazer o Build

Instale as dependências para o frontend e backend, e depois gere a versão de produção do frontend que será exibida aos usuários.

```bash
# Volte para a raiz do projeto
cd /var/www/gestao-v6

# Instale as dependências do frontend (lê o package.json da raiz)
echo ">>> Instalando dependências do Frontend..."
npm install

# Instale as dependências do backend
echo ">>> Instalando dependências do Backend..."
(cd backend && npm install)

# Execute o script de build para gerar os arquivos estáticos na pasta `dist/`
echo ">>> Gerando build de produção do Frontend..."
npm run build
```

#### Passo 4: Iniciar o Servidor Backend com PM2

Use o PM2 para iniciar sua aplicação backend. Ele garantirá que o servidor rode continuamente e reinicie automaticamente em caso de falhas.

```bash
# Inicie o servidor, dando um nome ao processo para fácil gerenciamento
pm2 start backend/server.js --name gestao-v6-backend

# Configure o PM2 para iniciar junto com o servidor
pm2 startup
# ATENÇÃO: O PM2 fornecerá um comando na tela. Copie e execute-o!

# Salve a lista de processos para que o PM2 a restaure no boot
pm2 save
```

**🎉 Pronto!** Neste ponto, sua aplicação deve estar acessível pelo IP ou domínio do seu servidor.

---

### Parte 2: Fluxo de Atualização (Deploy Contínuo)

Para todas as futuras atualizações da aplicação, o processo é muito mais simples.

#### Passo 1: Preparar o Script de Deploy (Apenas uma vez)

No seu servidor, mova o `deploy.sh` (que veio do repositório) para `/var/www/` e torne-o executável.

```bash
# Estando na pasta /var/www/gestao-v6
sudo mv deploy.sh /var/www/
sudo chmod +x /var/www/deploy.sh
```

#### Passo 2: Desenvolver e Enviar para o Git

No seu **ambiente de desenvolvimento local**, faça as alterações, crie um commit e envie para o GitHub.

```bash
# Adicione suas alterações
git add .

# Crie um commit descritivo
git commit -m "Ex: Adiciona funcionalidade de exportar PDF"

# Envie para a branch principal
git push origin main
```

#### Passo 3: Executar o Deploy no Servidor

Acesse seu servidor via SSH e execute o script de deploy com um único comando.

```bash
# Você pode estar em qualquer diretório para executar este comando
sudo /var/www/deploy.sh
```

O script fará todo o trabalho: buscará o código novo, reinstalará dependências se necessário, fará um novo build do frontend e reiniciará o backend sem tempo de inatividade.