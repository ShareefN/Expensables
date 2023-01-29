import { getExpensesApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { expenses, total } from '../features/expensesSlice';
import { readCollectionId } from '../utils/persisted_storage';
import { errorToast } from '../components/toast/toast';
import { setLoading } from '../features/loadingSlice';

export const getExpenses = async (type) => {
    let collectionId = await readCollectionId();

    if (!collectionId) return errorToast('Missing Collection', 'Create a collection to start tracking expenses');

    dispatchAction(setLoading(true))

    const { data } = await getExpensesApi(collectionId, type);

    dispatchAction(expenses(data.expenses))
    dispatchAction(total(data.total))

    dispatchAction(setLoading(false))
}