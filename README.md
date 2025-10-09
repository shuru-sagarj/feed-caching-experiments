# Feed caching experiments (WIP)

<img width="334" height="708" alt="Screenshot 2025-10-06 at 8 55 17 PM" src="https://github.com/user-attachments/assets/9724b228-e09a-4d6c-a005-1f5fe3b6e46b" />
<img width="334" height="708" alt="Screenshot 2025-10-06 at 8 55 06 PM" src="https://github.com/user-attachments/assets/7d97f905-ffbe-4c5d-b7a9-d265b4ee6aa4" />



### Integrations
1. LegendApp State
2. expo-sqlite
3. easy-peasy
4. axios
5. TanStack Query (optional)

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
1. LegendApp State (tab screen 1) for global state management
2. easy-peasy (tab screen 2) for global state management
3. axios for network requests (mocked using `axios-mock-adapter`)
4. Offline data persistence with `expo-sqlite`, configured via LegendApp state and easy-peasy persist


### App Behavior
1. On the first screen which loads, if the message displayed is "Comments loaded from sqlite", it implies the comments were fetched once, persisted in sq-lite, and the store was rehydrated with that data.
2. If the message displayed is "Comments loaded from network", it implies either the `sync` is set to manual, or the comments were fetched manually via an api call by pressing the `Load Comments` button
3. The `source` property has been added on the comments store for testing purposes only, to confirm if the rehydration occurs as expected
