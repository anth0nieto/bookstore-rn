import React, { useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { BookFormated } from "../model";
import { DataTable } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BOOKING_ID, BOOKING_PRICE, BOOOKING_TIME, ERROR_MESSAGE, FIRSTNAME, LASTNAME, STREET_ADDRESS } from "./constants";
import { useEffect } from "react";

type BookingTableProps = {
  rows: BookFormated[];
  isError: boolean;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: hp(3),
  }
});

const BookingTable: React.FC<BookingTableProps> = ({ rows, isError }) => {

  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState<BookFormated[]>([]);
  const [sort, setSorts] = useState({
    bookingId: 'ascending',
    bookingPrice: 'ascending',
    bookingTime: 'ascending',
    firstName: 'ascending',
    lastName: 'ascending',
    streetAddress: 'ascending',
  });

  useEffect(() => {
    if (rows.length > 0 && !isError) {
      setItems(rows);
    }
  }, [rows.length, isError]);

  const handleClickSortNumeric = (field: string) => {
    let newItems = [...items];
    if (sort[`${field}`] === 'ascending') {
      setSorts({ ...sort, [`${field}`]: 'descending' });
      newItems = newItems.sort((a, b) => (a[`${field}`] - b[`${field}`]));
    } else {
      setSorts({ ...sort, [`${field}`]: 'ascending' });
      newItems = newItems.sort((a, b) => (b[`${field}`] - a[`${field}`]));

    }
    setItems(newItems);
  };

  const handleClickSortText = (field: string) => {
    let newItems = [...items];
    if (sort[`${field}`] === 'ascending') {
      setSorts({ ...sort, [`${field}`]: 'descending' });
      newItems = newItems.sort((a, b) => a[`${field}`].localeCompare(b[`${field}`]));
    } else {
      setSorts({ ...sort, [`${field}`]: 'ascending' });
      newItems = newItems.sort((a, b) => b[`${field}`].localeCompare(a[`${field}`]));
    }
    setItems(newItems);
  };

  return (
    <View style={styles.root}>
      {
        !isError ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                numeric
                onPress={() =>
                  handleClickSortNumeric('bookingId')
                }>
                {BOOKING_ID}
              </DataTable.Title>
              <DataTable.Title
                numeric
                onPress={() =>
                  handleClickSortNumeric('bookingPrice')
                }>
                {BOOKING_PRICE}
              </DataTable.Title>
              <DataTable.Title
                numeric
                onPress={() =>
                  handleClickSortNumeric('bookingTime')
                }>
                {BOOOKING_TIME}
              </DataTable.Title>
              <DataTable.Title
                onPress={() =>
                  handleClickSortNumeric('firstName')
                }>
                {FIRSTNAME}
              </DataTable.Title>
              <DataTable.Title
                onPress={() =>
                  handleClickSortText('lastName')
                }>
                {LASTNAME}
              </DataTable.Title>
              <DataTable.Title
                onPress={() =>
                  handleClickSortText('streetAddress')
                }>
                {STREET_ADDRESS}
              </DataTable.Title>
            </DataTable.Header>

            {items.map((item, key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell numeric>{item.bookingId}</DataTable.Cell>
                <DataTable.Cell numeric>{item.bookingPrice}</DataTable.Cell>
                <DataTable.Cell numeric>{item.bookingTime}</DataTable.Cell>
                <DataTable.Cell>{item.firstName}</DataTable.Cell>
                <DataTable.Cell>{item.lastName}</DataTable.Cell>
                <DataTable.Cell>{item.streetAddress}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={(page) => setPage(page)}
              label="1-2 of 6"
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        ) : (
          <Text style={styles.errorText}>{ERROR_MESSAGE}</Text>
        )
      }
    </View >
  );
};

export default BookingTable;