import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigation from './navigation/index';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider } from 'react-native-paper';
import Loadingindicator from './components/indicators/loading_indicator';
import { checkVersion } from "react-native-check-version";
import BottomUpModal from './components/modal/bottom_up_modal';
import UpdateRequiered from './components/containers/update_required';

export default function App() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    (async () => {
      const version = await checkVersion();

      if (version.needsUpdate) {
        setContent(<UpdateRequiered close={() => setContent(null)} />)
      }
    })()
  }, [])

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <PaperProvider>
            <AppNavigation />
            <Loadingindicator />
          </PaperProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast />
      <BottomUpModal content={content} close={() => setContent(null)} />
    </Provider>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 } })