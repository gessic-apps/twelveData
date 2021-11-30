import { Request, Response, NextFunction } from 'express';

const getHealth = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json('Working well');
};

export default { getHealth };
