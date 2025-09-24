import type { Request, Response } from "express";
export declare const saveGitHubUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchUsers: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const softDeleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listUsers: (req: Request, res: Response) => Promise<void>;
export declare const getRepos: (req: Request, res: Response) => Promise<void>;
export declare const getFollowers: (req: Request, res: Response) => Promise<void>;
export declare const getFriends: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=userController.d.ts.map