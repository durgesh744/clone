import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DateFilter from './DateFilter';
import { Text, View, FlatList } from 'react-native';
import { Colors, Sizes, Fonts } from '../../assets/style';
import MyStatusBar from '../../component/MyStatusBar';
import { api_url, advanced_panchang } from '../../config/constants';

const Yoga = ({ panchangData, panchangDataNew }) => {
  const [data, setData] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    get_Yoga();
  }, []);

  if (refresh) {
    const get_Yoga1 = async () => {
      await axios({
        method: 'post',
        url: api_url + advanced_panchang,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          date: panchangDataNew.newDate != null ? panchangDataNew.newDate : new Date(),
          latitude: panchangDataNew.latitude,
          longitude: panchangDataNew.longitude,
        },
      })
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    get_Yoga1();

  }

  const get_Yoga = async () => {
    await axios({
      method: 'post',
      url: api_url + advanced_panchang,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        date: new Date(),
        latitude: 28.4563,
        longitude: 78.5241,
      },
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding * 2,
        }}>
        <FlatList
          ListHeaderComponent={
            <>
              {searchBar()}
              {yogaTable()}
              {yogaData()}
            </>
          }
        />
      </View>
    </View>
  );

  function yogaData() {
    return (
      <View>
        <Text style={{ ...Fonts.gray16RobotoRegular }}>Translated as summation, Yog is calculated by taking the sum of longitudes of the Sun and Moon and then dividing that by 13 degrees and 20 minutes. There are a total of 27 Yogs defined in Vedic Astrology.</Text>
      </View>
    )
  }

  function yogaTable() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 2,
          backgroundColor: Colors.whiteDark,
          borderRadius: Sizes.fixPadding,
          borderWidth: 1,
          borderColor: Colors.grayMedium
        }}>
        <View style={{ borderBottomWidth: 1, padding: Sizes.fixPadding, borderBottomColor: Colors.grayMedium, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>Yog Number</Text>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>{data.advanced_panchang?.yog.details.yog_number}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, padding: Sizes.fixPadding, borderBottomColor: Colors.grayMedium, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>Today's Yog</Text>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>{data.advanced_panchang?.yog.details.yog_name}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, padding: Sizes.fixPadding, borderBottomColor: Colors.grayMedium, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>Special: </Text>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>{data.advanced_panchang?.yog.details.special}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, padding: Sizes.fixPadding, borderBottomColor: Colors.grayMedium, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>Meaning:-</Text>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>{data.advanced_panchang?.yog.details.meaning}</Text>
        </View>
        <View style={{ padding: Sizes.fixPadding, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>End Time</Text>
          <Text style={{ ...Fonts.gray16RobotoRegular }}>{`${data.advanced_panchang?.yog.end_time.hour}:${data.advanced_panchang?.yog.end_time.minute}:${data.advanced_panchang?.yog.end_time.second}`}</Text>
        </View>
      </View>
    )
  }
  function searchBar() {
    return (
      <DateFilter refresh={refresh} setRefresh={setRefresh} />
    );
  }
}

const mapStateToProps = state => ({
  panchangData: state.kundli.panchangData,
  panchangDataNew: state.kundli.panchangDataNew,
  currentLocation: state.kundli.currentLatLong,
})

export default connect(mapStateToProps, null)(Yoga)
