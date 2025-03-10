import { RoutingProvider } from './routing-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ToasterProvider } from './toaster-provider';
import { UserProvider } from './user-provider';
// import { CountProvider } from './count-provider';

export function AppProvider() {
  return (
    // <CountProvider>
    <UserProvider>
      <ReactQueryProvider>
        <RoutingProvider />
        <ToasterProvider />
      </ReactQueryProvider>
    </UserProvider>
    // </CountProvider>
  );
}
