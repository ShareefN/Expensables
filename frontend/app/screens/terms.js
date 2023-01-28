import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { styles } from '../constants/styles';
import { Button } from 'react-native-paper';
import { secondary } from '../constants/theme';
import RenderHtml from 'react-native-render-html';
import { source } from '../constants/html_terms';

export default function Terms({ navigation }) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Button icon="arrow-left" style={styles.back_button_container} onPress={() => navigation.goBack()} textColor={secondary} />
            <ScrollView style={styles.default_horizontal_padding}>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                />
            </ScrollView>
        </View>
    )
}