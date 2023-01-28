import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashLogo from '../assets/splash.svg';
import { useDispatch } from 'react-redux';
import { setLoading } from '../features/loading/loadingSlice';

function Splash() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading({ loading: true }))

        return () => {
            dispatch(setLoading({ loading: false }))
        }
    }, [])

    return (
        <View style={styles.container}>
            <SplashLogo width={300} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Splash;