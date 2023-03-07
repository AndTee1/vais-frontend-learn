import { defineConfig } from 'cypress';

module.exports = defineConfig({
    projectId: 'z2zi1j',
    e2e: {
        defaultCommandTimeout: 20000,
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
            console.log(on, config);
        },
        experimentalStudio: true,
    },
});
