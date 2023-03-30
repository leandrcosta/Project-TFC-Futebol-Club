# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine
# Mudar para o diretório de trabalho /app-backend
WORKDIR /app-frontend
# Copiar os package.json e package-lock.json para o container
# /package*.json - Copia todos os arquivos que tenham package_alguma coisa e extensão .json
COPY package*.json ./
# Instalar as dependências Node
RUN npm install
# Copiar o restante dos arquivos da aplicação para o container
COPY . .
# Sinalize que aplicação expõe a porta 3001
EXPOSE 3000
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# verifiquei no package.json os comando pra iniciar o App
ENTRYPOINT [ "npm", "start" ]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações
