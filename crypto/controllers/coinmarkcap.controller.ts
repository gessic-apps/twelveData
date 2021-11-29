import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';


interface Price {
    name: string;
    price: number;
}

const getPrice = async (req: Request, res: Response, next: NextFunction) => {

    const result: AxiosResponse =
        await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.COINMARKCAP_API_KEY}`);

    console.log(result.data);


    return res.status(200).json();
};

export default { getPrice }