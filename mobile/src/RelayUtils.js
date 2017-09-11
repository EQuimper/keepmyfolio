// @flow
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Animated } from 'react-native';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { QueryRenderer } from 'react-relay';
import EventEmitter from 'event-emitter';

import network from './network';
import Loading from './components/Loading';
import EmptyStateView from './components/commons/EmptyStateView';

type Variables = { [name: string]: mixed };

type Config = {
  query?: any,
  queries?: { [name: string]: any },
  queriesParams?: ?(props: Object) => Object,
  fragments?: { [name: string]: any } | any,
  initialVariables?: Variables,
  prepareVariables?: (prevVariables: Variables, route: any) => Variables,
  forceFetch?: boolean,
  onReadyStateChange?: (readyState: any) => void,
  renderFetched?: (props: Object) => ?React.Element<*>,
  renderLoading?: () => ?React.Element<*>,
  renderFailure?: (error: Error, retry?: () => void) => ?React.Element<*>,
};

const handlerProvider = null;

const createRelayEnvironment = () => {
  const source = new RecordSource();
  const relayStore = new Store(source);
  const modern = new Environment({
    network,
    store: relayStore,
    handlerProvider,
  });

  return modern;
};

const relayEnvironmentEmitter = new EventEmitter();
const _relayEnvironment = createRelayEnvironment();

export function getStore() {
  return _relayEnvironment;
}

function createRendererInternal(Component: any, config: Config): any {
  const {
    query,
    queriesParams,
    forceFetch,
    renderFetched,
    renderLoading,
    renderFailure,
  } = config;

  // Used to fade in content after loading.
  class FadeInWrapper extends React.Component<
    void,
    {
      enabled: boolean,
    },
    {
      anim: Animated.Value,
    },
  > {
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

  class RelayRendererWrapper extends React.Component<
    void,
    Object,
    { params: Object, relayEnvironment: any, hasError: boolean },
  > {
    state = {
      params: queriesParams ? queriesParams(this.props) : {},
      relayEnvironment: _relayEnvironment,
      hasError: false,
    };

    componentDidMount() {
      relayEnvironmentEmitter.on('change', this._onEnvironmentChange);
    }

    componentWillReceiveProps(nextProps: Object) {
      const params = queriesParams ? queriesParams(this.props) : {};
      const nextParams = queriesParams ? queriesParams(nextProps) : {};
      if (JSON.stringify(params) !== JSON.stringify(nextParams)) {
        this.setState({
          params: nextParams,
        });
      }
    }

    componentWillUnmount() {
      relayEnvironmentEmitter.off('change', this._onEnvironmentChange);
    }

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    _showedLoading = false;
    _showedLoadingTimeout: any;

    _onEnvironmentChange = env => {
      this.setState({ relayEnvironment: env });
    };

    _clearError = () => {
      this.setState({ hasError: false });
    };

    render() {
      const render = ({ error, props, retry }) => {
        if (error) {
          if (renderFailure) {
            return renderFailure(error, retry);
          }
        } else if (props) {
          clearTimeout(this._showedLoadingTimeout);
          if (renderFetched) {
            return renderFetched({ ...this.props, ...props });
          }
          return (
            <FadeInWrapper
              {...this.props}
              {...props}
              enabled={this._showedLoading}
            />
          );
        } else if (renderLoading) {
          // This is called everytime even if data is in cache so wait 100 ms
          // to see if we actually loaded from network.
          this._showedLoadingTimeout = setTimeout(
            () => (this._showedLoading = true),
            100,
          );
          return renderLoading();
        }
        return undefined;
      };

      if (this.state.hasError) {
        return (
          <EmptyStateView
            title="OOPS!"
            subTitle="Something went wrong, please try again."
          />
        );
      }

      return (
        <QueryRenderer
          query={query}
          environment={this.state.relayEnvironment}
          render={render}
          variables={this.state.params}
          cacheConfig={{ force: !!forceFetch }}
        />
      );
    }
  }

  // $FlowFixMe
  RelayRendererWrapper.route = Component.route;

  return RelayRendererWrapper;
}

export function createRenderer(Component: any, config: Config): any {
  return createRendererInternal(Component, {
    renderLoading: () => <Loading />,
    renderFailure: error => {
      // Not sure if there's a better way to check if it's a network error...
      if (error.message.toLowerCase().includes('network request failed')) {
        return (
          <EmptyStateView
            title="OOPS!"
            subTitle="Something went wrong, please try again."
          />
        );
      }
      return (
        <EmptyStateView
          title="OOPS!"
          subTitle="Something went wrong, please try again."
        />
      );
    },
    ...config,
  });
}
