# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetEvent*](#getevent)
  - [*ListEvents*](#listevents)
  - [*GetSermon*](#getsermon)
  - [*ListSermons*](#listsermons)
  - [*GetGroup*](#getgroup)
  - [*ListGroups*](#listgroups)
  - [*GetDonation*](#getdonation)
  - [*ListMyDonations*](#listmydonations)
  - [*GetConnectCard*](#getconnectcard)
  - [*ListMyConnectCards*](#listmyconnectcards)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateEvent*](#createevent)
  - [*UpdateEvent*](#updateevent)
  - [*DeleteEvent*](#deleteevent)
  - [*CreateSermon*](#createsermon)
  - [*UpdateSermon*](#updatesermon)
  - [*DeleteSermon*](#deletesermon)
  - [*CreateGroup*](#creategroup)
  - [*UpdateGroup*](#updategroup)
  - [*DeleteGroup*](#deletegroup)
  - [*CreateDonation*](#createdonation)
  - [*UpdateDonation*](#updatedonation)
  - [*DeleteDonation*](#deletedonation)
  - [*CreateConnectCard*](#createconnectcard)
  - [*UpdateConnectCard*](#updateconnectcard)
  - [*DeleteConnectCard*](#deleteconnectcard)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    email: string;
    fullName: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    fullName: string;
    role: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetEvent
You can execute the `GetEvent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEvent(vars: GetEventVariables, options?: ExecuteQueryOptions): QueryPromise<GetEventData, GetEventVariables>;

interface GetEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
}
export const getEventRef: GetEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEvent(dc: DataConnect, vars: GetEventVariables, options?: ExecuteQueryOptions): QueryPromise<GetEventData, GetEventVariables>;

interface GetEventRef {
  ...
  (dc: DataConnect, vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
}
export const getEventRef: GetEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEventRef:
```typescript
const name = getEventRef.operationName;
console.log(name);
```

### Variables
The `GetEvent` query requires an argument of type `GetEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEventVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetEvent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEventData {
  event?: {
    title: string;
    startTime: TimestampString;
    location: string;
  };
}
```
### Using `GetEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEvent, GetEventVariables } from '@dataconnect/generated';

// The `GetEvent` query requires an argument of type `GetEventVariables`:
const getEventVars: GetEventVariables = {
  id: ..., 
};

// Call the `getEvent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEvent(getEventVars);
// Variables can be defined inline as well.
const { data } = await getEvent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEvent(dataConnect, getEventVars);

console.log(data.event);

// Or, you can use the `Promise` API.
getEvent(getEventVars).then((response) => {
  const data = response.data;
  console.log(data.event);
});
```

### Using `GetEvent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEventRef, GetEventVariables } from '@dataconnect/generated';

// The `GetEvent` query requires an argument of type `GetEventVariables`:
const getEventVars: GetEventVariables = {
  id: ..., 
};

// Call the `getEventRef()` function to get a reference to the query.
const ref = getEventRef(getEventVars);
// Variables can be defined inline as well.
const ref = getEventRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEventRef(dataConnect, getEventVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.event);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.event);
});
```

## ListEvents
You can execute the `ListEvents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEvents(options?: ExecuteQueryOptions): QueryPromise<ListEventsData, undefined>;

interface ListEventsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEventsData, undefined>;
}
export const listEventsRef: ListEventsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEvents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, undefined>;

interface ListEventsRef {
  ...
  (dc: DataConnect): QueryRef<ListEventsData, undefined>;
}
export const listEventsRef: ListEventsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEventsRef:
```typescript
const name = listEventsRef.operationName;
console.log(name);
```

### Variables
The `ListEvents` query has no variables.
### Return Type
Recall that executing the `ListEvents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEventsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEventsData {
  events: ({
    title: string;
    startTime: TimestampString;
  })[];
}
```
### Using `ListEvents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEvents } from '@dataconnect/generated';


// Call the `listEvents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEvents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEvents(dataConnect);

console.log(data.events);

// Or, you can use the `Promise` API.
listEvents().then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

### Using `ListEvents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEventsRef } from '@dataconnect/generated';


// Call the `listEventsRef()` function to get a reference to the query.
const ref = listEventsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEventsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.events);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

## GetSermon
You can execute the `GetSermon` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSermon(vars: GetSermonVariables, options?: ExecuteQueryOptions): QueryPromise<GetSermonData, GetSermonVariables>;

interface GetSermonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSermonVariables): QueryRef<GetSermonData, GetSermonVariables>;
}
export const getSermonRef: GetSermonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSermon(dc: DataConnect, vars: GetSermonVariables, options?: ExecuteQueryOptions): QueryPromise<GetSermonData, GetSermonVariables>;

interface GetSermonRef {
  ...
  (dc: DataConnect, vars: GetSermonVariables): QueryRef<GetSermonData, GetSermonVariables>;
}
export const getSermonRef: GetSermonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSermonRef:
```typescript
const name = getSermonRef.operationName;
console.log(name);
```

### Variables
The `GetSermon` query requires an argument of type `GetSermonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSermonVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSermon` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSermonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSermonData {
  sermon?: {
    title: string;
    preacher: string;
  };
}
```
### Using `GetSermon`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSermon, GetSermonVariables } from '@dataconnect/generated';

// The `GetSermon` query requires an argument of type `GetSermonVariables`:
const getSermonVars: GetSermonVariables = {
  id: ..., 
};

// Call the `getSermon()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSermon(getSermonVars);
// Variables can be defined inline as well.
const { data } = await getSermon({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSermon(dataConnect, getSermonVars);

console.log(data.sermon);

// Or, you can use the `Promise` API.
getSermon(getSermonVars).then((response) => {
  const data = response.data;
  console.log(data.sermon);
});
```

### Using `GetSermon`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSermonRef, GetSermonVariables } from '@dataconnect/generated';

// The `GetSermon` query requires an argument of type `GetSermonVariables`:
const getSermonVars: GetSermonVariables = {
  id: ..., 
};

// Call the `getSermonRef()` function to get a reference to the query.
const ref = getSermonRef(getSermonVars);
// Variables can be defined inline as well.
const ref = getSermonRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSermonRef(dataConnect, getSermonVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sermon);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sermon);
});
```

## ListSermons
You can execute the `ListSermons` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSermons(options?: ExecuteQueryOptions): QueryPromise<ListSermonsData, undefined>;

interface ListSermonsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSermonsData, undefined>;
}
export const listSermonsRef: ListSermonsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSermons(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSermonsData, undefined>;

interface ListSermonsRef {
  ...
  (dc: DataConnect): QueryRef<ListSermonsData, undefined>;
}
export const listSermonsRef: ListSermonsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSermonsRef:
```typescript
const name = listSermonsRef.operationName;
console.log(name);
```

### Variables
The `ListSermons` query has no variables.
### Return Type
Recall that executing the `ListSermons` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSermonsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSermonsData {
  sermons: ({
    title: string;
    publishDate: DateString;
  })[];
}
```
### Using `ListSermons`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSermons } from '@dataconnect/generated';


// Call the `listSermons()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSermons();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSermons(dataConnect);

console.log(data.sermons);

// Or, you can use the `Promise` API.
listSermons().then((response) => {
  const data = response.data;
  console.log(data.sermons);
});
```

### Using `ListSermons`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSermonsRef } from '@dataconnect/generated';


// Call the `listSermonsRef()` function to get a reference to the query.
const ref = listSermonsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSermonsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sermons);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sermons);
});
```

## GetGroup
You can execute the `GetGroup` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGroup(vars: GetGroupVariables, options?: ExecuteQueryOptions): QueryPromise<GetGroupData, GetGroupVariables>;

interface GetGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGroupVariables): QueryRef<GetGroupData, GetGroupVariables>;
}
export const getGroupRef: GetGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGroup(dc: DataConnect, vars: GetGroupVariables, options?: ExecuteQueryOptions): QueryPromise<GetGroupData, GetGroupVariables>;

interface GetGroupRef {
  ...
  (dc: DataConnect, vars: GetGroupVariables): QueryRef<GetGroupData, GetGroupVariables>;
}
export const getGroupRef: GetGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGroupRef:
```typescript
const name = getGroupRef.operationName;
console.log(name);
```

### Variables
The `GetGroup` query requires an argument of type `GetGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGroupVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetGroup` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGroupData {
  group?: {
    name: string;
    leader: {
      fullName: string;
    };
  };
}
```
### Using `GetGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGroup, GetGroupVariables } from '@dataconnect/generated';

// The `GetGroup` query requires an argument of type `GetGroupVariables`:
const getGroupVars: GetGroupVariables = {
  id: ..., 
};

// Call the `getGroup()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGroup(getGroupVars);
// Variables can be defined inline as well.
const { data } = await getGroup({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGroup(dataConnect, getGroupVars);

console.log(data.group);

// Or, you can use the `Promise` API.
getGroup(getGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group);
});
```

### Using `GetGroup`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGroupRef, GetGroupVariables } from '@dataconnect/generated';

// The `GetGroup` query requires an argument of type `GetGroupVariables`:
const getGroupVars: GetGroupVariables = {
  id: ..., 
};

// Call the `getGroupRef()` function to get a reference to the query.
const ref = getGroupRef(getGroupVars);
// Variables can be defined inline as well.
const ref = getGroupRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGroupRef(dataConnect, getGroupVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.group);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.group);
});
```

## ListGroups
You can execute the `ListGroups` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGroups(options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, undefined>;

interface ListGroupsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGroupsData, undefined>;
}
export const listGroupsRef: ListGroupsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGroups(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, undefined>;

interface ListGroupsRef {
  ...
  (dc: DataConnect): QueryRef<ListGroupsData, undefined>;
}
export const listGroupsRef: ListGroupsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGroupsRef:
```typescript
const name = listGroupsRef.operationName;
console.log(name);
```

### Variables
The `ListGroups` query has no variables.
### Return Type
Recall that executing the `ListGroups` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGroupsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGroupsData {
  groups: ({
    name: string;
    meetingDay?: string | null;
  })[];
}
```
### Using `ListGroups`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGroups } from '@dataconnect/generated';


// Call the `listGroups()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGroups();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGroups(dataConnect);

console.log(data.groups);

// Or, you can use the `Promise` API.
listGroups().then((response) => {
  const data = response.data;
  console.log(data.groups);
});
```

### Using `ListGroups`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGroupsRef } from '@dataconnect/generated';


// Call the `listGroupsRef()` function to get a reference to the query.
const ref = listGroupsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGroupsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.groups);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.groups);
});
```

## GetDonation
You can execute the `GetDonation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDonation(vars: GetDonationVariables, options?: ExecuteQueryOptions): QueryPromise<GetDonationData, GetDonationVariables>;

interface GetDonationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDonationVariables): QueryRef<GetDonationData, GetDonationVariables>;
}
export const getDonationRef: GetDonationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDonation(dc: DataConnect, vars: GetDonationVariables, options?: ExecuteQueryOptions): QueryPromise<GetDonationData, GetDonationVariables>;

interface GetDonationRef {
  ...
  (dc: DataConnect, vars: GetDonationVariables): QueryRef<GetDonationData, GetDonationVariables>;
}
export const getDonationRef: GetDonationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDonationRef:
```typescript
const name = getDonationRef.operationName;
console.log(name);
```

### Variables
The `GetDonation` query requires an argument of type `GetDonationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDonationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDonation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDonationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDonationData {
  donation?: {
    amount: number;
    date: TimestampString;
  };
}
```
### Using `GetDonation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDonation, GetDonationVariables } from '@dataconnect/generated';

// The `GetDonation` query requires an argument of type `GetDonationVariables`:
const getDonationVars: GetDonationVariables = {
  id: ..., 
};

// Call the `getDonation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDonation(getDonationVars);
// Variables can be defined inline as well.
const { data } = await getDonation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDonation(dataConnect, getDonationVars);

console.log(data.donation);

// Or, you can use the `Promise` API.
getDonation(getDonationVars).then((response) => {
  const data = response.data;
  console.log(data.donation);
});
```

### Using `GetDonation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDonationRef, GetDonationVariables } from '@dataconnect/generated';

// The `GetDonation` query requires an argument of type `GetDonationVariables`:
const getDonationVars: GetDonationVariables = {
  id: ..., 
};

// Call the `getDonationRef()` function to get a reference to the query.
const ref = getDonationRef(getDonationVars);
// Variables can be defined inline as well.
const ref = getDonationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDonationRef(dataConnect, getDonationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.donation);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.donation);
});
```

## ListMyDonations
You can execute the `ListMyDonations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyDonations(options?: ExecuteQueryOptions): QueryPromise<ListMyDonationsData, undefined>;

interface ListMyDonationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyDonationsData, undefined>;
}
export const listMyDonationsRef: ListMyDonationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyDonations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyDonationsData, undefined>;

interface ListMyDonationsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyDonationsData, undefined>;
}
export const listMyDonationsRef: ListMyDonationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyDonationsRef:
```typescript
const name = listMyDonationsRef.operationName;
console.log(name);
```

### Variables
The `ListMyDonations` query has no variables.
### Return Type
Recall that executing the `ListMyDonations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyDonationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyDonationsData {
  donations: ({
    amount: number;
    date: TimestampString;
  })[];
}
```
### Using `ListMyDonations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyDonations } from '@dataconnect/generated';


// Call the `listMyDonations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyDonations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyDonations(dataConnect);

console.log(data.donations);

// Or, you can use the `Promise` API.
listMyDonations().then((response) => {
  const data = response.data;
  console.log(data.donations);
});
```

### Using `ListMyDonations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyDonationsRef } from '@dataconnect/generated';


// Call the `listMyDonationsRef()` function to get a reference to the query.
const ref = listMyDonationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyDonationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.donations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.donations);
});
```

## GetConnectCard
You can execute the `GetConnectCard` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getConnectCard(vars: GetConnectCardVariables, options?: ExecuteQueryOptions): QueryPromise<GetConnectCardData, GetConnectCardVariables>;

interface GetConnectCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConnectCardVariables): QueryRef<GetConnectCardData, GetConnectCardVariables>;
}
export const getConnectCardRef: GetConnectCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConnectCard(dc: DataConnect, vars: GetConnectCardVariables, options?: ExecuteQueryOptions): QueryPromise<GetConnectCardData, GetConnectCardVariables>;

interface GetConnectCardRef {
  ...
  (dc: DataConnect, vars: GetConnectCardVariables): QueryRef<GetConnectCardData, GetConnectCardVariables>;
}
export const getConnectCardRef: GetConnectCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConnectCardRef:
```typescript
const name = getConnectCardRef.operationName;
console.log(name);
```

### Variables
The `GetConnectCard` query requires an argument of type `GetConnectCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConnectCardVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetConnectCard` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConnectCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetConnectCardData {
  connectCard?: {
    visitorName: string;
    requestType: string;
  };
}
```
### Using `GetConnectCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConnectCard, GetConnectCardVariables } from '@dataconnect/generated';

// The `GetConnectCard` query requires an argument of type `GetConnectCardVariables`:
const getConnectCardVars: GetConnectCardVariables = {
  id: ..., 
};

// Call the `getConnectCard()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConnectCard(getConnectCardVars);
// Variables can be defined inline as well.
const { data } = await getConnectCard({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConnectCard(dataConnect, getConnectCardVars);

console.log(data.connectCard);

// Or, you can use the `Promise` API.
getConnectCard(getConnectCardVars).then((response) => {
  const data = response.data;
  console.log(data.connectCard);
});
```

### Using `GetConnectCard`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConnectCardRef, GetConnectCardVariables } from '@dataconnect/generated';

// The `GetConnectCard` query requires an argument of type `GetConnectCardVariables`:
const getConnectCardVars: GetConnectCardVariables = {
  id: ..., 
};

// Call the `getConnectCardRef()` function to get a reference to the query.
const ref = getConnectCardRef(getConnectCardVars);
// Variables can be defined inline as well.
const ref = getConnectCardRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConnectCardRef(dataConnect, getConnectCardVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.connectCard);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.connectCard);
});
```

## ListMyConnectCards
You can execute the `ListMyConnectCards` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyConnectCards(options?: ExecuteQueryOptions): QueryPromise<ListMyConnectCardsData, undefined>;

interface ListMyConnectCardsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyConnectCardsData, undefined>;
}
export const listMyConnectCardsRef: ListMyConnectCardsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyConnectCards(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyConnectCardsData, undefined>;

interface ListMyConnectCardsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyConnectCardsData, undefined>;
}
export const listMyConnectCardsRef: ListMyConnectCardsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyConnectCardsRef:
```typescript
const name = listMyConnectCardsRef.operationName;
console.log(name);
```

### Variables
The `ListMyConnectCards` query has no variables.
### Return Type
Recall that executing the `ListMyConnectCards` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyConnectCardsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyConnectCardsData {
  connectCards: ({
    visitorName: string;
    requestType: string;
  })[];
}
```
### Using `ListMyConnectCards`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyConnectCards } from '@dataconnect/generated';


// Call the `listMyConnectCards()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyConnectCards();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyConnectCards(dataConnect);

console.log(data.connectCards);

// Or, you can use the `Promise` API.
listMyConnectCards().then((response) => {
  const data = response.data;
  console.log(data.connectCards);
});
```

### Using `ListMyConnectCards`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyConnectCardsRef } from '@dataconnect/generated';


// Call the `listMyConnectCardsRef()` function to get a reference to the query.
const ref = listMyConnectCardsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyConnectCardsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.connectCards);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.connectCards);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateEvent
You can execute the `CreateEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEvent(): MutationPromise<CreateEventData, undefined>;

interface CreateEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateEventData, undefined>;
}
export const createEventRef: CreateEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEvent(dc: DataConnect): MutationPromise<CreateEventData, undefined>;

interface CreateEventRef {
  ...
  (dc: DataConnect): MutationRef<CreateEventData, undefined>;
}
export const createEventRef: CreateEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEventRef:
```typescript
const name = createEventRef.operationName;
console.log(name);
```

### Variables
The `CreateEvent` mutation has no variables.
### Return Type
Recall that executing the `CreateEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEventData {
  event_insert: Event_Key;
}
```
### Using `CreateEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEvent } from '@dataconnect/generated';


// Call the `createEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEvent();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEvent(dataConnect);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
createEvent().then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

### Using `CreateEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEventRef } from '@dataconnect/generated';


// Call the `createEventRef()` function to get a reference to the mutation.
const ref = createEventRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEventRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

## UpdateEvent
You can execute the `UpdateEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEvent(vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface UpdateEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
}
export const updateEventRef: UpdateEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEvent(dc: DataConnect, vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface UpdateEventRef {
  ...
  (dc: DataConnect, vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
}
export const updateEventRef: UpdateEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEventRef:
```typescript
const name = updateEventRef.operationName;
console.log(name);
```

### Variables
The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEventVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEventData {
  event_update?: Event_Key | null;
}
```
### Using `UpdateEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEvent, UpdateEventVariables } from '@dataconnect/generated';

// The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`:
const updateEventVars: UpdateEventVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEvent(updateEventVars);
// Variables can be defined inline as well.
const { data } = await updateEvent({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEvent(dataConnect, updateEventVars);

console.log(data.event_update);

// Or, you can use the `Promise` API.
updateEvent(updateEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_update);
});
```

### Using `UpdateEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEventRef, UpdateEventVariables } from '@dataconnect/generated';

// The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`:
const updateEventVars: UpdateEventVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateEventRef()` function to get a reference to the mutation.
const ref = updateEventRef(updateEventVars);
// Variables can be defined inline as well.
const ref = updateEventRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEventRef(dataConnect, updateEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_update);
});
```

## DeleteEvent
You can execute the `DeleteEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteEvent(vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface DeleteEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
}
export const deleteEventRef: DeleteEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteEvent(dc: DataConnect, vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface DeleteEventRef {
  ...
  (dc: DataConnect, vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
}
export const deleteEventRef: DeleteEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteEventRef:
```typescript
const name = deleteEventRef.operationName;
console.log(name);
```

### Variables
The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteEventVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteEventData {
  event_delete?: Event_Key | null;
}
```
### Using `DeleteEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteEvent, DeleteEventVariables } from '@dataconnect/generated';

// The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`:
const deleteEventVars: DeleteEventVariables = {
  id: ..., 
};

// Call the `deleteEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteEvent(deleteEventVars);
// Variables can be defined inline as well.
const { data } = await deleteEvent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteEvent(dataConnect, deleteEventVars);

console.log(data.event_delete);

// Or, you can use the `Promise` API.
deleteEvent(deleteEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_delete);
});
```

### Using `DeleteEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteEventRef, DeleteEventVariables } from '@dataconnect/generated';

