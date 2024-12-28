declare module '@config/appConfigs' {
    export type AppConfigs = {
        environment: string;
        serverConfig: {
            port: number,
        },
        databaseConfigs: {
            host: string;
            port: string | number;
            database: string;
            username: string;
            password: string;
        },
        toString: () => string;
    };
}
