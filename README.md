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

1.  **Apache2** instalado e configurado como proxy reverso (conforme instruções anteriores).
2.  **Node.js** (preferencialmente via `nvm`) e **PM2** (`npm install pm2 -g`) instalados.
3.  **MariaDB** instalado e um banco de dados (`gestao_servicos`) + usuário (`gestao_user`) criados para a aplicação.
4.  **Git** instalado.
5.  O diretório `/var/www/gestao-v6` criado e com as permissões corretas para o seu usuário.

---

### ภาค 1: Primeira Implantação (Setup Inicial)

Siga estes passos **apenas na primeira vez** para colocar o projeto no ar.

#### Passo 1: Clonar o Repositório no Servidor

Acesse seu servidor via SSH e clone o projeto para o diretório preparado.

```bash
# Navegue até o diretório da aplicação
cd /var/www/gestao-v6

# Clone o conteúdo do repositório para a pasta atual (note o ponto no final)
git clone https://github.com/thiagopagani/gestao-v6.git .
```

#### Passo 2: Configurar o Backend

Configure as variáveis de ambiente para conectar o backend ao banco de dados.

```bash
# Navegue para a pasta do backend
cd backend

# Copie o arquivo de exemplo para criar seu arquivo de configuração
cp .env.example .env

# Edite o arquivo .env com suas credenciais reais
nano .env 
```
Dentro do editor `nano`, altere a `DB_PASSWORD` para a senha que você definiu para o usuário `gestao_user` no MariaDB e salve (`Ctrl+X`, `Y`, `Enter`).

#### Passo 3: Instalar Dependências e Fazer o Build

Instale as dependências para o frontend e backend, e depois gere a versão de produção do frontend.

```bash
# Volte para a raiz do projeto
cd /var/www/gestao-v6

# Instale as dependências do frontend (lê o package.json da raiz)
echo "Instalando dependências do Frontend..."
npm install

# Instale as dependências do backend
echo "Instalando dependências do Backend..."
cd backend && npm install && cd ..

# Execute o script de build para gerar os arquivos estáticos na pasta `dist/`
echo "Gerando build do Frontend..."
npm run build
```
A pasta `dist/` é o que o Apache servirá ao público.

#### Passo 4: Iniciar o Servidor Backend com PM2

Use o PM2 para iniciar sua aplicação backend, garantindo que ela rode continuamente e reinicie em caso de falhas.

```bash
# Inicie o servidor, dando um nome ao processo para fácil gerenciamento
pm2 start backend/server.js --name gestao-v6-backend

# Configure o PM2 para iniciar automaticamente na inicialização do servidor
pm2 startup
# (O PM2 fornecerá um comando para você copiar e colar. Execute-o!)

# Salve a lista de processos atual para que o PM2 a restaure no boot
pm2 save
```

**🎉 Pronto!** Neste ponto, sua aplicação deve estar acessível pelo IP ou domínio do seu servidor.

---

### 🔄 Parte 2: Fluxo de Atualização (Deploy Contínuo)

Para todas as futuras atualizações da aplicação, o processo é muito mais simples.

#### Passo 1: Preparar o Script de Deploy (Apenas uma vez)

No seu servidor, mova o `deploy.sh` (que veio do repositório) para o diretório `/var/www/` e torne-o executável.

```bash
# Estando na pasta /var/www/gestao-v6
sudo mv deploy.sh /var/www/
sudo chmod +x /var/www/deploy.sh
```

#### Passo 2: Desenvolver e Enviar para o Git

No seu **ambiente de desenvolvimento local**, faça as alterações necessárias, faça o commit e envie para o GitHub.

```bash
# Adicione suas alterações
git add .

# Crie um commit descritivo
git commit -m "Ex: Adiciona funcionalidade de exportar PDF"

# Envie para a branch principal
git push origin main
```

#### Passo 3: Executar o Deploy no Servidor

Acesse seu servidor via SSH e execute o script de deploy.

```bash
# Você pode estar em qualquer diretório para executar este comando
sudo /var/www/deploy.sh
```

O script fará todo o trabalho pesado: buscará o código novo do GitHub, reinstalará dependências, fará um novo build do frontend e reiniciará o backend sem tempo de inatividade.
