import * as React from 'react';
import { PropsWithChildren, useMemo, useReducer } from 'react';

interface MyCount {
  count: number;
}

interface ICountProvider {
  count: MyCount;
  dispatch: React.Dispatch<'increment' | 'decrement'>;
}

const CountContext = React.createContext<ICountProvider | null>(null);

function countReducer(
  state: MyCount,
  action: 'increment' | 'decrement'
): MyCount {
  switch (action) {
    case 'increment': {
      return { count: state.count + 1 };
    }
    case 'decrement': {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function CountProvider({ children }: PropsWithChildren) {
  // const [state, dispatch] = useReducer(countReducer, { });
  // NOTE: you *might* need to memoize this value
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const memoizedCount = useMemo(
    () => ({ count: state, dispatch }),
    [state, dispatch]
  );

  return (
    <CountContext.Provider value={memoizedCount}>
      {children}
    </CountContext.Provider>
  );
}

function useCount() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { CountProvider, useCount };