// The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`:
const deleteEventVars: DeleteEventVariables = {
  id: ..., 
};

// Call the `deleteEventRef()` function to get a reference to the mutation.
const ref = deleteEventRef(deleteEventVars);
// Variables can be defined inline as well.
const ref = deleteEventRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteEventRef(dataConnect, deleteEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_delete);
});
```

## CreateSermon
You can execute the `CreateSermon` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSermon(): MutationPromise<CreateSermonData, undefined>;

interface CreateSermonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateSermonData, undefined>;
}
export const createSermonRef: CreateSermonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSermon(dc: DataConnect): MutationPromise<CreateSermonData, undefined>;

interface CreateSermonRef {
  ...
  (dc: DataConnect): MutationRef<CreateSermonData, undefined>;
}
export const createSermonRef: CreateSermonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSermonRef:
```typescript
const name = createSermonRef.operationName;
console.log(name);
```

### Variables
The `CreateSermon` mutation has no variables.
### Return Type
Recall that executing the `CreateSermon` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSermonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSermonData {
  sermon_insert: Sermon_Key;
}
```
### Using `CreateSermon`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSermon } from '@dataconnect/generated';


// Call the `createSermon()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSermon();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSermon(dataConnect);

console.log(data.sermon_insert);

// Or, you can use the `Promise` API.
createSermon().then((response) => {
  const data = response.data;
  console.log(data.sermon_insert);
});
```

### Using `CreateSermon`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSermonRef } from '@dataconnect/generated';


// Call the `createSermonRef()` function to get a reference to the mutation.
const ref = createSermonRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSermonRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sermon_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sermon_insert);
});
```

