import Header from "@bookstore/common/components/header";
import { GRAY_BACKGROUND_COLOR, PRIMARY_DARK_COLOR } from "@bookstore/common/constants";
import { BOOKSTORE } from "@bookstore/login/constants";
import React from "react";
import { View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@bookstore/login/store/slices/user-slice";
import { AuthContext } from "@bookstore/router/context";
import { useContext } from "react";
import BookingTable from "./booking-table";
import { RootState } from "@bookstore/common/store";
import { getBooks } from "../store/slices/booking-slice";
import { useEffect } from "react";
import { showToast } from "@bookstore/common/utils";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND_COLOR,
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const BookingContainer: React.FC = () => {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const { isFetching, isError, isReloadNeeded, items } = useSelector(
    (root: RootState) => root.books.list
  );

  const { userInfo } = useSelector((root: RootState) => root.login.user);

  useEffect(() => {
    if (
      (!isFetching &&
        !isError &&
        items.length === 0 &&
        userInfo.sessionTokenBck !== null) ||
      isReloadNeeded
    ) {
      dispatch(getBooks());
    }
  }, [dispatch, isFetching, isError, items.length, isReloadNeeded, userInfo]);

  const onLogout = () => {
    dispatch(logout());
    if (authContext) {
      authContext.signOut();
      showToast({ type: 'success', title: 'Logout', message: 'Hasta luego 👋😉' })
    }
  };

  return (
    <View style={styles.root}>
      <Header
        title={BOOKSTORE}
        onPress={onLogout}
        buttonIcon={() => (
          <AntDesign
            name="logout"
            size={hp(3)}
            color={PRIMARY_DARK_COLOR}
          />)}
      />
      <View style={styles.tableContainer}>
        <BookingTable rows={items} isError={isError} />
      </View>
    </View>
  );
};

export default BookingContainer;