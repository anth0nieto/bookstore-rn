// RootNavigation.js

import { createRef } from 'react';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function push(name: string) {
  navigationRef.current?.dispatch(StackActions.push(name));
}

export function pop(...args) {
  navigationRef.current?.dispatch(StackActions.pop(...args));
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

// add other navigation functions that you need and export them
export function getCurrentRouteName() {
  return navigationRef.current?.getCurrentRoute()?.name;
}