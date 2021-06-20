
import React, { useEffect, useReducer, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { AuthContext } from './context';

//SCREEN CONTAINERS
import LoginContainer from '@bookstore/login/components/login-container';
import BookingContainer from '@bookstore/booking/components/booking-container';
import { useSelector } from 'react-redux';
import { RootState } from '@bookstore/common/store';
import { logout } from '@bookstore/login/store/slices/user-slice';
import { showToast } from '@bookstore/common/utils';

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

const MainStack = () => (
  <AppStack.Navigator
    initialRouteName={'booking'}
    headerMode="none"
    screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="booking" component={BookingContainer} />
  </AppStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    headerMode="none"
    initialRouteName={'booking'}
    screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="login" component={LoginContainer} />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
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
  const token = useSelector((root: RootState) => root.login.user.userInfo.sessionTokenBck);

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
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
        dispatch(logout());
      },
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (token) {
        showToast({ type: 'success', message: 'Hola, Bienvenido 🤘🤗' });
        authContext.signIn(token);
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