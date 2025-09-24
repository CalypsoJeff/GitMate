import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
export declare const validateBody: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map