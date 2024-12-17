declare module '@config/appConfigs' {
    export type AppConfigs = {
        environment: string;
        databaseConfigs: {
            host: string | number;
            port: string | number;
            name: string;
            password: string;
        };
    };
}
