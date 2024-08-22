export const config = {
    runner: 'local',
    path: '/',
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-web-security',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars',
                '--disable-extensions',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI,BlinkGenPropertyTrees',
                '--disable-software-rasterizer'
            ],
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
};


browser.addCommand('launchOpenFinWorkspace', async function (config) {
    const fin = await fin.Application.start(config);
    return fin;
});

describe('OpenFin Workspace', () => {
    it('should launch the Workspace and check the title', async () => {
        // Define OpenFin Workspace configuration
        const workspaceConfig = {
            uuid: 'openfin-workspace-uuid',
            url: 'http://localhost:8080/platform/index.html',
            name: 'OpenFin Workspace',
            nonPersistent: true,
            runtime: {
                version: 'stable',
                arguments: '--v=1'
            }
        };

        // Launch the OpenFin Workspace using the custom command
        const workspaceApp = await browser.launchOpenFinWorkspace(workspaceConfig);

        // Wait for the main window to exist
        const mainWindow = await workspaceApp.getWindow();
        await mainWindow.waitForExist();

        // Validate the title of the main window
        const title = await mainWindow.getTitle();
        expect(title).toEqual('Expected Workspace Title');
    });
});


it('should switch to the newly opened window', async () => {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    const url = await browser.getUrl();
    expect(url).toContain('expected-url-part');
});
