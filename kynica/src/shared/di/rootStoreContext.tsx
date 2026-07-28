import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { RootStore } from "../stores/rootStore.ts";

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const rootStore = useMemo(() => new RootStore(), []);

  useEffect(() => {
    return () => {
      rootStore.dispose();
    };
  }, [rootStore]);

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useRootContext need use in RootStoreProvider");
  }
  return context;
};
