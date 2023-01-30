import React, { useState } from 'react';
import { View } from 'react-native';
import MainButton from '../buttons/main_button';
import { styles } from '../../constants/styles';
import PrimaryInput from '../inputs/primary_input';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../features/categorySlice';

export default function CreateExpense() {
    const categories = useSelector(selectCategories);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <View style={[styles.full_width_height, styles.default_horizontal_padding, styles.dead_container]}>
            <View style={styles.dead_container_small} />
            <DropDownPicker
                open={open}
                value={value}
                items={[]}
                autoScroll={true}
                searchable={true}
                setOpen={setOpen}
                setValue={setValue}
            // setItems={[]}
            />
            <PrimaryInput title="Amount" action={(v) => console.log(v)} submitAction={() => console.log('')} maxlength={6} type="numeric" />
            <View style={styles.dead_container_small} />
            <MainButton title="Create Expenses" action={() => console.log('')} margin={0} />
        </View>
    )
}
