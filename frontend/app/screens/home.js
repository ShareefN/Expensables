import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { routes } from '../constants/routes';
import { styles } from '../constants/styles';
import ConfirmationDialog from '../components/dialog/confirmation_dialog';
import BottomUpModal from '../components/modal/bottom_up_modal';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, selectLoading } from '../features/loadingSlice';
import { errorToast } from '../components/toast/toast';
import { selectUser } from '../features/userSlice';
import TotalSpending from '../components/containers/total_spending';

export default function Home({ navigation }) {
    const loading = useSelector(selectLoading);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [content, setContent] = useState(null)
    const [dialogContent, setDialogContent] = useState({
        visible: false,
        title: null,
        message: null,
        action: null,
        dismiss: null
    });

    console.log(user);
    return (
        <View style={styles.container}>
            <TotalSpending total={0} currency={user.currency ?? ''} />
            <ConfirmationDialog content={dialogContent} />
            <BottomUpModal content={content} close={() => setContent(null)} />
        </View>
    );
}


