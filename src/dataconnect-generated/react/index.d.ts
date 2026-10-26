import { CreateUserData, UpdateUserData, DeleteUserData, GetUserData, ListUsersData, CreateEventData, UpdateEventData, UpdateEventVariables, DeleteEventData, DeleteEventVariables, GetEventData, GetEventVariables, ListEventsData, CreateSermonData, UpdateSermonData, UpdateSermonVariables, DeleteSermonData, DeleteSermonVariables, GetSermonData, GetSermonVariables, ListSermonsData, CreateGroupData, UpdateGroupData, UpdateGroupVariables, DeleteGroupData, DeleteGroupVariables, GetGroupData, GetGroupVariables, ListGroupsData, CreateDonationData, UpdateDonationData, UpdateDonationVariables, DeleteDonationData, DeleteDonationVariables, GetDonationData, GetDonationVariables, ListMyDonationsData, CreateConnectCardData, UpdateConnectCardData, UpdateConnectCardVariables, DeleteConnectCardData, DeleteConnectCardVariables, GetConnectCardData, GetConnectCardVariables, ListMyConnectCardsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateEvent(options?: useDataConnectMutationOptions<CreateEventData, FirebaseError, void>): UseDataConnectMutationResult<CreateEventData, undefined>;
export function useCreateEvent(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEventData, FirebaseError, void>): UseDataConnectMutationResult<CreateEventData, undefined>;

export function useUpdateEvent(options?: useDataConnectMutationOptions<UpdateEventData, FirebaseError, UpdateEventVariables>): UseDataConnectMutationResult<UpdateEventData, UpdateEventVariables>;
export function useUpdateEvent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEventData, FirebaseError, UpdateEventVariables>): UseDataConnectMutationResult<UpdateEventData, UpdateEventVariables>;

export function useDeleteEvent(options?: useDataConnectMutationOptions<DeleteEventData, FirebaseError, DeleteEventVariables>): UseDataConnectMutationResult<DeleteEventData, DeleteEventVariables>;
export function useDeleteEvent(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteEventData, FirebaseError, DeleteEventVariables>): UseDataConnectMutationResult<DeleteEventData, DeleteEventVariables>;

export function useGetEvent(vars: GetEventVariables, options?: useDataConnectQueryOptions<GetEventData>): UseDataConnectQueryResult<GetEventData, GetEventVariables>;
export function useGetEvent(dc: DataConnect, vars: GetEventVariables, options?: useDataConnectQueryOptions<GetEventData>): UseDataConnectQueryResult<GetEventData, GetEventVariables>;

export function useListEvents(options?: useDataConnectQueryOptions<ListEventsData>): UseDataConnectQueryResult<ListEventsData, undefined>;
export function useListEvents(dc: DataConnect, options?: useDataConnectQueryOptions<ListEventsData>): UseDataConnectQueryResult<ListEventsData, undefined>;

export function useCreateSermon(options?: useDataConnectMutationOptions<CreateSermonData, FirebaseError, void>): UseDataConnectMutationResult<CreateSermonData, undefined>;
export function useCreateSermon(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSermonData, FirebaseError, void>): UseDataConnectMutationResult<CreateSermonData, undefined>;

export function useUpdateSermon(options?: useDataConnectMutationOptions<UpdateSermonData, FirebaseError, UpdateSermonVariables>): UseDataConnectMutationResult<UpdateSermonData, UpdateSermonVariables>;
export function useUpdateSermon(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSermonData, FirebaseError, UpdateSermonVariables>): UseDataConnectMutationResult<UpdateSermonData, UpdateSermonVariables>;

export function useDeleteSermon(options?: useDataConnectMutationOptions<DeleteSermonData, FirebaseError, DeleteSermonVariables>): UseDataConnectMutationResult<DeleteSermonData, DeleteSermonVariables>;
export function useDeleteSermon(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSermonData, FirebaseError, DeleteSermonVariables>): UseDataConnectMutationResult<DeleteSermonData, DeleteSermonVariables>;

export function useGetSermon(vars: GetSermonVariables, options?: useDataConnectQueryOptions<GetSermonData>): UseDataConnectQueryResult<GetSermonData, GetSermonVariables>;
export function useGetSermon(dc: DataConnect, vars: GetSermonVariables, options?: useDataConnectQueryOptions<GetSermonData>): UseDataConnectQueryResult<GetSermonData, GetSermonVariables>;

export function useListSermons(options?: useDataConnectQueryOptions<ListSermonsData>): UseDataConnectQueryResult<ListSermonsData, undefined>;
export function useListSermons(dc: DataConnect, options?: useDataConnectQueryOptions<ListSermonsData>): UseDataConnectQueryResult<ListSermonsData, undefined>;

export function useCreateGroup(options?: useDataConnectMutationOptions<CreateGroupData, FirebaseError, void>): UseDataConnectMutationResult<CreateGroupData, undefined>;
export function useCreateGroup(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGroupData, FirebaseError, void>): UseDataConnectMutationResult<CreateGroupData, undefined>;

