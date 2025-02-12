declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_SECRET_REFRESH_TOKEN: string;
    JWT_REFRESH_EXPIRE_IN: string;
  }
}
