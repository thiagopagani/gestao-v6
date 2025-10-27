# Gestão de Serviços v6 - Guia de Implantação e Desenvolvimento

Este guia detalha os passos para a implantação inicial e as atualizações futuras da aplicação no servidor Ubuntu 24.04.

## Pré-requisitos no Servidor

Antes de começar, garanta que seu servidor já possui:
1.  Apache2 configurado e rodando.
2.  Node.js (via nvm) e PM2 instalados.
3.  MariaDB instalado e um banco de dados + usuário criados para a aplicação.
4.  Git instalado.
5.  O diretório `/var/www/gestao-v6` criado e com as permissões corretas.

---

## Parte 1: Primeira Implantação (Setup Inicial)

Siga estes passos **apenas na primeira vez** para colocar o projeto no ar.

### Passo 1: Enviar o Código para o GitHub

1.  Crie um novo repositório privado no GitHub (ex: `gestao-servicos-app`).
2.  No seu ambiente de desenvolvimento local (onde este código está), adicione o repositório remoto e envie o código.
    ```bash
    # Na raiz do projeto
    git init
    git add .
    git commit -m "Commit inicial do projeto"
    git branch -M main
    git remote add origin SUA_URL_DO_REPOSITORIO_AQUI.git
    git push -u origin main
    ```
    **Importante:** Certifique-se de ter criado os arquivos `.gitignore` e `.env.example` na pasta `backend/` e o `deploy.sh` na raiz, conforme as instruções anteriores.

### Passo 2: Clonar o Repositório no Servidor

1.  Acesse seu servidor via SSH.
2.  Navegue até o diretório `www` e clone o projeto para dentro de `gestao-v6`.
    ```bash
    cd /var/www/gestao-v6
    # O ponto no final clona o conteúdo na pasta atual
    git clone SUA_URL_DO_REPOSITORIO_AQUI.git .
    ```

### Passo 3: Configurar o Backend

1.  Navegue para a pasta do backend e configure as variáveis de ambiente.
    ```bash
    cd backend
    
    # Copie o arquivo de exemplo para criar o seu arquivo de configuração
    cp .env.example .env
    
    # Edite o arquivo .env com suas credenciais do banco de dados
    nano .env 
    # (Altere a DB_PASSWORD para a senha que você definiu no MariaDB)
    ```
2.  Instale as dependências do backend.
    ```bash
    npm install
    ```

### Passo 4: Configurar e Fazer o Build do Frontend

1.  Volte para a raiz do projeto e instale as dependências do frontend.
    ```bash
    cd ..
    npm install
    ```
2.  Execute o script de build para gerar os arquivos estáticos na pasta `dist/`.
    ```bash
    npm run build
    ```
    *Esta pasta `dist/` é a que o Apache está configurado para servir.*

### Passo 5: Iniciar o Servidor Backend com PM2

1.  Use o PM2 para iniciar sua aplicação backend e garantir que ela rode continuamente.
    ```bash
    # O --name é um apelido para o processo, usado pelo script de deploy
    pm2 start backend/server.js --name gestao-v6-backend
    ```
2.  Configure o PM2 para iniciar automaticamente com o servidor.
    ```bash
    pm2 startup
    # (Ele vai te dar um comando para copiar e colar, execute-o)
    
    # Salve a lista de processos atual
    pm2 save
    ```

**Pronto!** Neste ponto, sua aplicação deve estar acessível pelo IP ou domínio do seu servidor. O Apache servirá o frontend, que por sua vez se comunicará com o backend rodando via PM2.

---

## Parte 2: Fluxo de Atualização (Deploy Contínuo)

Para todas as futuras atualizações da aplicação, o processo é muito mais simples.

### Passo 1: Mover e Preparar o Script de Deploy

1.  No seu servidor, mova o `deploy.sh` para o diretório `/var/www/` e torne-o executável.
    ```bash
    # Estando na pasta /var/www/gestao-v6
    sudo mv deploy.sh /var/www/
    sudo chmod +x /var/www/deploy.sh
    ```
2.  **Importante:** Edite o script para garantir que ele está correto.
    ```bash
    sudo nano /var/www/deploy.sh
    # Verifique se a branch (main ou master) e outros detalhes estão corretos.
    ```

### Passo 2: Desenvolver e Enviar para o Git

1.  Faça as alterações necessárias no código no seu ambiente de desenvolvimento.
2.  Faça o commit e envie para o GitHub.
    ```bash
    git add .
    git commit -m "Descrição da nova funcionalidade ou correção"
    git push origin main
    ```

### Passo 3: Executar o Deploy no Servidor

1.  Acesse seu servidor via SSH.
2.  Execute o script de deploy.
    ```bash
    # Estando em qualquer diretório
    sudo /var/www/deploy.sh
    ```

O script fará todo o trabalho pesado: buscará o código novo, reinstalará dependências se necessário, fará um novo build do frontend e reiniciará o backend sem tempo de inatividade.