## UpdateSermon
You can execute the `UpdateSermon` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSermon(vars: UpdateSermonVariables): MutationPromise<UpdateSermonData, UpdateSermonVariables>;

interface UpdateSermonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSermonVariables): MutationRef<UpdateSermonData, UpdateSermonVariables>;
}
export const updateSermonRef: UpdateSermonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSermon(dc: DataConnect, vars: UpdateSermonVariables): MutationPromise<UpdateSermonData, UpdateSermonVariables>;

interface UpdateSermonRef {
  ...
  (dc: DataConnect, vars: UpdateSermonVariables): MutationRef<UpdateSermonData, UpdateSermonVariables>;
}
export const updateSermonRef: UpdateSermonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSermonRef:
```typescript
const name = updateSermonRef.operationName;
console.log(name);
```

### Variables
The `UpdateSermon` mutation requires an argument of type `UpdateSermonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSermonVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSermon` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSermonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSermonData {
  sermon_update?: Sermon_Key | null;
}
```
### Using `UpdateSermon`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSermon, UpdateSermonVariables } from '@dataconnect/generated';

// The `UpdateSermon` mutation requires an argument of type `UpdateSermonVariables`:
const updateSermonVars: UpdateSermonVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateSermon()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSermon(updateSermonVars);
// Variables can be defined inline as well.
const { data } = await updateSermon({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSermon(dataConnect, updateSermonVars);

console.log(data.sermon_update);

// Or, you can use the `Promise` API.
updateSermon(updateSermonVars).then((response) => {
  const data = response.data;
  console.log(data.sermon_update);
});
```

