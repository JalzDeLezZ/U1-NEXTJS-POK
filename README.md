<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 
```
$ yarn install
```
3. Tener Next CLI instalado
```
$ npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
$ docker-compose up -d
```
5. Reconstruir la base de datos con la semilla
```
* http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* Nest


## Development
```
# Dependences
$ npm i --save @nestjs/mongoose mongoose
$ yarn add class-validator class-transformer
$ yarn add @nestjs/configi //? enviroments

# Comands
$ nest g mo common
$ nest g pi common/pipes/parseMongoIdx --no-spec
$ nest g res <name> --no-spec
```