import { getHistoryApi, setHistoryItemApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { setLoading } from '../features/loading/loadingSlice';
import { errorToast } from '../components/toast/toast';
import { setHistory } from '../features/history/historySlice';

export const getHistory = () => {
    dispatchAction(setLoading({ loading: true }))

    getHistoryApi(false).then(({ data }) => {
        dispatchAction(setHistory(data))
        dispatchAction(setLoading({ loading: false }))
    }).catch((error) => {
        dispatchAction(setLoading({ loading: false }))
        errorToast('History Error', 'We faced an issue getting your parking data, Try again')
    })
}

export const toggleVisibility = async (id, hide, value) => {
    dispatchAction(setLoading({ loading: true }))
    try {
        await setHistoryItemApi(id, hide)
        getHistory()
    } catch (error) {
        errorToast('Toggle Error', 'We faced an issue updating your parking, Try again')
        dispatchAction(setLoading({ loading: false }))
    }
}