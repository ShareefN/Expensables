import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { primary } from '../../constants/theme';

export default function PrimaryInput(props) {
    const { title, action, isSecure, type, value, submitAction, maxlength, multiline, numberoflines } = props;


    return (<TextInput
        label={title}
        mode='outlined'
        keyboardType={type}
        selectionColor={primary}
        value={value}
        maxLength={maxlength ?? 100}
        onChangeText={text => action(text)}
        autoCapitalize='none'
        returnKeyType='done'
        autoCorrect={false}
        numberoflines={numberoflines}
        multiline={multiline ?? false}
        showSoftInputOnFocus
        secureTextEntry={isSecure}
        style={styles.container}
        theme={styles.theme}
        onEndEditing={submitAction ? () => submitAction() : null}
    />);


}

const styles = StyleSheet.create({
    container: { marginTop: 10 }, theme: {
        colors: {
            primary: 'black',
            underlineColor: 'transparent',
            disabled: "gray",
            backdrop: 'red'
        }
    }
})