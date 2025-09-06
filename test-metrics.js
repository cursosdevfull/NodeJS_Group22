const http = require('http');

function testMetricsEndpoints() {
    console.log('Testing metrics endpoints...\n');

    // Test simple metrics endpoint
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/metrics/simple',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('=== SIMPLE METRICS RESPONSE ===');
            console.log(JSON.stringify(JSON.parse(data), null, 2));
            console.log('\n');

            // Test complete metrics endpoint
            testCompleteMetrics();
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}

function testCompleteMetrics() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/metrics',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('=== COMPLETE METRICS RESPONSE ===');
            console.log(JSON.stringify(JSON.parse(data), null, 2));
            console.log('\nTest completed successfully!');
            process.exit(0);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}

// Wait a moment for server to start, then test
setTimeout(testMetricsEndpoints, 2000);
