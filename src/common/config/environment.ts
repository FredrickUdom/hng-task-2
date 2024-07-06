import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const configService = new ConfigService();

interface IEnvironment {
  DATABASE: {
    TYPE: any;
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    NAME: string;
  };
  SESSION_SECRET: {
    SECRET: string;
  };
  SESSION_NAME: {
    NAME: string;
  };
  PROJECT_PORT: {
    PORT: number;
  };
  JWT_SECRET: {
    SECRET: string;
  };
  JWT_EXPIRES_IN: {
    EXPIRES_IN: number;
  };



  CORS: {
    CORSORIGIN: string;
  };
}

export const environment: IEnvironment = {
  DATABASE: {
    TYPE: configService.getOrThrow('DB_TYPE'),
    HOST: configService.getOrThrow('DB_HOST'),
    PORT: configService.getOrThrow('DB_PORT'),
    USERNAME: configService.getOrThrow('DB_USERNAME'),
    PASSWORD: configService.getOrThrow('DB_PASSWORD'),
    NAME: configService.getOrThrow('DB_NAME'),
  },
  SESSION_SECRET: {
    SECRET: configService.getOrThrow('SESSION_SECRET'),
  },
  SESSION_NAME: {
    NAME: configService.getOrThrow('SESSION_NAME'),
  },
  CORS: {
    CORSORIGIN: configService.getOrThrow('CORS_ORIGIN'),
  },
  JWT_SECRET: {
    SECRET: configService.getOrThrow('JWT_SECRET'),
  },
  JWT_EXPIRES_IN:{
    EXPIRES_IN: configService.getOrThrow('JWT_EXPIRESIN'),
  },
  PROJECT_PORT: {
    PORT: configService.getOrThrow('PROJECT_PORT'),
  },
 
};