import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import AddBtn from '../../components/add-btn';
import Heading from '../../components/heading';
import ListItem from '../../components/list-item';
import {ACTIONS} from '../../redux/action-types';
import {appColors} from '../../utils/colors';
import {
  getFontSize,
  getHeight,
  getWidth,
  widthScreen,
} from '../../utils/responsive-helper';

const GroceryListScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const currList = useSelector(state => state.grocRed.currList);

  useEffect(() => {
    setData(route?.params?.items ? route?.params?.items : currList);
  }, [route?.params?.items]);

  const onValueChange = (val, index) => {
    console.log(val);

    if (val == true) {
      let myArr = [...data];
      myArr[index].status = 'completed';
      setData(myArr);
    } else {
      let myArr = [...data];
      myArr[index].status = 'pending';
      setData(myArr);
    }
  };

  useEffect(() => {
    completionCheck();
  }, [data]);

  const completionCheck = useCallback(() => {
    let counter = 0;
    for (let i = 0; i < data?.length; i++) {
      if (data[i].status != 'pending') {
        counter++;
      }
      if (counter == data.length) {
        console.log('finished');
        // setIsFinished(true);
        setData([]);
        dispatch({type: ACTIONS.GROCERY_LIST, currList: null});
      }
    }
  }, [data]);

  console.log('hi');

  return (
    <SafeAreaView style={styles.container}>
      <Heading text="Current List" />
      {data?.length ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ListItem
                title={item.name}
                grocery={true}
                onValueChange={val => onValueChange(val, index)}
                isChecked={item.status == 'pending' ? false : true}
                value={item.status == 'pending' ? false : true}
                showPrice={true}
                price={item.price}
              />
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 20, color: 'white'}}>
            There is no current list right now, add it from all list
          </Text>
        </View>
      )}

      <AddBtn onPress={() => navigation.navigate('CreateListScreen')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backGround,
  },
  header: {
    marginVertical: getHeight(2),
  },
  heading: {
    fontSize: 35,
    fontWeight: '600',
    color: appColors.tab_color,
    marginLeft: getWidth(3),
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
});

export default GroceryListScreen;
