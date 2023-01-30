import { createColelctionApi, getCollectionsApi } from '../api/private';
import { collections, setActive } from '../features/collectionSlice';
import { setLoading } from '../features/loadingSlice';
import { dispatchAction } from '../utils/global_dispatch';
import { storeCollectionId } from '../utils/persisted_storage';
import { getExpenses } from './expenses';

export const getCollections = async () => {
    dispatchAction(setLoading(true))

    const { data } = await getCollectionsApi();
    dispatchAction(collections(data));

    dispatchAction(setLoading(false))
}

export const createCollection = async (paylaod) => {
    dispatchAction(setLoading(true));

    const { data } = await createColelctionApi(paylaod)

    dispatchAction(setActive(data))
    await getExpenses('out')

    storeCollectionId(data._id);
}