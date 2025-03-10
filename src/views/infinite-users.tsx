import { Fragment, useContext } from 'react';
import { useInfiniteUsers } from '@/api';
import { User } from '@/types';
import { UserContext } from '@/providers/user-provider';

export function InfiniteUsers() {
  const pageLimit = 10;
  const infiniteUsers = useInfiniteUsers({ pageLimit });
  let userList;

  if (infiniteUsers.data) {
    userList = infiniteUsers.data.pages.map((page, index) => (
      <Fragment key={index}>
        {page.data.map((user: User) => (
          <li key={user.id}>
            {user.id}. {user.first_name} {user.last_name}
          </li>
        ))}
      </Fragment>
    ));
  }

  const user = useContext(UserContext)?.user;

  return (
    <div>
      <h2>Infinite Users</h2>
      <h3 className="mb-2">User: {user?.first_name + ' ' + user?.last_name}</h3>

      <div>
        {infiniteUsers.error instanceof Error && (
          <div>An error occurred: {infiniteUsers.error.message}</div>
        )}

        {infiniteUsers.isFetchingNextPage && <div>Fetching Next Page...</div>}
        {infiniteUsers.hasNextPage && <div>More to load...</div>}

        {infiniteUsers.isSuccess && <ul className="my-4 ml-4">{userList}</ul>}
      </div>
      <div>
        <button
          className="btn btn-load"
          onClick={() => infiniteUsers.fetchNextPage()}
          disabled={
            !infiniteUsers.hasNextPage || infiniteUsers.isFetchingNextPage
          }
        >
          Load More...
        </button>
      </div>
    </div>
  );
}
