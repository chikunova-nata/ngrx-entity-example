import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromReducer from './reducers/user.reducer';
import * as fromActions from './actions/user.actions';
import { UserState } from '../states/app.states';
import { User } from './models/user';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  allUsers$: Observable<User[]>;
  userById$: Observable<User>;
  count$: Observable<number>;
  userIds$: Observable<string[] | number[]>;
  task = '';
  userId: string;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserState>
  ) {}
  ngOnInit() {
    this.count$ = this.store.select(fromReducer.usersCount);
    this.allUsers$ = this.store.select(fromReducer.selectAllUsers);
    this.userIds$ = this.store.select(fromReducer.selectUserIds);
    this.userById$ = this.store.select(fromReducer.selectCurrentUser);

    this.store.dispatch(new fromActions.LoadUsers());
  }
  createBlankUserForm() {
    this.userForm = this.formBuilder.group({
      usersArray: this.formBuilder.array([])
    });
  }
  createUserFormForAdd() {
    this.createBlankUserForm();
    this.addMoreControlForAdd();
  }
  get usersFormArray(): FormArray {
    return this.userForm.get('usersArray') as FormArray;
  }
  addMoreControlForAdd() {
    let ag = this.formBuilder.group(new User());
    this.usersFormArray.push(ag);
  }
  updateUserForm() {
    this.createBlankUserForm();
    this.allUsers$.subscribe(users => {
      if (users && users.length > 0) {
        let user = users[0];
        let ag = this.formBuilder.group(user);
        this.usersFormArray.push(ag);
      }
    });
  }
  addMoreControlForUpdate() {
    this.allUsers$.subscribe(users => {
      if (
        users &&
        users.length > 0 &&
        this.usersFormArray.length < users.length
      ) {
        let len = this.usersFormArray.length;
        let user = users[len];
        let ag = this.formBuilder.group(user);
        this.usersFormArray.push(ag);
      }
    });
  }
  deleteFormArrayControl(idx: number) {
    this.usersFormArray.removeAt(idx);
  }
  addUserView() {
    this.task = 'add';
    this.createUserFormForAdd();
  }
  updateUserView() {
    this.task = 'update';
    this.updateUserForm();
  }
  removeUserView() {
    this.task = 'remove';
    this.createBlankUserForm();
    this.allUsers$.subscribe(users => {
      this.createBlankUserForm();
      users.forEach(user => {
        let ag = this.formBuilder.group({
          userData: user,
          chk: false
        });
        this.usersFormArray.push(ag);
      });
    });
  }
  userByIdView() {
    this.task = 'select';
  }
  onFormSubmitForAdd() {
    if (this.usersFormArray.length === 1) {
      this.addUser(this.usersFormArray.at(0).value);
    } else if (this.usersFormArray.length > 1) {
      this.addUsers(this.usersFormArray.value);
    }
    this.createBlankUserForm();
    this.loadAllUsers();
  }
  onFormSubmitForUpdate() {
    if (this.usersFormArray.length === 1) {
      this.updateUser(this.usersFormArray.at(0).value);
    } else if (this.usersFormArray.length > 1) {
      this.updateUsers(this.usersFormArray.value);
    }
    this.createBlankUserForm();
    this.loadAllUsers();
  }
  onFormSubmitForRemove() {
    let userIdsToDelete: string[] = [];
    this.usersFormArray.controls.forEach(result => {
      if (result.get('chk').value) {
        userIdsToDelete.push(result.get('userData').value.id);
      }
    });
    if (userIdsToDelete.length == 1) {
      this.removeUser(userIdsToDelete[0]);
    } else if (userIdsToDelete.length > 1) {
      this.removeUsers(userIdsToDelete);
    }
  }
  addUser(data: User) {
    this.store.dispatch(new fromActions.AddUser({ user: data }));
  }
  addUsers(data: User[]) {
    this.store.dispatch(new fromActions.AddUsers({ users: data }));
  }
  updateUser(data: User) {
    this.store.dispatch(
      new fromActions.UpdateUser({ user: { id: data.id, changes: data } })
    );
  }
  updateUsers(data: User[]) {
    let allUpdates = data.map(user =>
      Object.assign({}, { id: user.id, changes: user })
    );
    this.store.dispatch(new fromActions.UpdateUsers({ users: allUpdates }));
  }
  removeUser(userId: string) {
    this.store.dispatch(new fromActions.RemoveUser({ id: userId }));
  }
  removeUsers(userIds: string[]) {
    this.store.dispatch(new fromActions.RemoveUsers({ ids: userIds }));
  }
  clearAllUsers() {
    this.store.dispatch(new fromActions.ClearUsers());
  }
  loadAllUsers() {
    this.task = 'all';
  }
  selectUserById() {
    this.store.dispatch(new fromActions.SelectUser({ userId: this.userId }));
  }
}
