import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../component/MyStatusBar';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Geolocation from 'react-native-geolocation-service';
import Choghadiya from '../Panchang/Choghadiya';
import SubhHora from '../Panchang/SubhHora';
import SubhMuhurat from '../Panchang/SubhMuhurat';
import Nakshatra from '../Panchang/Nakshatra';
import Yoga from '../Panchang/Yoga';
import Tithi from '../Panchang/Tithi';
import Karana from '../Panchang/Karana';
import RahuKaal from '../Panchang/RahuKaal';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'

const Tab = createMaterialTopTabNavigator();

const Panchang = ({ navigation, panchangData, dispatch, route }) => {
  const [state, setState] = useState({
    isLoading: false,
    location: null,
  });

  useEffect(() => { }, [panchangData])

  useEffect(() => {
    locationPermission();
  }, []);

  const locationPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status === RESULTS.GRANTED) {
      get_current_location();
    } else {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        get_current_location();
      } else {
      }
    }
  };

  const get_current_location = () => {
    Geolocation.getCurrentPosition(
      position => {
        const payload = {
          date: new Date().getDate().toString(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        dispatch(KundliActions.setCurrentLatLong({ lat: position.coords.latitude, long: position.coords.longitude }))
        dispatch(KundliActions.getPanchangData(payload))
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      {header()}
      <View style={{ flex: 1 }}>
      {panchangInfo()}
        {todaysInfo()}
      </View>
    </View>
  );

  function todaysInfo() {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Colors.primaryLight },
        }}
          tabBarOptions={{
            scrollEnabled: true,
          }}>
          <Tab.Screen name="choghadiya" component={Choghadiya} />
          <Tab.Screen name="subhHora" component={SubhHora} />
          <Tab.Screen name="subhMuhurat" component={SubhMuhurat} />
          <Tab.Screen name="nakshatra" component={Nakshatra} />
          <Tab.Screen name="tithi" component={Tithi} />
          <Tab.Screen name="yoga" component={Yoga} />
          <Tab.Screen name="karana" component={Karana} />
          <Tab.Screen name="rahuKaal" component={RahuKaal} />
        </Tab.Navigator>
      </View>
    );
  }

  function panchangInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <Text style={{ ...Fonts.gray16RobotoMedium, color: Colors.blackLight }}>
          Panchang
        </Text>
        <Text
          style={{
            ...Fonts.gray14RobotoRegular,
            marginTop: Sizes.fixPadding * 0.8,
          }}>
          A Panchang is an elaborate Hindu calendar and almanac that resorts to
          the traditional units of the Indian Vedic scriptures to provide
          information relevant to astrologers for them to forecast celestial
          occurrences, mark auspicious and inauspicious time frames for
          important occasions such as marriage, education, career, travel, etc.
        </Text>
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
          style={{
            position: 'absolute',
            zIndex: 99,
            padding: Sizes.fixPadding * 1.5,
          }}>
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
          Panchang
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  panchangData: state.kundli.panchangData

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Panchang);

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
  panchangItems: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  panchangMainText: {
    ...Fonts.gray16RobotoMedium,
    color: Colors.blackLight,
  },
  panchangSubText: {
    ...Fonts.gray14RobotoMedium,
    color: Colors.blackLight,
  },
});