export function useUpdateGroup(options?: useDataConnectMutationOptions<UpdateGroupData, FirebaseError, UpdateGroupVariables>): UseDataConnectMutationResult<UpdateGroupData, UpdateGroupVariables>;
export function useUpdateGroup(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGroupData, FirebaseError, UpdateGroupVariables>): UseDataConnectMutationResult<UpdateGroupData, UpdateGroupVariables>;

export function useDeleteGroup(options?: useDataConnectMutationOptions<DeleteGroupData, FirebaseError, DeleteGroupVariables>): UseDataConnectMutationResult<DeleteGroupData, DeleteGroupVariables>;
export function useDeleteGroup(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteGroupData, FirebaseError, DeleteGroupVariables>): UseDataConnectMutationResult<DeleteGroupData, DeleteGroupVariables>;

export function useGetGroup(vars: GetGroupVariables, options?: useDataConnectQueryOptions<GetGroupData>): UseDataConnectQueryResult<GetGroupData, GetGroupVariables>;
export function useGetGroup(dc: DataConnect, vars: GetGroupVariables, options?: useDataConnectQueryOptions<GetGroupData>): UseDataConnectQueryResult<GetGroupData, GetGroupVariables>;

export function useListGroups(options?: useDataConnectQueryOptions<ListGroupsData>): UseDataConnectQueryResult<ListGroupsData, undefined>;
export function useListGroups(dc: DataConnect, options?: useDataConnectQueryOptions<ListGroupsData>): UseDataConnectQueryResult<ListGroupsData, undefined>;

export function useCreateDonation(options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, void>): UseDataConnectMutationResult<CreateDonationData, undefined>;
export function useCreateDonation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, void>): UseDataConnectMutationResult<CreateDonationData, undefined>;

export function useUpdateDonation(options?: useDataConnectMutationOptions<UpdateDonationData, FirebaseError, UpdateDonationVariables>): UseDataConnectMutationResult<UpdateDonationData, UpdateDonationVariables>;
export function useUpdateDonation(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDonationData, FirebaseError, UpdateDonationVariables>): UseDataConnectMutationResult<UpdateDonationData, UpdateDonationVariables>;

export function useDeleteDonation(options?: useDataConnectMutationOptions<DeleteDonationData, FirebaseError, DeleteDonationVariables>): UseDataConnectMutationResult<DeleteDonationData, DeleteDonationVariables>;
export function useDeleteDonation(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDonationData, FirebaseError, DeleteDonationVariables>): UseDataConnectMutationResult<DeleteDonationData, DeleteDonationVariables>;

export function useGetDonation(vars: GetDonationVariables, options?: useDataConnectQueryOptions<GetDonationData>): UseDataConnectQueryResult<GetDonationData, GetDonationVariables>;
export function useGetDonation(dc: DataConnect, vars: GetDonationVariables, options?: useDataConnectQueryOptions<GetDonationData>): UseDataConnectQueryResult<GetDonationData, GetDonationVariables>;

export function useListMyDonations(options?: useDataConnectQueryOptions<ListMyDonationsData>): UseDataConnectQueryResult<ListMyDonationsData, undefined>;
export function useListMyDonations(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyDonationsData>): UseDataConnectQueryResult<ListMyDonationsData, undefined>;

export function useCreateConnectCard(options?: useDataConnectMutationOptions<CreateConnectCardData, FirebaseError, void>): UseDataConnectMutationResult<CreateConnectCardData, undefined>;
export function useCreateConnectCard(dc: DataConnect, options?: useDataConnectMutationOptions<CreateConnectCardData, FirebaseError, void>): UseDataConnectMutationResult<CreateConnectCardData, undefined>;

export function useUpdateConnectCard(options?: useDataConnectMutationOptions<UpdateConnectCardData, FirebaseError, UpdateConnectCardVariables>): UseDataConnectMutationResult<UpdateConnectCardData, UpdateConnectCardVariables>;
export function useUpdateConnectCard(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateConnectCardData, FirebaseError, UpdateConnectCardVariables>): UseDataConnectMutationResult<UpdateConnectCardData, UpdateConnectCardVariables>;

export function useDeleteConnectCard(options?: useDataConnectMutationOptions<DeleteConnectCardData, FirebaseError, DeleteConnectCardVariables>): UseDataConnectMutationResult<DeleteConnectCardData, DeleteConnectCardVariables>;
export function useDeleteConnectCard(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteConnectCardData, FirebaseError, DeleteConnectCardVariables>): UseDataConnectMutationResult<DeleteConnectCardData, DeleteConnectCardVariables>;

export function useGetConnectCard(vars: GetConnectCardVariables, options?: useDataConnectQueryOptions<GetConnectCardData>): UseDataConnectQueryResult<GetConnectCardData, GetConnectCardVariables>;
export function useGetConnectCard(dc: DataConnect, vars: GetConnectCardVariables, options?: useDataConnectQueryOptions<GetConnectCardData>): UseDataConnectQueryResult<GetConnectCardData, GetConnectCardVariables>;

export function useListMyConnectCards(options?: useDataConnectQueryOptions<ListMyConnectCardsData>): UseDataConnectQueryResult<ListMyConnectCardsData, undefined>;
export function useListMyConnectCards(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyConnectCardsData>): UseDataConnectQueryResult<ListMyConnectCardsData, undefined>;
