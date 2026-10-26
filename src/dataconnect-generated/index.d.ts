import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ConnectCard_Key {
  id: UUIDString;
  __typename?: 'ConnectCard_Key';
}

export interface CreateConnectCardData {
  connectCard_insert: ConnectCard_Key;
}

export interface CreateDonationData {
  donation_insert: Donation_Key;
}

export interface CreateEventData {
  event_insert: Event_Key;
}

export interface CreateGroupData {
  group_insert: Group_Key;
}

export interface CreateSermonData {
  sermon_insert: Sermon_Key;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteConnectCardData {
  connectCard_delete?: ConnectCard_Key | null;
}

export interface DeleteConnectCardVariables {
  id: UUIDString;
}

export interface DeleteDonationData {
  donation_delete?: Donation_Key | null;
}

export interface DeleteDonationVariables {
  id: UUIDString;
}

export interface DeleteEventData {
  event_delete?: Event_Key | null;
}

export interface DeleteEventVariables {
  id: UUIDString;
}

export interface DeleteGroupData {
  group_delete?: Group_Key | null;
}

export interface DeleteGroupVariables {
  id: UUIDString;
}

export interface DeleteSermonData {
  sermon_delete?: Sermon_Key | null;
}

export interface DeleteSermonVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Donation_Key {
  id: UUIDString;
  __typename?: 'Donation_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface GetConnectCardData {
  connectCard?: {
    visitorName: string;
    requestType: string;
  };
}

export interface GetConnectCardVariables {
  id: UUIDString;
}

export interface GetDonationData {
  donation?: {
    amount: number;
    date: TimestampString;
  };
}

export interface GetDonationVariables {
  id: UUIDString;
}

export interface GetEventData {
  event?: {
    title: string;
    startTime: TimestampString;
    location: string;
  };
}

export interface GetEventVariables {
  id: UUIDString;
}

export interface GetGroupData {
  group?: {
    name: string;
    leader: {
      fullName: string;
    };
  };
}

export interface GetGroupVariables {
  id: UUIDString;
}

export interface GetSermonData {
  sermon?: {
    title: string;
    preacher: string;
  };
}

export interface GetSermonVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    email: string;
    fullName: string;
  };
}

export interface Group_Key {
  id: UUIDString;
  __typename?: 'Group_Key';
}

export interface ListEventsData {
  events: ({
    title: string;
    startTime: TimestampString;
  })[];
}

export interface ListGroupsData {
  groups: ({
    name: string;
    meetingDay?: string | null;
  })[];
}

export interface ListMyConnectCardsData {
  connectCards: ({
    visitorName: string;
    requestType: string;
  })[];
}

export interface ListMyDonationsData {
  donations: ({
    amount: number;
    date: TimestampString;
  })[];
}

export interface ListSermonsData {
  sermons: ({
    title: string;
    publishDate: DateString;
  })[];
}

export interface ListUsersData {
  users: ({
    fullName: string;
    role: string;
  })[];
}

export interface Sermon_Key {
  id: UUIDString;
  __typename?: 'Sermon_Key';
}

export interface UpdateConnectCardData {
  connectCard_update?: ConnectCard_Key | null;
}

export interface UpdateConnectCardVariables {
  id: UUIDString;
  message?: string | null;
}

export interface UpdateDonationData {
  donation_update?: Donation_Key | null;
}

export interface UpdateDonationVariables {
  id: UUIDString;
  amount?: number | null;
}

export interface UpdateEventData {
  event_update?: Event_Key | null;
}

export interface UpdateEventVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateGroupData {
  group_update?: Group_Key | null;
}

export interface UpdateGroupVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateSermonData {
  sermon_update?: Sermon_Key | null;
}

export interface UpdateSermonVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateEventData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateEventData, undefined>;
  operationName: string;
}
export const createEventRef: CreateEventRef;

export function createEvent(): MutationPromise<CreateEventData, undefined>;
export function createEvent(dc: DataConnect): MutationPromise<CreateEventData, undefined>;

interface UpdateEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
  operationName: string;
}
export const updateEventRef: UpdateEventRef;