### Using `UpdateSermon`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSermonRef, UpdateSermonVariables } from '@dataconnect/generated';

// The `UpdateSermon` mutation requires an argument of type `UpdateSermonVariables`:
const updateSermonVars: UpdateSermonVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateSermonRef()` function to get a reference to the mutation.
const ref = updateSermonRef(updateSermonVars);
// Variables can be defined inline as well.
const ref = updateSermonRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSermonRef(dataConnect, updateSermonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sermon_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sermon_update);
});
```

## DeleteSermon
You can execute the `DeleteSermon` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSermon(vars: DeleteSermonVariables): MutationPromise<DeleteSermonData, DeleteSermonVariables>;

interface DeleteSermonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSermonVariables): MutationRef<DeleteSermonData, DeleteSermonVariables>;
}
export const deleteSermonRef: DeleteSermonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSermon(dc: DataConnect, vars: DeleteSermonVariables): MutationPromise<DeleteSermonData, DeleteSermonVariables>;

interface DeleteSermonRef {
  ...
  (dc: DataConnect, vars: DeleteSermonVariables): MutationRef<DeleteSermonData, DeleteSermonVariables>;
}
export const deleteSermonRef: DeleteSermonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSermonRef:
```typescript
const name = deleteSermonRef.operationName;
console.log(name);
```

