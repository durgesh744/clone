import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../../src/assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../component/MyStatusBar';
import { SCREEN_WIDTH } from '../../config/Screen';
import Loader from '../../component/Loader';
import { cate } from '../../config/data';

const MatchCategory = props => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      {header()}
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {categoryInfo()}
            </>
          }
        />
      </View>
    </View>
  )

  function categoryInfo() {
    const on_press = id => {
      switch (id) {
        case 1:
          props.navigation.navigate('matchBirthDetail', { data3: props.route.params.data1, data4: props.route.params.data2 });
          break;
        case 2:
          props.navigation.navigate('matchHoroscopeChart', { data3: props.route.params.data1, data4: props.route.params.data2 });
          break;
        case 3:
          props.navigation.navigate('matchAshtakoota', { data3: props.route.params.data1, data4: props.route.params.data2 });
          break;
        case 4:
          props.navigation.navigate('matchDashakoota', { data3: props.route.params.data1, data4: props.route.params.data2 });
          break;
        case 5:
          props.navigation.navigate('manglikMatch', { data3: props.route.params.data1, data4: props.route.params.data2 });
          break;
        case 6:
          props.navigation.navigate('matchConclusion', { data3: props.route.params.data1, data4: props.route.params.data2 });
        default:
          console.log(null);
      }
    };
    const renderItem = ({ item, index }) => {
      return (
        <View key={index} style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: SCREEN_WIDTH * 0.2, zIndex: 1, height: SCREEN_WIDTH * 0.2, borderRadius: SCREEN_WIDTH * 0.2, backgroundColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={item.img} style={{ width: SCREEN_WIDTH * 0.10, height: SCREEN_WIDTH * 0.10, borderRadius: SCREEN_WIDTH * 0.10, resizeMode: 'cover' }} />
          </View>
          <TouchableOpacity onPress={() => on_press(item.id)} style={{ borderWidth: 2.5, left: -25, padding: Sizes.fixPadding * 0.5, borderRadius: Sizes.fixPadding, borderColor: Colors.primaryDark, width: '70%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...Fonts.primaryDark16RobotoMedium, textAlign: 'center', textAlignVertical: 'center' }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 1.5 }}>
        <FlatList
          data={cate}
          renderItem={renderItem}
          key={item => item.id}
        />
      </View>
    )
  }

  function header() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          ...styles.row,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ position: 'absolute', zIndex: 99, padding: Sizes.fixPadding * 1.5 }}>
          <AntDesign
            name="leftcircleo"
            color={Colors.primaryLight}
            size={Sizes.fixPadding * 2.2}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.primaryLight15RobotoMedium,
            textAlign: 'center',
            flex: 1,
          }}>
          Kundli
        </Text>
      </View>
    );
  }
}

export default MatchCategory

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})