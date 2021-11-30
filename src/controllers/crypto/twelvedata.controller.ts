import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CURRENCY_FORMAT } from '../../enums/crypos';
import { Price } from '../../interfaces/crypto';
import logging from '../../config/logger';

const NAMESPACE = 'Twelvedata Controller';

const getPrice = async (req: Request, res: Response, next: NextFunction) => {
    const pricingResults: Price[] = [];

    for (const currFormat of CURRENCY_FORMAT) {
        const cryptoNameVariable = `${currFormat.cryptoAbbreviation.toLocaleLowerCase()}/${currFormat.currencyAbbreviation.toLocaleLowerCase()}`;
        const result: AxiosResponse = await axios.get(`https://api.twelvedata.com/price?symbol=${cryptoNameVariable}&apikey=${process.env.TWELVE_DATA_API_KEY}`);

        if (result.status === 200 && result.data.price) {
            pricingResults.push({
                name: cryptoNameVariable,
                price: parseFloat(result.data.price)
            });
        } else {
            logging.error(NAMESPACE, 'Twelvedata result error', result.data.status);
        }
    }
    return res.status(200).json(pricingResults);
};

export default { getPrice };