export function updateEvent(vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;
export function updateEvent(dc: DataConnect, vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface DeleteEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
  operationName: string;
}
export const deleteEventRef: DeleteEventRef;

export function deleteEvent(vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;
export function deleteEvent(dc: DataConnect, vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface GetEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
  operationName: string;
}
export const getEventRef: GetEventRef;

export function getEvent(vars: GetEventVariables, options?: ExecuteQueryOptions): QueryPromise<GetEventData, GetEventVariables>;
export function getEvent(dc: DataConnect, vars: GetEventVariables, options?: ExecuteQueryOptions): QueryPromise<GetEventData, GetEventVariables>;

interface ListEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEventsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListEventsData, undefined>;
  operationName: string;
}
export const listEventsRef: ListEventsRef;

export function listEvents(options?: ExecuteQueryOptions): QueryPromise<ListEventsData, undefined>;
export function listEvents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, undefined>;

interface CreateSermonRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateSermonData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateSermonData, undefined>;
  operationName: string;
}
export const createSermonRef: CreateSermonRef;

export function createSermon(): MutationPromise<CreateSermonData, undefined>;
export function createSermon(dc: DataConnect): MutationPromise<CreateSermonData, undefined>;

interface UpdateSermonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSermonVariables): MutationRef<UpdateSermonData, UpdateSermonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSermonVariables): MutationRef<UpdateSermonData, UpdateSermonVariables>;
  operationName: string;
}
export const updateSermonRef: UpdateSermonRef;

export function updateSermon(vars: UpdateSermonVariables): MutationPromise<UpdateSermonData, UpdateSermonVariables>;
export function updateSermon(dc: DataConnect, vars: UpdateSermonVariables): MutationPromise<UpdateSermonData, UpdateSermonVariables>;

interface DeleteSermonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSermonVariables): MutationRef<DeleteSermonData, DeleteSermonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSermonVariables): MutationRef<DeleteSermonData, DeleteSermonVariables>;
  operationName: string;
}
export const deleteSermonRef: DeleteSermonRef;

export function deleteSermon(vars: DeleteSermonVariables): MutationPromise<DeleteSermonData, DeleteSermonVariables>;
export function deleteSermon(dc: DataConnect, vars: DeleteSermonVariables): MutationPromise<DeleteSermonData, DeleteSermonVariables>;

interface GetSermonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSermonVariables): QueryRef<GetSermonData, GetSermonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSermonVariables): QueryRef<GetSermonData, GetSermonVariables>;
  operationName: string;
}
export const getSermonRef: GetSermonRef;

export function getSermon(vars: GetSermonVariables, options?: ExecuteQueryOptions): QueryPromise<GetSermonData, GetSermonVariables>;
export function getSermon(dc: DataConnect, vars: GetSermonVariables, options?: ExecuteQueryOptions): QueryPromise<GetSermonData, GetSermonVariables>;

interface ListSermonsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSermonsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSermonsData, undefined>;
  operationName: string;
}
export const listSermonsRef: ListSermonsRef;

export function listSermons(options?: ExecuteQueryOptions): QueryPromise<ListSermonsData, undefined>;
export function listSermons(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSermonsData, undefined>;

interface CreateGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateGroupData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateGroupData, undefined>;
  operationName: string;
}
export const createGroupRef: CreateGroupRef;

export function createGroup(): MutationPromise<CreateGroupData, undefined>;
export function createGroup(dc: DataConnect): MutationPromise<CreateGroupData, undefined>;

interface UpdateGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
  operationName: string;
}
export const updateGroupRef: UpdateGroupRef;

export function updateGroup(vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;
export function updateGroup(dc: DataConnect, vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface DeleteGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
  operationName: string;
}
export const deleteGroupRef: DeleteGroupRef;

export function deleteGroup(vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;
export function deleteGroup(dc: DataConnect, vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface GetGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGroupVariables): QueryRef<GetGroupData, GetGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGroupVariables): QueryRef<GetGroupData, GetGroupVariables>;
  operationName: string;
}
export const getGroupRef: GetGroupRef;

export function getGroup(vars: GetGroupVariables, options?: ExecuteQueryOptions): QueryPromise<GetGroupData, GetGroupVariables>;
export function getGroup(dc: DataConnect, vars: GetGroupVariables, options?: ExecuteQueryOptions): QueryPromise<GetGroupData, GetGroupVariables>;

interface ListGroupsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGroupsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGroupsData, undefined>;
  operationName: string;
}
export const listGroupsRef: ListGroupsRef;

export function listGroups(options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, undefined>;
export function listGroups(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, undefined>;

interface CreateDonationRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDonationData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDonationData, undefined>;
  operationName: string;
}
export const createDonationRef: CreateDonationRef;

export function createDonation(): MutationPromise<CreateDonationData, undefined>;
export function createDonation(dc: DataConnect): MutationPromise<CreateDonationData, undefined>;

interface UpdateDonationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDonationVariables): MutationRef<UpdateDonationData, UpdateDonationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDonationVariables): MutationRef<UpdateDonationData, UpdateDonationVariables>;
  operationName: string;
}
export const updateDonationRef: UpdateDonationRef;

