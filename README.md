# Scripts en Node.js

## Creación y Ejecución de Scripts en npm, yarn y pnpm

Este repositorio contiene los materiales y ejemplos sobre creación y ejecución de scripts en Node.js con diferentes manejadores de paquetes.

## ¿Qué son los Scripts de npm?

Los **scripts de npm** son comandos personalizados que se definen en el archivo `package.json` para automatizar tareas comunes del proyecto como:

- Iniciar la aplicación
- Ejecutar tests
- Compilar código
- Limpiar archivos temporales
- Ejecutar linters
- Generar documentación

## Definición de Scripts

Los scripts se definen en la sección `scripts` del archivo `package.json`. En este proyecto tenemos:

```json
{
  "scripts": {
    "start": "node index.js",
    "start:dev": "node app.ts",
    "execute": "node index.js",
    "test": "node index.js",
    "app": "node app.ts",
    "build": "tsc app.ts",
    "clean": "rimraf app.js",
    "traspile": "npm run clean && npm run build"
  }
}
```

## Ejecución de Scripts

### Con npm

#### Scripts Predefinidos
Algunos scripts tienen nombres especiales y **NO requieren** la palabra `run`:

```bash
npm start      # Ejecuta "node index.js"
npm test       # Ejecuta "node index.js"
```

#### Scripts Personalizados
Todos los demás scripts **requieren** la palabra `run`:

```bash
npm run start:dev    # Ejecuta "node app.ts"
npm run execute      # Ejecuta "node index.js"
npm run app          # Ejecuta "node app.ts"
npm run build        # Ejecuta "tsc app.ts"
npm run clean        # Ejecuta "rimraf app.js"
npm run traspile     # Ejecuta "npm run clean && npm run build"
```

### Con yarn

Con yarn, **todos los scripts** se pueden ejecutar con o sin `run`:

```bash
# Ambas formas son válidas
yarn start           # Ejecuta "node index.js"
yarn run start

yarn start:dev       # Ejecuta "node app.ts"
yarn run start:dev

yarn build           # Ejecuta "tsc app.ts"
yarn run build

yarn test            # Ejecuta "node index.js"
yarn run test

yarn app             # Ejecuta "node app.ts"
yarn clean           # Ejecuta "rimraf app.js"
yarn traspile        # Ejecuta "npm run clean && npm run build"
```

### Con pnpm

Similar a npm, los scripts predefinidos no requieren `run`:

```bash
# Scripts predefinidos (sin run)
pnpm start           # Ejecuta "node index.js"
pnpm test            # Ejecuta "node index.js"

# Scripts personalizados (con run)
pnpm run start:dev   # Ejecuta "node app.ts"
pnpm run app         # Ejecuta "node app.ts"
pnpm run build       # Ejecuta "tsc app.ts"
pnpm run clean       # Ejecuta "rimraf app.js"
pnpm run traspile    # Ejecuta "npm run clean && npm run build"
```

## Scripts con Parámetros

Puedes pasar argumentos adicionales a los scripts:

### npm
```bash
# Usar -- para separar argumentos
npm run build -- --outDir dist    # Ejecuta "tsc app.ts --outDir dist"
npm run start -- --port 3000      # Ejecuta "node index.js --port 3000"
```

### yarn
```bash
# Pasar argumentos directamente
yarn build --outDir dist          # Ejecuta "tsc app.ts --outDir dist"
yarn start --port 3000            # Ejecuta "node index.js --port 3000"
```

### pnpm
```bash
# Usar -- para separar argumentos
pnpm run build -- --outDir dist   # Ejecuta "tsc app.ts --outDir dist"
```

## Scripts Pre y Post

npm ejecuta automáticamente scripts con prefijos `pre` y `post`:

```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "tsc app.ts",
    "postbuild": "echo 'Build completado'",
    
    "prestart": "npm run build",
    "start": "node index.js",
    "poststart": "echo 'Aplicación iniciada'",
    
    "pretest": "echo 'Preparando tests'",
    "test": "node index.js",
    "posttest": "echo 'Tests completados'"
  }
}
```

### Secuencia de Ejecución

