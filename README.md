# Gestión de Paquetes y Dependencias en Node.js

## Manejadores de Paquetes, Versionamiento Semántico y Dependencias

Este repositorio contiene los materiales y ejemplos del curso de Node.js para el Grupo 22.

## Contenido del Curso

### 1. Manejadores de Paquetes

En esta sección se explicaron los principales manejadores de paquetes para Node.js:

#### npm (Node Package Manager)
- Manejador de paquetes por defecto de Node.js
- Comandos básicos:
  ```bash
  npm install <paquete>
  npm uninstall <paquete>
  npm update <paquete>
  ```

#### yarn
- Manejador de paquetes desarrollado por Facebook
- Instalación:
  ```bash
  npm install -g yarn
  ```
- Comandos básicos:
  ```bash
  yarn add <paquete>
  yarn remove <paquete>
  yarn upgrade <paquete>
  ```

#### pnpm
- Manejador de paquetes eficiente en espacio de disco
- Instalación:
  ```bash
  npm install -g pnpm
  ```
- Comandos básicos:
  ```bash
  pnpm add <paquete>
  pnpm remove <paquete>
  pnpm update <paquete>
  ```

#### bun
- Runtime y manejador de paquetes ultra-rápido
- Instalación en Windows:
  ```bash
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```
- Comandos básicos:
  ```bash
  bun add <paquete>
  bun remove <paquete>
  bun update <paquete>
  ```

### 2. Tipos de Dependencias

#### Dependencias del Proyecto (Production Dependencies)
Paquetes necesarios para que la aplicación funcione en producción:
```bash
npm install <paquete>
npm install express
```

#### Dependencias de Desarrollo (Development Dependencies)
Paquetes necesarios solo durante el desarrollo:
```bash
npm install <paquete> --save-dev
npm install <paquete> -D
npm install typescript -D
```

#### Dependencias Globales
Paquetes instalados globalmente en el sistema:
```bash
npm install -g <paquete>
npm install -g nodemon
```

#### Dependencias Exactas
Instalación de versiones específicas sin permitir actualizaciones automáticas:
```bash
npm install <paquete> --save-exact
npm install typescript -D --save-exact
```

### 3. Versionamiento Semántico (SemVer)

El versionamiento semántico sigue el formato `MAJOR.MINOR.PATCH`:

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nueva funcionalidad compatible con versiones anteriores
- **PATCH**: Correcciones de errores compatibles

#### Símbolos de Versionado

##### Símbolo ^ (Caret)
Permite actualizaciones de `MINOR` y `PATCH`, pero no de `MAJOR`:
```json
{
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
- Acepta: `4.18.3`, `4.19.0`, `4.20.1`
- No acepta: `5.0.0`

##### Símbolo ~ (Tilde)
Permite actualizaciones solo de `PATCH`:
```json
{
  "dependencies": {
    "express": "~4.18.2"
  }
}
```
- Acepta: `4.18.3`, `4.18.9`
- No acepta: `4.19.0`, `5.0.0`

##### Sin Símbolos (Versión Exacta)
Cuando se usa `--save-exact`, no se permite ninguna actualización automática:
```json
{
  "devDependencies": {
    "typescript": "5.2.2"
  }
}
```

### 4. Archivos de Configuración

#### package.json
Archivo principal que contiene:
- Metadatos del proyecto
- Lista de dependencias
- Scripts de npm
- Configuración del proyecto

#### package-lock.json (npm) / yarn.lock (yarn) / pnpm-lock.yaml (pnpm)
Archivo que asegura instalaciones determinísticas:
- Versiones exactas de todas las dependencias
- Estructura del árbol de dependencias
- Checksums de integridad

## Comandos Útiles

### npm
```bash
# Ver versión de npm
npm --version

# Inicializar un proyecto
npm init

# Instalar todas las dependencias
npm install

# Ver dependencias instaladas
npm list

# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Auditoría de seguridad
npm audit
```

### Limpieza de Cache
```bash
# npm
npm cache clean --force

# yarn
yarn cache clean

# pnpm
pnpm store prune

# bun
bun pm cache rm
```