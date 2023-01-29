import { aggregatorApi } from '../api/private';
import { storeCollectionId, readCollectionId } from '../utils/persisted_storage';
import { dispatchAction } from '../utils/global_dispatch';
import { setUser } from '../features/userSlice';
import { collections, setActive } from '../features/collectionSlice';
import { expenses, total } from '../features/expensesSlice';

export const getAggregatedData = async (type) => {
    let collectionId = await readCollectionId();

    let query = {};

    if (type) query.type = type;
    if (collectionId) query.collectionId = collectionId;

    const { data } = await aggregatorApi(query);

    dispatchAction(setUser(data.user))
    dispatchAction(collections(data.collections))
    dispatchAction(expenses(data.expenses))
    dispatchAction(total(data.total))

    if (!collectionId && data.expenses.length > 0) storeCollectionId(data.expenses[0].collectionId)

    if (collectionId) {
        const _collection = data.collections.find((elm) => elm._id == collectionId);
        return dispatchAction(setActive(_collection))
    }

    return dispatchAction(setActive(data._collection[data._collection.length - 1]))

}