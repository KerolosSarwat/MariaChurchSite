'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToAppConfig, normalizeAppConfig, DEFAULT_APP_CONFIG } from '../lib/appConfig';

const AppConfigContext = createContext({
  config: normalizeAppConfig(DEFAULT_APP_CONFIG),
  status: 'loading',
});

/**
 * Provides the live RTDB `/config` to the whole app.
 * status: 'loading' | 'live' | 'rest' | 'default'
 */
export function AppConfigProvider({ children }) {
  const [state, setState] = useState({
    config: normalizeAppConfig(DEFAULT_APP_CONFIG),
    status: 'loading',
  });

  useEffect(() => {
    const unsubscribe = subscribeToAppConfig((config, source) => {
      setState({ config, status: source });
    });
    return unsubscribe;
  }, []);

  return <AppConfigContext.Provider value={state}>{children}</AppConfigContext.Provider>;
}

export function useAppConfig() {
  return useContext(AppConfigContext);
}
