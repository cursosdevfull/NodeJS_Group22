# Monorepo con Turbo

Este proyecto utiliza **Turbo** para gestionar un monorepo eficiente con múltiples aplicaciones y librerías compartidas.

### Estructura del Proyecto

```
NodeJS_Group22/
├── apps/                    # Aplicaciones principales
│   ├── backoffice/         # Aplicación de administración
│   ├── delivery/           # Aplicación de delivery
│   └── store/              # Aplicación de tienda
├── libs/                   # Librerías compartidas
│   ├── commons/            # Utilidades comunes
│   ├── constants/          # Constantes globales
│   └── utils/              # Funciones de utilidad
├── package.json            # Configuración principal
└── turbo.json             # Configuración de Turbo
```

### Tecnologías Implementadas

- **Turbo**: Para gestión de monorepo y optimización de builds
- **npm workspaces**: Para gestión de dependencias entre paquetes
- **Biome**: Para linting y formateo de código
- **TypeScript**: Para tipado estático

### Scripts Principales

#### Scripts de Turbo
```bash
# Construir todos los paquetes
npm run build

# Formatear y lintear código en todos los paquetes
npm run format-and-lint:fix

# Formatear y lintear un paquete específico
npm run format-and-lint:fix -- -F [nombre-paquete]
```

#### Scripts de Biome
```bash
# Verificar código sin corregir
npm run biome-check

# Verificar y corregir automáticamente
npm run biome-check:fix
```

### Configuración de Turbo

El archivo `turbo.json` está configurado con:

- **Tareas de build**: Con dependencias optimizadas (`dependsOn: ["^build"]`)
- **Cache de outputs**: Para mejorar performance
- **Integración con Biome**: Para formateo y linting

### Workspaces

Cada aplicación y librería es un workspace independiente con su propio `package.json` y puede tener:
- Dependencias específicas
- Scripts personalizados
- Configuraciones individuales

### Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Construir todo el proyecto
npm run build

# Linting y formateo
npm run format-and-lint:fix

# Trabajar con un paquete específico
npm run build -- -F store
npm run format-and-lint:fix -- -F delivery
```

### Ventajas del Setup Actual

1. **Cache inteligente**: Turbo optimiza los builds evitando recompilaciones innecesarias
2. **Ejecución paralela**: Los paquetes se procesan en paralelo cuando es posible
3. **Gestión centralizada**: Scripts y configuraciones compartidas
4. **Escalabilidad**: Fácil agregar nuevas apps o librerías
5. **Calidad de código**: Formateo y linting automatizado con Biome