export function updateDonation(vars: UpdateDonationVariables): MutationPromise<UpdateDonationData, UpdateDonationVariables>;
export function updateDonation(dc: DataConnect, vars: UpdateDonationVariables): MutationPromise<UpdateDonationData, UpdateDonationVariables>;

interface DeleteDonationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDonationVariables): MutationRef<DeleteDonationData, DeleteDonationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDonationVariables): MutationRef<DeleteDonationData, DeleteDonationVariables>;
  operationName: string;
}
export const deleteDonationRef: DeleteDonationRef;

export function deleteDonation(vars: DeleteDonationVariables): MutationPromise<DeleteDonationData, DeleteDonationVariables>;
export function deleteDonation(dc: DataConnect, vars: DeleteDonationVariables): MutationPromise<DeleteDonationData, DeleteDonationVariables>;

interface GetDonationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDonationVariables): QueryRef<GetDonationData, GetDonationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDonationVariables): QueryRef<GetDonationData, GetDonationVariables>;
  operationName: string;
}
export const getDonationRef: GetDonationRef;

export function getDonation(vars: GetDonationVariables, options?: ExecuteQueryOptions): QueryPromise<GetDonationData, GetDonationVariables>;
export function getDonation(dc: DataConnect, vars: GetDonationVariables, options?: ExecuteQueryOptions): QueryPromise<GetDonationData, GetDonationVariables>;

interface ListMyDonationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyDonationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyDonationsData, undefined>;
  operationName: string;
}
export const listMyDonationsRef: ListMyDonationsRef;

export function listMyDonations(options?: ExecuteQueryOptions): QueryPromise<ListMyDonationsData, undefined>;
export function listMyDonations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyDonationsData, undefined>;

interface CreateConnectCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateConnectCardData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateConnectCardData, undefined>;
  operationName: string;
}
export const createConnectCardRef: CreateConnectCardRef;

export function createConnectCard(): MutationPromise<CreateConnectCardData, undefined>;
export function createConnectCard(dc: DataConnect): MutationPromise<CreateConnectCardData, undefined>;

interface UpdateConnectCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConnectCardVariables): MutationRef<UpdateConnectCardData, UpdateConnectCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateConnectCardVariables): MutationRef<UpdateConnectCardData, UpdateConnectCardVariables>;
  operationName: string;
}
export const updateConnectCardRef: UpdateConnectCardRef;

export function updateConnectCard(vars: UpdateConnectCardVariables): MutationPromise<UpdateConnectCardData, UpdateConnectCardVariables>;
export function updateConnectCard(dc: DataConnect, vars: UpdateConnectCardVariables): MutationPromise<UpdateConnectCardData, UpdateConnectCardVariables>;

interface DeleteConnectCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConnectCardVariables): MutationRef<DeleteConnectCardData, DeleteConnectCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteConnectCardVariables): MutationRef<DeleteConnectCardData, DeleteConnectCardVariables>;
  operationName: string;
}
export const deleteConnectCardRef: DeleteConnectCardRef;

export function deleteConnectCard(vars: DeleteConnectCardVariables): MutationPromise<DeleteConnectCardData, DeleteConnectCardVariables>;
export function deleteConnectCard(dc: DataConnect, vars: DeleteConnectCardVariables): MutationPromise<DeleteConnectCardData, DeleteConnectCardVariables>;

interface GetConnectCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConnectCardVariables): QueryRef<GetConnectCardData, GetConnectCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConnectCardVariables): QueryRef<GetConnectCardData, GetConnectCardVariables>;
  operationName: string;
}
export const getConnectCardRef: GetConnectCardRef;

export function getConnectCard(vars: GetConnectCardVariables, options?: ExecuteQueryOptions): QueryPromise<GetConnectCardData, GetConnectCardVariables>;
export function getConnectCard(dc: DataConnect, vars: GetConnectCardVariables, options?: ExecuteQueryOptions): QueryPromise<GetConnectCardData, GetConnectCardVariables>;

interface ListMyConnectCardsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyConnectCardsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyConnectCardsData, undefined>;
  operationName: string;
}
export const listMyConnectCardsRef: ListMyConnectCardsRef;

export function listMyConnectCards(options?: ExecuteQueryOptions): QueryPromise<ListMyConnectCardsData, undefined>;
export function listMyConnectCards(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyConnectCardsData, undefined>;

