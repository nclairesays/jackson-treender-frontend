
import React from 'react';
import {
    AsyncStorage,
    Button,
    StyleSheet,
    View,
    Text
} from 'react-native';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the Jackson Treender App!',
    };

    render() {
        return (
            <View style={styles.container}>
               <Text>HOME SCREEN</Text>    
                <Button title="Log OUT!" onPress={this._logOutAsync} />

            </View>
        );
    }

    _logOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});