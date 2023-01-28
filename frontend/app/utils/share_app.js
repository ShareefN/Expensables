import { Share, Platform } from 'react-native';
import { getShareableLinks } from '../controllers/sharables';
import { logEvent } from '../controllers/firebase';

export const shareApp = async () => {
    let _platform = Platform.OS.toLocaleLowerCase();
    let link = await getShareableLinks();
    link = link ? link[_platform ?? ''] : undefined;

    await Share.share({ message: `I found this awesome app that helps me prep my message for parking in the UAE. It's free to use for now. ${link ?? 'yourself'}!` }).then(() => logEvent('share'));
}