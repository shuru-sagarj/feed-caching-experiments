# Feed caching experiments (WIP)
<img width="334" height="708" alt="Screenshot 2025-10-06 at 7 00 32 PM" src="https://github.com/user-attachments/assets/6584ac74-1bd3-4a2c-8483-f05ed61131e3" />
<img width="334" height="708" alt="Screenshot 2025-10-06 at 7 00 24 PM" src="https://github.com/user-attachments/assets/fe052f4c-3f3a-4577-a043-925a42e22474" />



### Integrations
1. LegendApp State
2. expo-sqlite
3. axios
4. TanStack Query (optional)

### Installation
```bash
yarn
```

### Running the app
```bash
npx expo start
i
```
### Components
1. LegendApp State for global state management
2. axios for network requests (mocked using `axios-mock-adapter`)
3. Offline data persistence with `expo-sqlite`, configured via LegendApp state


### App Behavior
1. On the first screen which loads, if the message displated is "Comments loaded from sqlite", it implies the comments were fetched once, persisted in sq-lite, and the store was rehydrated with that data.
2. If the message displayed is "Comments loaded from network", it implies either the sync is set to manual, or the comments were fetched manually via an api call by pressing the Load Comments button
3. The `source` property has been added on the comments store for testing purposes only, to confirm if the rehydration occurs as expected
