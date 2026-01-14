import React, { useEffect } from "react";
import type { Loadable } from "./types";

export const useLoadable = <T>(
  getLoadable: () => Promise<T>,
  deps?: React.DependencyList,
): Loadable<T> => {
  const [state, setState] = React.useState<Loadable<T>>();

  const execute = async () => {
    try {
      const result = await getLoadable();
      setState(result);
    } catch {
      setState(null);
    }
  };

  useEffect(() => {
    execute();
  }, deps);

  return state;
};
