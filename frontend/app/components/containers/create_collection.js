import React, { useState } from 'react';
import { View } from 'react-native';
import PrimaryInput from '../inputs/primary_input';
import { styles } from '../../constants/styles';
import MainButton from '../buttons/main_button';
import { createCollection } from '../../controllers/collections';

export default function CreateCollection({ close }) {
    const [title, setTitle] = useState('');

    onSubmitPress = async () => {
        if (title.length <= 0) return;

        await createCollection({ title })

        close()
    }

    return (
        <View style={[styles.full_width_height, styles.dead_container, styles.default_horizontal_padding]}>
            <PrimaryInput title="Collection Name" action={(v) => setTitle(v)} submitAction={() => onSubmitPress()} maxlength={25} />
            <View style={styles.dead_container_small} />
            <MainButton title="Create Collection" action={() => onSubmitPress()} margin={0} />
        </View>
    )
}
