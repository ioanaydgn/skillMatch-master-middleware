import dotenv from 'dotenv';
dotenv.config();
import app from '@app';
import { logger } from '@utils';
import Database from './database/connection.database';

const port: number = 8080;

async function onServerBoot() {
  const functionName: string = 'onServerBoot';
  try {
    await Database.startConnection();
    logger.logMessage(functionName, 'Server is booted on port ' + port);
  } catch (e: any) {
    logger.logError(functionName, e);
  }
}

function main() {
    const functionName: string = 'main';
    try {
        app.listen(port, onServerBoot);
    } catch (e: any) {
        logger.logError(functionName, e);
    }
}

main();