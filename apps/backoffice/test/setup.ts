import { register } from 'tsconfig-paths';
import * as path from 'path';
import { config } from 'dotenv';

// Load test environment variables
config({ path: path.resolve(__dirname, '../.env.test') });

// Register tsconfig paths
register({
    baseUrl: path.resolve(__dirname, '..'),
    paths: {
        '@auth': ['./src/modules/auth/index.ts'],
        '@bootstrap': ['./src/bootstrap/index.ts'],
        '@core': ['./src/core/index.ts'],
        '@role': ['./src/modules/role/index.ts'],
        '@user': ['./src/modules/user/index.ts'],
        'modules/*': ['./src/modules/*'],
        'bootstrap/*': ['./src/bootstrap/*'],
        'core/*': ['./src/core/*'],
    },
});