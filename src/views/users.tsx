import { UserTable } from '@/components';
import { useUsers } from '@/api';
import { useUserContext } from '@/providers/user-provider';

export function Users() {
  const users = useUsers();

  // use a custom hook to get the user context
  const userCtx = useUserContext();

  return (
    <div>
      <h2 className="mb-4">Basic Query Example</h2>
      <h3 className="mb-2">
        User: {userCtx.user.first_name + ' ' + userCtx.user.last_name}
      </h3>
      <i>Click any Name to login. Click any Id to logout.</i>

      <div>
        {users.isLoading && (
          <div className="py-2 text-teal-900 font-bold">Loading...</div>
        )}

        {users.isFetching && (
          <div className="py-2 text-teal-900 font-bold">Fetching...</div>
        )}

        {users.error instanceof Error && <div>{users.error.message}</div>}

        {users.isSuccess && (
          <div>
            <UserTable users={users.data} />
          </div>
        )}
      </div>
    </div>
  );
}
