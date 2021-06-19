
import React, { useEffect, useReducer, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { AuthContext } from './context';

//SCREEN CONTAINERS
import LoginContainer from '@bookstore/login/components/login-container';
import BookingContainer from '@bookstore/booking/components/booking-container';

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

const MainStack = () => (
  <AppStack.Navigator
    initialRouteName={'booking'}
    screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="booking" component={BookingContainer} />
  </AppStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName={'booking'}>
    <AuthStack.Screen name="login" component={LoginContainer} />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {!userToken ? (
      <RootStack.Screen
        name="App"
        component={MainStack}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const MainNavigator: React.FC = ({ }) => {
  const navigationRef = useRef() as React.MutableRefObject<NavigationContainerRef>;

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using AsyncStorage
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => {
        //logOutUser();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (token: string) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using AsyncStorage
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      if ("TOKEN") {
        authContext.signIn("TOKEN");
      } else {
        authContext.signOut();
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        <RootStackScreen
          userToken={state.userToken}
        />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default MainNavigator;