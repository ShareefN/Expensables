import { getCollectionsApi } from '../api/private';
import { collections, setActive } from '../features/collectionSlice';
import { setLoading } from '../features/loadingSlice';
import { dispatchAction } from '../utils/global_dispatch';
import { storeCollectionId, readCollectionId } from '../utils/persisted_storage';

export const getCollections = async () => {
    dispatchAction(setLoading(true))

    const { data } = await getCollectionsApi();
    dispatchAction(collections(data));

    dispatchAction(setLoading(false))
}