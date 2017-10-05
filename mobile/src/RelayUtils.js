// @flow
/* eslint-disable react/no-multi-comp */

import EventEmitter from 'event-emitter';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { QueryRenderer } from 'react-relay';

/**
 * COMPONENTS
 */
import EmptyStateView from './components/commons/EmptyStateView';
import Loading from './components/Loading';

/**
 * UTILS
 */
import network from './network';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

type Variables = { [name: string]: mixed };

type Config = {
  forceFetch?: boolean,
  fragments?: { [name: string]: any } | any,
  initialVariables?: Variables,
  onReadyStateChange?: (readyState: any) => void,
  prepareVariables?: (prevVariables: Variables, route: any) => Variables,
  queries?: { [name: string]: any },
  queriesParams?: ?(props: Object) => Object,
  query?: any,
  renderFailure?: (error: Error, retry?: () => void) => ?React.Node,
  renderFetched?: (props: Object) => ?React.Node,
  renderLoading?: () => ?React.Node,
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

export function getCache(query: any) {
  return _relayEnvironment.store.readQuery(query)[0];
}

export function getStore() {
  return _relayEnvironment;
}

function createRendererInternal(Component: any, config: Config): any {
  const {
    forceFetch,
    queriesParams,
    query,
    renderFailure,
    renderFetched,
    renderLoading,
  } = config;

  // Used to fade in content after loading.
  class FadeInWrapper extends React.Component<
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
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }

    render() {
      return (
        <Animated.View style={[styles.root, { opacity: this.state.anim }]}>
          <Component {...this.props} />
        </Animated.View>
      );
    }
  }

  class RelayRendererWrapper extends React.Component<
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
            subTitle="Something went wrong, please try again."
            title="OOPS!"
          />
        );
      }

      return (
        <QueryRenderer
          cacheConfig={{ force: !!forceFetch }}
          environment={this.state.relayEnvironment}
          query={query}
          render={render}
          variables={this.state.params}
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
            subTitle="Something went wrong, please try again."
            title="OOPS!"
          />
        );
      }
      return (
        <EmptyStateView
          subTitle="Something went wrong, please try again."
          title="OOPS!"
        />
      );
    },
    ...config,
  });
}
