import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Tooltip, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
 
class Dica extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pressed: true };
  }
  render() {
    const { children, dica } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState(state => ({pressed: !state.pressed }))}
      >
        <View>
          <Tooltip
            backgroundColor='#7500CF'
            width={200}
            popover={<Text style={{ color: 'white', fontWeight:'300' }}>{dica}</Text>} 
            toggleOnPress={this.state.pressed}>
              {children}
          </Tooltip>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default Dica;

Dica.propTypes = {
  children: PropTypes.node.isRequired,
  dica: PropTypes.string.isRequired,
  onPress: PropTypes.bool
}