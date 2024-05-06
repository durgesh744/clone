import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Sizes} from '../../../src/assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../component/MyStatusBar';
import { SCREEN_WIDTH} from '../../config/Screen';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../component/Loader';
import {
  api_url,
  api2_get_horo_chart,
  api2_get_planets,
} from '../../config/constants';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import ShowSvg from '../../component/ShowSvg';
import { data } from '../../config/data';

const detailInfo = [
  {
    id: 1,
    title: 'Male',
  },
  {
    id: 2,
    title: 'Female',
  },
];

const MatchHoroscopeChart = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [planetData, setPlanetData] = useState(null);
  const [gender, setGender] = useState(0);
  const [kundleId, setKundliId] = useState(props.route.params.data3);

  useEffect(() => {
    get_horoSvg('D1', props.route.params.data3);
    get_planet();
  }, []);

  const get_horoSvg = async (chart_id) => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + api2_get_horo_chart,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        kundli_id:kundleId,
        chartid: chart_id,
      },
    }) .then(res => {
        setChartData(res.data.svg_code);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const get_planet = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + api2_get_planets,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        kundli_id: kundleId,
      },
    })
      .then(res => {
        setPlanetData(res.data.planets);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.bodyColor}}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      {header()}
      <View style={{flex: 1}}>
        <FlatList
          ListHeaderComponent={
            <>
              {selectChart()}
              {genderInfo()}
              {birthChart()}
              {chartData && chartSvg()}
              {planetInfo()}
            </>
          }
        />
      </View>
    </View>
  );

  function selectChart() {
    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{
            width: '100%',
            ...Fonts.black12RobotoRegular,
          }}
          containerStyle={{
            padding: Sizes.fixPadding,
            marginTop: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
          }}
          itemContainerStyle={{
            elevation: 10,
            backgroundColor: Colors.white,
            borderRadius: Sizes.fixPadding,
            justifyContent: 'center',
            alignItems: 'center',
            margin: Sizes.fixPadding,
          }}
          onChange={item => {
            setValue(item.name);
            get_horoSvg(item?.chartId, kundleId);
          }}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={800}
          labelField="name"
          valueField="id"
          placeholder="Select Chart"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </View>
    );
  }

  function genderInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: Sizes.fixPadding * 2,
          width: SCREEN_WIDTH * 0.8,
          elevation: 5,
          borderRadius: Sizes.fixPadding * 2,
          marginHorizontal: Sizes.fixPadding * 4,
        }}>
        <View
          style={{
            backgroundColor: gender == 0 ? Colors.grayLight : Colors.orange,
            padding: Sizes.fixPadding,
            justifyContent: 'center',
            width: '50%',
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
          }}>
          <TouchableOpacity
            style={{alignContent: 'center'}}
            onPress={() => {
              setKundliId(props.route.params.data3);
              setGender(1);
              get_horoSvg('D1', props.route.params.data3);
            }}>
            <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
              Male
            </Text>
          </TouchableOpacity>
        </View>
  
        <View
          style={{
            backgroundColor: gender == 0 ? Colors.orange : Colors.grayLight,
            padding: Sizes.fixPadding,
            justifyContent: 'center',
            width: '50%',
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              setKundliId(props.route.params.data4);
              setGender(0);
              get_horoSvg('D1', props.route.params.data4);
            }}
            style={{alignContent: 'center'}}>
            <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      
      </View>
    );
  }

  function planetInfo() {
    const renderItem = ({item, index}) => {
      return (
        <View
          key={index}
          style={{
            width: SCREEN_WIDTH * 0.2,
            marginHorizontal: Sizes.fixPadding * 2,
          }}>
          <View
            style={{
              backgroundColor: Colors.whiteDark,
              marginBottom: Sizes.fixPadding * 0.5,
              width: SCREEN_WIDTH * 0.275,
              paddingVertical: Sizes.fixPadding,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...Fonts.black12RobotoRegular,
                marginRight: Sizes.fixPadding,
              }}>
              {item.name}
            </Text>
            <Text style={{...Fonts.black12RobotoRegular}}>
              {item.fullDegree.toFixed(4)}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View style={{marginVertical: Sizes.fixPadding}}>
        <FlatList
          data={planetData}
          renderItem={renderItem}
          key={item => item.id}
          numColumns={3}
        />
      </View>
    );
  }

  function chartSvg() {
    return (
      <View style={{paddingHorizontal: Sizes.fixPadding * 0.5}}>
        <ShowSvg data={chartData} />
      </View>
    );
  }

  function birthChart() {
    return (
      <View
        style={{
          width: SCREEN_WIDTH * 0.9,
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.black14RobotoRegular}}>
          {value?.split('\n')[0]}
        </Text>
        <Text style={{...Fonts.blackLight14RobotoRegular, fontSize: 12}}>
          {value?.split('\n')[1]}
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
          onPress={() => props.navigation.goBack()}
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
          Horoscope Chart
        </Text>
      </View>
    );
  }
};

export default MatchHoroscopeChart;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    marginHorizontal: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding * 2,
    justifyContent: 'center',
    marginTop: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  dropdown: {
    height: 50,
    backgroundColor: Colors.grayLight,
    elevation: 10,
    borderRadius: Sizes.fixPadding,
    width: '100%',
    paddingHorizontal: Sizes.fixPadding * 1.5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  balance: {
    borderRadius: 10,
    backgroundColor: Colors.gray,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viwTxt: {
    ...Fonts.white11InterMedium,
    fontSize: 8,
    fontWeight: '700',
    lineHeight: 12,
  },
  buttonContainer: {
    paddingVertical: Sizes.fixPadding * 0.5,
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    marginTop: Sizes.fixPadding,
  },
});