### Variables
The `DeleteSermon` mutation requires an argument of type `DeleteSermonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSermonVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSermon` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSermonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSermonData {
  sermon_delete?: Sermon_Key | null;
}
```
### Using `DeleteSermon`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSermon, DeleteSermonVariables } from '@dataconnect/generated';

// The `DeleteSermon` mutation requires an argument of type `DeleteSermonVariables`:
const deleteSermonVars: DeleteSermonVariables = {
  id: ..., 
};

// Call the `deleteSermon()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSermon(deleteSermonVars);
// Variables can be defined inline as well.
const { data } = await deleteSermon({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSermon(dataConnect, deleteSermonVars);

console.log(data.sermon_delete);

// Or, you can use the `Promise` API.
deleteSermon(deleteSermonVars).then((response) => {
  const data = response.data;
  console.log(data.sermon_delete);
});
```

### Using `DeleteSermon`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSermonRef, DeleteSermonVariables } from '@dataconnect/generated';

// The `DeleteSermon` mutation requires an argument of type `DeleteSermonVariables`:
const deleteSermonVars: DeleteSermonVariables = {
  id: ..., 
};

// Call the `deleteSermonRef()` function to get a reference to the mutation.
const ref = deleteSermonRef(deleteSermonVars);
// Variables can be defined inline as well.
const ref = deleteSermonRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSermonRef(dataConnect, deleteSermonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sermon_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sermon_delete);
});
```

## CreateGroup
You can execute the `CreateGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGroup(): MutationPromise<CreateGroupData, undefined>;

interface CreateGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateGroupData, undefined>;
}
export const createGroupRef: CreateGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGroup(dc: DataConnect): MutationPromise<CreateGroupData, undefined>;

interface CreateGroupRef {
  ...
  (dc: DataConnect): MutationRef<CreateGroupData, undefined>;
}
export const createGroupRef: CreateGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGroupRef:
```typescript
const name = createGroupRef.operationName;
console.log(name);
```

### Variables
The `CreateGroup` mutation has no variables.
### Return Type
Recall that executing the `CreateGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGroupData {
  group_insert: Group_Key;
}
```
### Using `CreateGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGroup } from '@dataconnect/generated';


// Call the `createGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGroup();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGroup(dataConnect);

console.log(data.group_insert);

// Or, you can use the `Promise` API.
createGroup().then((response) => {
  const data = response.data;
  console.log(data.group_insert);
});
```

### Using `CreateGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGroupRef } from '@dataconnect/generated';


