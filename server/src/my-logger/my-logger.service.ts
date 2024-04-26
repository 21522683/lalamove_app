import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    log(message: any, stack?: string, context?: string) {
        super.log(message, context)
    }

    error(message: any,  stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`
        super.error(message, stackOrContext)
    }
}
