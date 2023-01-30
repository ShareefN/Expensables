import { dispatchAction } from '../utils/global_dispatch';
import { categoriesApi } from '../api/private';
import { setCategories } from '../features/categorySlice';
import { errorToast } from '../components/toast/toast';
import { errorMsg } from '../constants/error_messages';

export const getCategories = () => {
    categoriesApi().then(({ data }) => { dispatchAction(setCategories(data)) }).catch((error) => errorToast(errorMsg[error?.code]?.title ?? '', errorMsg[error?.code]?.content ?? ''))
}

