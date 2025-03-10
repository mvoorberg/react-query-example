import * as React from 'react';
import { PropsWithChildren, useReducer } from 'react';
import { User } from '@/types';

interface UserActionInterface {
  type: 'login' | 'logout';
  payload: User | null;
}

interface IUserProvider {
  user: User;
  dispatch: React.Dispatch<UserActionInterface>;
}

const UserContext = React.createContext<IUserProvider | null>(null);

function userReducer(state: User, action: UserActionInterface): User {
  console.log('userReducer', action.type, { state, action });

  switch (action.type) {
    case 'login': {
      state = action.payload || {
        id: state.id,
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        gender: state.gender,
      };
      return state;
    }
    case 'logout': {
      return action.payload || {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function UserProvider({ children }: PropsWithChildren) {
  const initialState: User = {
    first_name: '',
    last_name: '',
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  const value = { user: state, dispatch };

  // const value: IUserProvider = {
  //   count: {
  //     id: 123,
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'admin',
  //   },
  //   dispatch: () => {},
  // };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserContext, UserProvider, useUserContext };
