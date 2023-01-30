import { getAggregatedData } from './aggregator';
import { getCategories } from './categories';
import { initInstance } from '../api/private';
import { retreiveUserToken } from '../utils/store_encryption';

export const init = async (token) => {

    token ??= await retreiveUserToken();

    await initInstance(JSON.parse(token))
    Promise.all([getAggregatedData('out'), getCategories()]);
}