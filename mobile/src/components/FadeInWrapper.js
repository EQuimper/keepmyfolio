// @flow

import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Props = {
  enabled: boolean,
};

type State = {
  anim: Animated.Value,
};

class FadeInWrapper extends PureComponent<Props, State> {
  state = {
    anim: new Animated.Value(this.props.enabled ? 0 : 1),
  };

  componentDidMount() {
    if (this.props.enabled) {
      Animated.timing(this.state.anim, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.root, { opacity: this.state.anim }]}>
        <PureComponent {...this.props} />
      </Animated.View>
    );
  }
}

export default FadeInWrapper;
