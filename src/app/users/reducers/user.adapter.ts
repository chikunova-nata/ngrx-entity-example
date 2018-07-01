import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: false
});

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: usersCount
} = adapter.getSelectors();
