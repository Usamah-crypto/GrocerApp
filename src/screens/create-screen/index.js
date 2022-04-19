import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../../components/heading';
import {appColors} from '../../utils/colors';
import {getFontSize, getHeight, getWidth} from '../../utils/responsive-helper';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MyGroceryDb.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('error db', error);
  },
);

const CreateListScreen = ({route}) => {
  const [myItems, setMyItems] = useState(
    route?.params?.items?.length ? route?.params?.items : [],
  );
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [listName, setListName] = useState('');

  useEffect(() => {
    createGroceryTable();
  }, []);

  useEffect(() => {
    createGroceryTable();
    createItemsTable();
  }, []);

  const createItemsTable = () => {
    console.log('create items table');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ItemsList(ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, status TEXT, grocery_list_id INTEGER REFERENCES GroceryList(ID))',
      );
    });
  };

  const createGroceryTable = () => {
    console.log('create grocery table');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS GroceryList(ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at TEXT, status TEXT, updated_at TEXT)',
      );
    });
  };

  const setData = async () => {
    let itemObj = {name: itemName, price: itemPrice};
    setMyItems(prev => {
      return [itemObj, ...prev];
    });
    console.log('item crated', myItems);
  };

  const addList = async () => {
    let obj = {itemsAdded: myItems, listName: listName};
    let insertedId;
    try {
      await db.transaction(async tx => {
        tx.executeSql(
          'INSERT INTO GroceryList (name,created_at,status,updated_at) VALUES(?,?,?,?)',
          [listName, new Date().toString(), 'pending', new Date().toString()],
          (tx, results) => {
            console.log('Results', results);
            insertedId = results.insertId;
            if (results.rowsAffected > 0) {
              Alert.alert('Data Inserted Successfully....');
            } else Alert.alert('Failed....');
          },
        );
      });
    } catch (error) {
      console.log('setting data err ', error);
    }
    try {
      console.log('myItems', myItems);
      await db.transaction(async tx => {
        for (let i = 0; i < myItems.length; i++) {
          console.log('myItems[i]', myItems[i].price, insertedId);

          tx.executeSql(
            'INSERT INTO ItemsList (name,price,status,grocery_list_id) VALUES(?,?,?,?)',
            [myItems[i].name, myItems[i].price, 'pending', insertedId],
            (tx, results) => {
              console.log('res for items table', results);
            },
          );
        }
      });
    } catch (error) {
      console.log('setting data err ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading text="Create List" />
      <TextInput
        onChangeText={setListName}
        value={listName}
        placeholder="Type List Name ..."
        placeholderTextColor={appColors.tab_color}
        style={styles.txtInputList}
      />
      {myItems?.map((item, index) => {
        return (
          <View key={index} style={styles.itemList}>
            <Text style={styles.items}>{item?.name}</Text>
            <Text style={styles.items}>{item?.price}</Text>
          </View>
        );
      })}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TextInput
          onChangeText={setItemName}
          value={itemName}
          placeholder="Add Items Name ..."
          placeholderTextColor={appColors.tab_color}
          style={styles.txtInput}
          onSubmitEditing={setData}
        />
        <TextInput
          onChangeText={setItemPrice}
          value={itemPrice}
          placeholder="Add Items Price ..."
          placeholderTextColor={appColors.tab_color}
          style={styles.txtInput}
          onSubmitEditing={setData}
        />
      </View>
      <TouchableOpacity
        disabled={
          itemPrice && itemName && listName && myItems.length ? false : true
        }
        style={styles.btn}
        onPress={addList}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backGround,
  },
  txtInput: {
    fontWeight: 'bold',
    fontSize: 17,

    marginVertical: getHeight(0.5),
  },
  txtInputList: {
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
    marginVertical: getHeight(0.5),
  },
  btn: {
    width: 70,
    height: 40,
    backgroundColor: appColors.tab_color,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: getWidth(5),
  },
  items: {
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: getHeight(0.5),
    color: appColors.tab_color,
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default CreateListScreen;
