// @flow
// Used to fade in content after loading.

import React, { Component } from 'react';
import { Animated } from 'react-native';

type Props = {
  enabled: boolean,
};

type State = {
  anim: Animated.Value,
};

class FadeInWrapper extends Component<void, Props, State> {
  state = {
    anim: new Animated.Value(this.props.enabled ? 0 : 1),
  };

  componentDidMount() {
    if (this.props.enabled) {
      Animated.timing(this.state.anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.anim, flex: 1 }}>
        <Component {...this.props} />
      </Animated.View>
    );
  }
}

export default FadeInWrapper;