// Call the `createGroupRef()` function to get a reference to the mutation.
const ref = createGroupRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGroupRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_insert);
});
```

## UpdateGroup
You can execute the `UpdateGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGroup(vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface UpdateGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
}
export const updateGroupRef: UpdateGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGroup(dc: DataConnect, vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface UpdateGroupRef {
  ...
  (dc: DataConnect, vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
}
export const updateGroupRef: UpdateGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGroupRef:
```typescript
const name = updateGroupRef.operationName;
console.log(name);
```

### Variables
The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGroupVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGroupData {
  group_update?: Group_Key | null;
}
```
### Using `UpdateGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGroup, UpdateGroupVariables } from '@dataconnect/generated';

// The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`:
const updateGroupVars: UpdateGroupVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGroup(updateGroupVars);
// Variables can be defined inline as well.
const { data } = await updateGroup({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGroup(dataConnect, updateGroupVars);

console.log(data.group_update);

// Or, you can use the `Promise` API.
updateGroup(updateGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group_update);
});
```

### Using `UpdateGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGroupRef, UpdateGroupVariables } from '@dataconnect/generated';

// The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`:
const updateGroupVars: UpdateGroupVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateGroupRef()` function to get a reference to the mutation.
const ref = updateGroupRef(updateGroupVars);
// Variables can be defined inline as well.
const ref = updateGroupRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGroupRef(dataConnect, updateGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_update);
});
```

## DeleteGroup
You can execute the `DeleteGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteGroup(vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface DeleteGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
}
export const deleteGroupRef: DeleteGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGroup(dc: DataConnect, vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface DeleteGroupRef {
  ...
  (dc: DataConnect, vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
}
export const deleteGroupRef: DeleteGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGroupRef:
```typescript
const name = deleteGroupRef.operationName;
console.log(name);
```

### Variables
The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteGroupVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGroupData {
  group_delete?: Group_Key | null;
}
```
### Using `DeleteGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGroup, DeleteGroupVariables } from '@dataconnect/generated';

// The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`:
const deleteGroupVars: DeleteGroupVariables = {
  id: ..., 
};

// Call the `deleteGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGroup(deleteGroupVars);
// Variables can be defined inline as well.
const { data } = await deleteGroup({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGroup(dataConnect, deleteGroupVars);

console.log(data.group_delete);

// Or, you can use the `Promise` API.
deleteGroup(deleteGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group_delete);
});
```

### Using `DeleteGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGroupRef, DeleteGroupVariables } from '@dataconnect/generated';

// The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`:
const deleteGroupVars: DeleteGroupVariables = {
  id: ..., 
};

// Call the `deleteGroupRef()` function to get a reference to the mutation.
const ref = deleteGroupRef(deleteGroupVars);
// Variables can be defined inline as well.
const ref = deleteGroupRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGroupRef(dataConnect, deleteGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_delete);
});
```

## CreateDonation
You can execute the `CreateDonation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDonation(): MutationPromise<CreateDonationData, undefined>;

interface CreateDonationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDonationData, undefined>;
}
export const createDonationRef: CreateDonationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDonation(dc: DataConnect): MutationPromise<CreateDonationData, undefined>;

interface CreateDonationRef {
  ...
  (dc: DataConnect): MutationRef<CreateDonationData, undefined>;
}
export const createDonationRef: CreateDonationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDonationRef:
```typescript
const name = createDonationRef.operationName;
console.log(name);
```

### Variables
The `CreateDonation` mutation has no variables.
### Return Type
Recall that executing the `CreateDonation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDonationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDonationData {
  donation_insert: Donation_Key;
}
```
### Using `CreateDonation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDonation } from '@dataconnect/generated';


// Call the `createDonation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDonation();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDonation(dataConnect);

console.log(data.donation_insert);

// Or, you can use the `Promise` API.
createDonation().then((response) => {
  const data = response.data;
  console.log(data.donation_insert);
});
```

### Using `CreateDonation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDonationRef } from '@dataconnect/generated';


// Call the `createDonationRef()` function to get a reference to the mutation.
const ref = createDonationRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDonationRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.donation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.donation_insert);
});
```

## UpdateDonation
You can execute the `UpdateDonation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDonation(vars: UpdateDonationVariables): MutationPromise<UpdateDonationData, UpdateDonationVariables>;

interface UpdateDonationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDonationVariables): MutationRef<UpdateDonationData, UpdateDonationVariables>;
}
export const updateDonationRef: UpdateDonationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDonation(dc: DataConnect, vars: UpdateDonationVariables): MutationPromise<UpdateDonationData, UpdateDonationVariables>;

