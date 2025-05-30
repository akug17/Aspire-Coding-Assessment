This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Clone repository

git clone https://github.com/akug17/Aspire-Coding-Assessment

# Aspire Coding Assessment :

src/<br />
├── api/ # API services & mocks<br />
├── assets/ # Static assets<br />
├── components/ # Reusable components<br />
├── hooks/ # Custom hooks<br />
├── navigation/ # App navigation<br />
├── screens/ # Feature screens<br />
├── store/ # Redux and Redux-Saga setup<br />
├── theme/ # Colors<br />
├── types/ # Type definitions<br />
├── utils/ # Utilities<br />
└── App.tsx # Entry point of the app<br />

# Project Overview

- Card carousel with swipe navigation
- Card management (freeze/unfreeze)
- Balance information display
- Transaction spending limits
- New card creation flow

# Key Features Implemented

- View multiple cards in a horizontal carousel
- Freeze/unfreeze card functionality
- Card details display (number, expiry, CVV)
- Add a new card

# Technical Requirements

- React Native implementation
- TypeScript integration
- State management with Redux
- Unit test coverage
- Clean, maintainable code structure

# Architecture

# Key Components

- `DebitCardScreen`: Main container component
- `CardCarousel`: Handles card swiping functionality
- `Card`: Individual card display component
- `BalanceInfo`: Displays available balance
- `SpendingLimit`: Shows spending limits
- `SettingsOption`: Freeze/unfreeze functionality
- `AddCardModal`: Add new card

# State Management

- **Redux Toolkit**: Centralized state management
- **Redux Saga**: Side effects and API calls
- **Custom Hook (`useCard`)**: Local state and business logic

# useCard

- **Card Data Fetching**: Triggered on component mount via Redux Saga
- **Freeze/Unfreeze**: Dispatches Redux action with card ID
- **Scroll Handling**: Calculates visible card index during swipe
- **State Management**: Combines Redux store with local state

# Technical Highlights

- **Modular Components**: Small, focused UI components
- **Type Safety**: Comprehensive TypeScript integration
- **Performance**: Optimized card rendering with FlatList
- **Testing**: Demonstrated testing for functions, customHook, UI
- **State Management**: Clean separation of concerns

Supporting Screenshots :
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-05-24 at 06 40 43](https://github.com/user-attachments/assets/5ae089e0-2c27-48c1-afff-703ffc14e669)
![Screenshot_1748049052](https://github.com/user-attachments/assets/8ed3db33-5623-4468-add9-643984ff76be)
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-05-24 at 06 40 50](https://github.com/user-attachments/assets/f5c5cd86-613c-402e-be27-fb0394793835)
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-05-24 at 06 41 23](https://github.com/user-attachments/assets/bb0ee768-94ba-412d-a91b-acb98085dd85)
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-05-24 at 06 41 38](https://github.com/user-attachments/assets/43f83b0f-e626-47a3-ad12-017ecd76e0f4)
