import { sharableLinksApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { setLoading } from '../features/loading/loadingSlice';

export const getShareableLinks = async () => {
    dispatchAction(setLoading({ loading: true }))
    let links;

    try {
        links = await sharableLinksApi();
        dispatchAction(setLoading({ loading: false }))
        return links.data;
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        return null;
    }
}