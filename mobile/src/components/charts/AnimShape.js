// @flow

import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Shape } from 'react-native/Libraries/ART/ReactNativeART';
import Morph from 'art/morph/path';

type Props = {
  color: string,
  d: () => any,
};

type State = {
  path: string,
};

const ANIMATION_DURATION = 300;

class AnimShape extends Component<void, Props, State> {
  state = {
    path: '',
  };

  componentWillMount() {
    this._computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this._computeNextState(nextProps);
  }

  _previousGraph: any;
  _animating: any;

  // Animations based on: https://github.com/hswolff/BetterWeather
  _computeNextState(nextProps: Props) {
    const graph = this.props.d();

    this.setState({
      path: graph.path,
    });

    if (!this._previousGraph) {
      this._previousGraph = graph;
    }

    if (this.props !== nextProps) {
      const pathFrom = this._previousGraph.path;
      const pathTo = graph.path;

      cancelAnimationFrame(this._animating);

      this._animating = null;

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          ANIMATION_DURATION,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      );

      this.setState(
        {
          path: Morph.Tween(pathFrom, pathTo),
        },
        () => {
          this._animate();
        },
      );

      this._previousGraph = graph;
    }
  }

  _animate(start) {
    this._animating = requestAnimationFrame(timestamp => {
      if (!start) {
        start = timestamp; // eslint-disable-line
      }

      const delta = (timestamp - start) / ANIMATION_DURATION;

      if (delta > 1) {
        this._animating = null;

        this.setState({
          path: this._previousGraph.path,
        });

        return;
      }

      // $FlowFixMe
      this.state.path.tween(delta);

      this.setState(this.state, () => {
        this._animate(start);
      });
    });
  }

  render() {
    return (
      <Shape
        d={this.state.path}
        fill={this.props.color}
        stroke={this.props.color}
      />
    );
  }
}

export default AnimShape;