interface UpdateDonationRef {
  ...
  (dc: DataConnect, vars: UpdateDonationVariables): MutationRef<UpdateDonationData, UpdateDonationVariables>;
}
export const updateDonationRef: UpdateDonationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDonationRef:
```typescript
const name = updateDonationRef.operationName;
console.log(name);
```

### Variables
The `UpdateDonation` mutation requires an argument of type `UpdateDonationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDonationVariables {
  id: UUIDString;
  amount?: number | null;
}
```
### Return Type
Recall that executing the `UpdateDonation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDonationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDonationData {
  donation_update?: Donation_Key | null;
}
```
### Using `UpdateDonation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDonation, UpdateDonationVariables } from '@dataconnect/generated';

// The `UpdateDonation` mutation requires an argument of type `UpdateDonationVariables`:
const updateDonationVars: UpdateDonationVariables = {
  id: ..., 
  amount: ..., // optional
};

// Call the `updateDonation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDonation(updateDonationVars);
// Variables can be defined inline as well.
const { data } = await updateDonation({ id: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDonation(dataConnect, updateDonationVars);

console.log(data.donation_update);

// Or, you can use the `Promise` API.
updateDonation(updateDonationVars).then((response) => {
  const data = response.data;
  console.log(data.donation_update);
});
```

### Using `UpdateDonation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDonationRef, UpdateDonationVariables } from '@dataconnect/generated';

// The `UpdateDonation` mutation requires an argument of type `UpdateDonationVariables`:
const updateDonationVars: UpdateDonationVariables = {
  id: ..., 
  amount: ..., // optional
};

// Call the `updateDonationRef()` function to get a reference to the mutation.
const ref = updateDonationRef(updateDonationVars);
// Variables can be defined inline as well.
const ref = updateDonationRef({ id: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDonationRef(dataConnect, updateDonationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.donation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.donation_update);
});
```

## DeleteDonation
You can execute the `DeleteDonation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDonation(vars: DeleteDonationVariables): MutationPromise<DeleteDonationData, DeleteDonationVariables>;

interface DeleteDonationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDonationVariables): MutationRef<DeleteDonationData, DeleteDonationVariables>;
}
export const deleteDonationRef: DeleteDonationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDonation(dc: DataConnect, vars: DeleteDonationVariables): MutationPromise<DeleteDonationData, DeleteDonationVariables>;

interface DeleteDonationRef {
  ...
  (dc: DataConnect, vars: DeleteDonationVariables): MutationRef<DeleteDonationData, DeleteDonationVariables>;
}
export const deleteDonationRef: DeleteDonationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDonationRef:
```typescript
const name = deleteDonationRef.operationName;
console.log(name);
```

### Variables
The `DeleteDonation` mutation requires an argument of type `DeleteDonationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDonationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteDonation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDonationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDonationData {
  donation_delete?: Donation_Key | null;
}
```
### Using `DeleteDonation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDonation, DeleteDonationVariables } from '@dataconnect/generated';

// The `DeleteDonation` mutation requires an argument of type `DeleteDonationVariables`:
const deleteDonationVars: DeleteDonationVariables = {
  id: ..., 
};

// Call the `deleteDonation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDonation(deleteDonationVars);
// Variables can be defined inline as well.
const { data } = await deleteDonation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDonation(dataConnect, deleteDonationVars);

console.log(data.donation_delete);

// Or, you can use the `Promise` API.
deleteDonation(deleteDonationVars).then((response) => {
  const data = response.data;
  console.log(data.donation_delete);
});
```

### Using `DeleteDonation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDonationRef, DeleteDonationVariables } from '@dataconnect/generated';

// The `DeleteDonation` mutation requires an argument of type `DeleteDonationVariables`:
const deleteDonationVars: DeleteDonationVariables = {
  id: ..., 
};

// Call the `deleteDonationRef()` function to get a reference to the mutation.
const ref = deleteDonationRef(deleteDonationVars);
// Variables can be defined inline as well.
const ref = deleteDonationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDonationRef(dataConnect, deleteDonationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.donation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.donation_delete);
});
```

## CreateConnectCard
You can execute the `CreateConnectCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createConnectCard(): MutationPromise<CreateConnectCardData, undefined>;

interface CreateConnectCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateConnectCardData, undefined>;
}
export const createConnectCardRef: CreateConnectCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConnectCard(dc: DataConnect): MutationPromise<CreateConnectCardData, undefined>;

interface CreateConnectCardRef {
  ...
  (dc: DataConnect): MutationRef<CreateConnectCardData, undefined>;
}
export const createConnectCardRef: CreateConnectCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConnectCardRef:
```typescript
const name = createConnectCardRef.operationName;
console.log(name);
```

### Variables
The `CreateConnectCard` mutation has no variables.
### Return Type
Recall that executing the `CreateConnectCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConnectCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConnectCardData {
  connectCard_insert: ConnectCard_Key;
}
```
### Using `CreateConnectCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConnectCard } from '@dataconnect/generated';


// Call the `createConnectCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConnectCard();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConnectCard(dataConnect);

console.log(data.connectCard_insert);

// Or, you can use the `Promise` API.
createConnectCard().then((response) => {
  const data = response.data;
  console.log(data.connectCard_insert);
});
```

### Using `CreateConnectCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConnectCardRef } from '@dataconnect/generated';


