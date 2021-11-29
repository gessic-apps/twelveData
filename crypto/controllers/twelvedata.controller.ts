import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CURRENCY_FORMAT } from '../../common/enums/crypos';


interface Post {
    name: string;
    price: number;
}

const getPrice = async (req: Request, res: Response, next: NextFunction) => {

    const pricingResults: Post[] = []

    CURRENCY_FORMAT.forEach(async currFormat => {
        const cryptoNameVariable = `${currFormat.cryptAbbreviateion}/${currFormat.currencyAbbreviation}`;
        const result: AxiosResponse =
            await axios.get(`https://api.twelvedata.com/price?symbol=${cryptoNameVariable}&apikey=${process.env.TWELVE_DATA_API_KEY}`);

        pricingResults.push(
            {
                name: cryptoNameVariable,
                price: result.data.price
            }
        )
    });
    return res.status(200).json(pricingResults);
};

export default { getPrice }