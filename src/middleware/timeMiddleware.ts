import type { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

export function convertDatesToMinsk(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    res.send = function (body: any): Response<any> {
        if (typeof body === 'string') {
            try {
                const parsedBody = JSON.parse(body);
                const transformedBody = transformDates(parsedBody);
                return originalSend.call(res, JSON.stringify(transformedBody));
            } catch (error) {
                return originalSend.call(res, body);
            }
        }
        return originalSend.call(res, body);
    };

    next();
}

function transformDates(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(transformDates);
    } else if (obj && typeof obj === 'object') {
        const result: any = {};
        for (const key in obj) {
            if (typeof obj[key] === 'string' && isDateString(obj[key])) {
                result[key] = DateTime.fromISO(obj[key]).setZone('Europe/Minsk').toISO();
            } else if (obj[key] instanceof Date) {
                result[key] = DateTime.fromJSDate(obj[key])
                    .setZone('Europe/Minsk')
                    .toISO();
            } else if (typeof obj[key] === 'object') {
                result[key] = transformDates(obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }
    return obj;
}

function isDateString(str: string): boolean {
    const date = DateTime.fromISO(str);
    return date.isValid;
}
