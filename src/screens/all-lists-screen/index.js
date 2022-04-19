import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddBtn from '../../components/add-btn';
import Heading from '../../components/heading';
import ListItem from '../../components/list-item';
import {appColors} from '../../utils/colors';
import {getFontSize, getHeight, getWidth} from '../../utils/responsive-helper';
import SQLite from 'react-native-sqlite-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {ACTIONS} from '../../redux/action-types';

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

const AllListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    console.log('getting data from db');
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'SELECT ID, name, created_at, status, updated_at FROM GroceryList',
          [],
          (tx, results) => {
            console.log('res - - ', results.rows.item(0));
            var len = results.rows.length;
            if (len > 0) {
              let temp = [];
              for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
                setItems(temp);
              }
            }
          },
        );
      });
    } catch (error) {
      console.log('error in getting data from db', error);
    }
  };

  const editList = async item => {
    // console.log('item  - - ', item);
    try {
      await db.transaction(tx => {
        tx.executeSql(
          `SELECT ID, name, price, status FROM ItemsList WHERE grocery_list_id = ${item.ID} `,
          [],
          (tx, results) => {
            console.log('res of item tbl - - ', results.rows.item(0));
            var len = results.rows.length;
            if (len > 0) {
              let temp = [];
              for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
              }
              console.log('temp - - ', temp);
              navigation.navigate('CreateListScreen', {
                items: temp,
              });
            }
          },
        );
      });
    } catch (error) {
      console.log('error in getting data from db', error);
    }
  };

  const deleteRow = async item => {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM GroceryList WHERE ID = ${item.ID}`,
          [],
          (tx, results) => {
            console.log('res of GroceryList tbl - - ', results);
          },
        );
      });
      let myArr = [...items];
      let newArr = myArr.filter(itm => itm.ID != item.ID);
      setItems(newArr);
    } catch (error) {
      console.log('error in getting data from db', error);
    }
    try {
      await db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ItemsList WHERE grocery_list_id = ${item.ID}`,
          [],
          (tx, results) => {
            console.log('res of item tbl - - ', results);
          },
        );
      });
    } catch (error) {
      console.log('error in getting data from db', error);
    }
  };

  const goToGroceryList = async item => {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          `SELECT ID, name, price, status FROM ItemsList WHERE grocery_list_id = ${item.ID}`,
          [],
          (tx, results) => {
            console.log('res of item tbl - - ', results.rows.item(0));
            var len = results.rows.length;
            if (len > 0) {
              let temp = [];
              for (let i = 0; i < results.rows.length; i++) {
                temp.push(results.rows.item(i));
              }
              console.log('temp - - ', temp);
              navigation.navigate('GroceryListScreen', {
                items: temp,
              });
              dispatch({type: ACTIONS.GROCERY_LIST, currList: temp});
            }
          },
        );
      });
    } catch (error) {
      console.log('error in getting data from db', error);
    }
  };

  const swipeRight = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          transform: [{scale}],
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => deleteRow(item)}
          style={styles.swipeRight}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/basket.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => editList(item)}
          style={styles.swipeRight}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => editList(item)}
          style={styles.swipeRight}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/add.png')}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading text="All List" />
      <Text style={{color: 'white'}}>Tip: Swipe item to add/delete/edit</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.itmSep}></View>}
        renderItem={({item, index}) => {
          // console.log('item', item);
          return (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                swipeRight(progress, dragX, item)
              }>
              <ListItem
                title={item.name}
                allList={true}
                onPress={() => goToGroceryList(item)}
              />
            </Swipeable>
          );
        }}
      />
      <AddBtn onPress={() => navigation.navigate('CreateListScreen')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backGround,
  },

  listItemContainer: {
    height: getHeight(6),
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  listItemTxt: {
    fontSize: getFontSize(2.5),
    marginLeft: getWidth(3),
    color: appColors.tab_color,
    fontWeight: '500',
  },
  itmSep: {
    height: getHeight(0.5),
    backgroundColor: 'white',
  },
  swipeRight: {
    backgroundColor: 'white',
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    height: '100%',
  },
});

export default AllListScreen;
