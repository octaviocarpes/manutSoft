import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class BotaoCheck extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pressed } = this.props;
        return (
            <View style={styles.container}>
            {pressed && <Icon name='md-checkmark-circle' size={35} color='#00dc7b' />}
            {!pressed && <Icon name='md-radio-button-off' size={35} color='#9b9b9b' />}
            </View>
        );
    }
}

BotaoCheck.propTypes = {
    pressed: PropTypes.bool
};

BotaoCheck.defaultProps = {
    pressed: false
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        marginTop: -40
    }
});

export default BotaoCheck;