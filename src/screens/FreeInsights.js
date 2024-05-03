import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import Loader from '../component/Loader';
import { SCREEN_WIDTH } from '../config/Screen';
import MyStatusBar from '../component/MyStatusBar';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { api_url, img_url, get_horoscope, free_insight_banner, api2_get_daily_horoscope } from '../config/constants';
import { freeInsightData, horoscopeData } from '../config/data';

const FreeInsights = ({ navigation }) => {
  const [state, setState] = useState({
    selectedHoroscope: 1,
    selectedHoroName: 'Aries',
    today: 0,
    activeHoroscope: null,
    allHoroscope: null,
    horoscope: null,
    isLoading: false,
    dailyHoroscope: null,
  });
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    get_horoscope_data('Aries');
    get_banner_data();
    get_daily_horoscope(selectedHoroName, selectedHoroscope);
  }, []);

  const get_horoscope_data = async value => {
    updateState({ isLoading: true })
    await axios({
      method: 'get',
      url: `${api_url + get_horoscope}/${value}`,
    })
      .then(res => {
        updateState({ isLoading: false })
      })
      .catch(err => {
        updateState({ isLoading: false })
      });
  };

  const get_banner_data = async () => {
    updateState({ isLoading: true })
    await axios({
      method: 'get',
      url: api_url + free_insight_banner,
    })
      .then(res => {
        setBanner(res.data.data);
        updateState({ isLoading: false })
      })
      .catch(err => {
        updateState({ isLoading: false })
      })
  }

  const get_daily_horoscope = async (HoroName, Horoscope) => {
    updateState({ selectedHoroscope: Horoscope, selectedHoroName: HoroName })
    updateState({ isLoading: true })

    await axios({
      method: 'get',
      url: api_url + api2_get_daily_horoscope + HoroName,
    }).then(res => {
      updateState({ dailyHoroscope: res.data })
      updateState({ activeHoroscope: res.data.today })
      updateState({ isLoading: false })
    }).catch(err => {
      updateState({ isLoading: false })
    })
  }

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { selectedHoroscope, today, horoscope, isLoading, dailyHoroscope, selectedHoroName, activeHoroscope } = state;

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
              {bannerInfo()}
              {freeInsightInfo()}
              {horoscopeInfo()}
              {daysInfo()}
              {personalLifeInfo()}
              {professionInfo()}
              {healthInfo()}
              {emotionInfo()}
              {travelInfo()}
              {luckInfo()}
            </>
          }
        />
      </View>
    </View>
  );

  function luckInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Luck</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.luck}
        </Text>
      </View>
    );
  }

  function travelInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Travel</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.travel}
        </Text>
      </View>
    );
  }

  function emotionInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Emotion</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.emotions}
        </Text>
      </View>
    );
  }

  function healthInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Health</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.health}
        </Text>
      </View>
    );
  }

  function professionInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Profession</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.profession}
        </Text>
      </View>
    );
  }

  function personalLifeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Personal Life</Text>
        <Text
          style={{ ...Fonts.gray14RobotoRegular, marginTop: Sizes.fixPadding }}>
          {activeHoroscope?.personal_life}
        </Text>
      </View>
    );
  }

  function daysInfo() {
    return (
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-evenly',
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
            marginBottom: Sizes.fixPadding * 2,
          },
        ]}>
        {/* Yesterday */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => updateState({ activeHoroscope: dailyHoroscope?.yesterday, today: -1 })}
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            marginVertical: Sizes.fixPadding * 1.5,
            borderColor: Colors.gray,
          }}>
          <Text
            style={[
              Fonts.gray16RobotoMedium,
              { color: today === -1 ? Colors.primaryLight : Colors.gray }, // Check for -1 instead of 1
            ]}>
            Yesterday
          </Text>
        </TouchableOpacity>
        {/* Today */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => updateState({ activeHoroscope: dailyHoroscope?.today, today: 0 })}
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            marginVertical: Sizes.fixPadding * 1.5,
            borderColor: Colors.gray,
          }}>
          <Text
            style={[
              Fonts.gray16RobotoMedium,
              { color: today === 0 ? Colors.primaryLight : Colors.gray }, // Check for 0 instead of 1
            ]}>
            Today
          </Text>
        </TouchableOpacity>
        {/* Tomorrow */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => updateState({ activeHoroscope: dailyHoroscope?.tomorrow, today: 1 })} // Ensure correct state update
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: Sizes.fixPadding * 1.5,
          }}>
          <Text
            style={[
              Fonts.gray16RobotoMedium,
              { color: today === 1 ? Colors.primaryLight : Colors.gray }, // Check for 1 instead of -1
            ]}>
            Tomorrow
          </Text>
        </TouchableOpacity>
      </View>
    );
  }



  function horoscopeInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => get_daily_horoscope(item.title, item.id)}
          style={[styles.center, { marginRight: Sizes.fixPadding * 2 }]}>
          <LinearGradient
            colors={
              selectedHoroscope == item.id
                ? [Colors.primaryLight, Colors.primaryDark]
                : [Colors.whiteDark, Colors.grayLight]
            }
            style={{
              width: SCREEN_WIDTH * 0.14,
              height: SCREEN_WIDTH * 0.14,
              padding: Sizes.fixPadding,
              borderRadius: 1000,
            }}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                tintColor:
                  selectedHoroscope == item.id
                    ? Colors.white
                    : Colors.blackLight,
              }}
            />
          </LinearGradient>
          <Text
            style={{
              ...Fonts.black14InterMedium,
              color: Colors.blackLight,
              marginTop: Sizes.fixPadding,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          paddingVertical: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <FlatList
          data={horoscopeData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2 }}
        />
      </View>
    );
  }

  function freeInsightInfo() {
    const on_press = id => {
      switch (id) {
        case 1:
          // navigation.navigate('matchMaking');
          break;
        case 2:
          navigation.navigate('matchMaking');
          break;
        case 3:
          navigation.navigate('freeKundli');
          break;
        case 4:
          navigation.navigate('panchang');
          break;
        default:
          console.log(null);
      }
    };

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => on_press(item.id)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Sizes.fixPadding,
            marginHorizontal: SCREEN_WIDTH * 0.025,
          }}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primaryDark]}
            locations={[0.75, 1]}
            style={{
              width: SCREEN_WIDTH * 0.2,
              height: SCREEN_WIDTH * 0.2,
              borderRadius: 1000,
              overflow: 'hidden',
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              marginBottom: Sizes.fixPadding * 0.5,
              shadowColor: Colors.black,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={item.image} style={{ width: '85%', height: '85%' }} />
          </LinearGradient>
          <Text
            style={
              item.id == 1
                ? { ...Fonts.primaryLight14RobotoRegular, textAlign: 'center' }
                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
          paddingBottom: Sizes.fixPadding,
        }}>
        <FlatList
          data={freeInsightData}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>
    );
  }

  function bannerInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: SCREEN_WIDTH * 0.95,
            height: 60,
            marginRight: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: Colors.grayLight,
          }}>
          <Image source={{ uri: img_url + item.image }} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          paddingVertical: Sizes.fixPadding,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <FlatList
          data={banner}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
          pagingEnabled
        />
      </View>
    );
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
          onPress={() => navigation.goBack()}
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
          Free Insights
        </Text>
      </View>
    );
  }
};

export default FreeInsights;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