// Call the `createConnectCardRef()` function to get a reference to the mutation.
const ref = createConnectCardRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConnectCardRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.connectCard_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.connectCard_insert);
});
```

## UpdateConnectCard
You can execute the `UpdateConnectCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateConnectCard(vars: UpdateConnectCardVariables): MutationPromise<UpdateConnectCardData, UpdateConnectCardVariables>;

interface UpdateConnectCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConnectCardVariables): MutationRef<UpdateConnectCardData, UpdateConnectCardVariables>;
}
export const updateConnectCardRef: UpdateConnectCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateConnectCard(dc: DataConnect, vars: UpdateConnectCardVariables): MutationPromise<UpdateConnectCardData, UpdateConnectCardVariables>;

interface UpdateConnectCardRef {
  ...
  (dc: DataConnect, vars: UpdateConnectCardVariables): MutationRef<UpdateConnectCardData, UpdateConnectCardVariables>;
}
export const updateConnectCardRef: UpdateConnectCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateConnectCardRef:
```typescript
const name = updateConnectCardRef.operationName;
console.log(name);
```

### Variables
The `UpdateConnectCard` mutation requires an argument of type `UpdateConnectCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateConnectCardVariables {
  id: UUIDString;
  message?: string | null;
}
```
### Return Type
Recall that executing the `UpdateConnectCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateConnectCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateConnectCardData {
  connectCard_update?: ConnectCard_Key | null;
}
```
### Using `UpdateConnectCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateConnectCard, UpdateConnectCardVariables } from '@dataconnect/generated';

// The `UpdateConnectCard` mutation requires an argument of type `UpdateConnectCardVariables`:
const updateConnectCardVars: UpdateConnectCardVariables = {
  id: ..., 
  message: ..., // optional
};

// Call the `updateConnectCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateConnectCard(updateConnectCardVars);
// Variables can be defined inline as well.
const { data } = await updateConnectCard({ id: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateConnectCard(dataConnect, updateConnectCardVars);

console.log(data.connectCard_update);

// Or, you can use the `Promise` API.
updateConnectCard(updateConnectCardVars).then((response) => {
  const data = response.data;
  console.log(data.connectCard_update);
});
```

### Using `UpdateConnectCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateConnectCardRef, UpdateConnectCardVariables } from '@dataconnect/generated';

// The `UpdateConnectCard` mutation requires an argument of type `UpdateConnectCardVariables`:
const updateConnectCardVars: UpdateConnectCardVariables = {
  id: ..., 
  message: ..., // optional
};

// Call the `updateConnectCardRef()` function to get a reference to the mutation.
const ref = updateConnectCardRef(updateConnectCardVars);
// Variables can be defined inline as well.
const ref = updateConnectCardRef({ id: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateConnectCardRef(dataConnect, updateConnectCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.connectCard_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.connectCard_update);
});
```

## DeleteConnectCard
You can execute the `DeleteConnectCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteConnectCard(vars: DeleteConnectCardVariables): MutationPromise<DeleteConnectCardData, DeleteConnectCardVariables>;

interface DeleteConnectCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConnectCardVariables): MutationRef<DeleteConnectCardData, DeleteConnectCardVariables>;
}
export const deleteConnectCardRef: DeleteConnectCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteConnectCard(dc: DataConnect, vars: DeleteConnectCardVariables): MutationPromise<DeleteConnectCardData, DeleteConnectCardVariables>;

interface DeleteConnectCardRef {
  ...
  (dc: DataConnect, vars: DeleteConnectCardVariables): MutationRef<DeleteConnectCardData, DeleteConnectCardVariables>;
}
export const deleteConnectCardRef: DeleteConnectCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteConnectCardRef:
```typescript
const name = deleteConnectCardRef.operationName;
console.log(name);
```

### Variables
The `DeleteConnectCard` mutation requires an argument of type `DeleteConnectCardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteConnectCardVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteConnectCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteConnectCardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteConnectCardData {
  connectCard_delete?: ConnectCard_Key | null;
}
```
### Using `DeleteConnectCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteConnectCard, DeleteConnectCardVariables } from '@dataconnect/generated';

// The `DeleteConnectCard` mutation requires an argument of type `DeleteConnectCardVariables`:
const deleteConnectCardVars: DeleteConnectCardVariables = {
  id: ..., 
};

// Call the `deleteConnectCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteConnectCard(deleteConnectCardVars);
// Variables can be defined inline as well.
const { data } = await deleteConnectCard({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteConnectCard(dataConnect, deleteConnectCardVars);

console.log(data.connectCard_delete);

// Or, you can use the `Promise` API.
deleteConnectCard(deleteConnectCardVars).then((response) => {
  const data = response.data;
  console.log(data.connectCard_delete);
});
```

### Using `DeleteConnectCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteConnectCardRef, DeleteConnectCardVariables } from '@dataconnect/generated';

// The `DeleteConnectCard` mutation requires an argument of type `DeleteConnectCardVariables`:
const deleteConnectCardVars: DeleteConnectCardVariables = {
  id: ..., 
};

// Call the `deleteConnectCardRef()` function to get a reference to the mutation.
const ref = deleteConnectCardRef(deleteConnectCardVars);
// Variables can be defined inline as well.
const ref = deleteConnectCardRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteConnectCardRef(dataConnect, deleteConnectCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.connectCard_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.connectCard_delete);
});
```