Cuando ejecutas `npm run build`, se ejecuta en este orden:
1. `prebuild` (si existe) → ejecuta `npm run clean`
2. `build` → ejecuta `tsc app.ts`
3. `postbuild` (si existe) → ejecuta `echo 'Build completado'`

```bash
npm run build
# Ejecuta: prebuild → build → postbuild
# En este caso: "npm run clean" → "tsc app.ts" → "echo 'Build completado'"
```

## Scripts Compuestos

El script `traspile` en nuestro proyecto es un ejemplo de script compuesto que ejecuta múltiples comandos:

```json
{
  "scripts": {
    "clean": "rimraf app.js",
    "build": "tsc app.ts",
    "traspile": "npm run clean && npm run build"
  }
}
```

### Secuencial (uno después del otro)
```bash
npm run traspile
# Ejecuta: "rimraf app.js" Y LUEGO "tsc app.ts"
```

El operador `&&` asegura que el segundo comando solo se ejecute si el primero termina exitosamente.

## Ejemplos de Uso de los Scripts del Proyecto

### Scripts Básicos
```bash
# Ejecutar la aplicación principal
npm start                # Ejecuta "node index.js"

# Ejecutar en modo desarrollo con TypeScript
npm run start:dev        # Ejecuta "node app.ts"

# Ejecutar la aplicación compilada
npm run app              # Ejecuta "node app.ts"

# Ejecutar tests
npm test                 # Ejecuta "node index.js"
```

### Scripts de Build
```bash
# Compilar TypeScript
npm run build            # Ejecuta "tsc app.ts"

# Limpiar archivos compilados
npm run clean            # Ejecuta "rimraf app.js"

# Limpiar y compilar (script compuesto)
npm run traspile         # Ejecuta "npm run clean && npm run build"
```

### Flujo de Trabajo Completo
```bash
# 1. Limpiar archivos anteriores
npm run clean

# 2. Compilar TypeScript
npm run build

# 3. O hacer ambos pasos de una vez
npm run traspile

# 4. Ejecutar la aplicación
npm run app
```

## Análisis de los Scripts del Proyecto

### Scripts de Ejecución
- **`start`**: Script estándar para producción que ejecuta `node index.js`
- **`start:dev`**: Variante para desarrollo que ejecuta directamente TypeScript con `node app.ts`
- **`execute`**: Script alternativo que también ejecuta `node index.js`
- **`app`**: Ejecuta el archivo TypeScript directamente con `node app.ts`
- **`test`**: Configurado para ejecutar `node index.js` (podría ser personalizado para tests reales)

### Scripts de Build y Limpieza
- **`build`**: Compila el archivo `app.ts` usando TypeScript compiler (`tsc`)
- **`clean`**: Elimina el archivo JavaScript compilado (`app.js`) usando `rimraf`
- **`traspile`**: Script compuesto que primero limpia y luego compila

## Comandos Útiles para Scripts

### Listar todos los scripts disponibles
```bash
npm run
yarn run
pnpm run
```

### Ver información del script
```bash
npm run-script --if-present build
```

### Ejecutar script solo si existe
```bash
npm run build --if-present
```

## Mejores Prácticas

1. **Nombres descriptivos**: Usa nombres claros para tus scripts
   ```json
   {
     "scripts": {
       "dev:server": "nodemon server.js",    // ✅ Claro
       "ds": "nodemon server.js"             // ❌ Ambiguo
     }
   }
   ```

2. **Consistencia**: Mantén convenciones consistentes
   ```json
   {
     "scripts": {
       "build": "tsc",
       "build:watch": "tsc --watch",
       "build:prod": "tsc --production"
     }
   }
   ```

3. **Documentación**: Comenta scripts complejos
   ```json
   {
     "scripts": {
       "deploy": "npm run build && npm run test && node scripts/deploy.js",
       "deploy:staging": "cross-env ENV=staging npm run deploy"
     }
   }
   ```

4. **Validación**: Incluye scripts de validación
   ```json
   {
     "scripts": {
       "precommit": "npm run lint && npm run test",
       "validate": "npm run lint && npm run test && npm run build"
     }
   }
   ```

## Debugging de Scripts

### Ver qué comando se ejecuta exactamente
```bash
npm run build --dry-run
```

### Ejecutar con más información
```bash
npm run build --verbose
```

### Ver la configuración de npm
```bash
npm config list
```