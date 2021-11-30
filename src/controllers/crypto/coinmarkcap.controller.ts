import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CURRENCY_FORMAT } from '../../enums/crypos';
import { Price } from '../../interfaces/crypto';
import logging from '../../config/logger';

const NAMESPACE = 'Coinmark Controller';

const getPrice = async (req: Request, res: Response, next: NextFunction) => {
    const pricingResults: Price[] = [];
    const result: AxiosResponse = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.COINMARKCAP_API_KEY}`);

    if (result.data.status.error_code === 0) {
        const currencyData = result.data.data;
        for (const currFormat of CURRENCY_FORMAT) {
            const cryptoNameVariable = `${currFormat.cryptoAbbreviation.toLocaleLowerCase()}/${currFormat.currencyAbbreviation.toLocaleLowerCase()}`;
            const cryptoObject = currencyData.find((curr: any) => curr.symbol === currFormat.cryptoAbbreviation);
            pricingResults.push({
                name: cryptoNameVariable,
                price: parseFloat(cryptoObject.quote.USD.price)
            });
        }
    } else {
        logging.error(NAMESPACE, 'Coinmarketcap result error', result.data.status);
    }
    return res.status(200).json(pricingResults);
};

export default { getPrice };
