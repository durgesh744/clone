import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Sizes} from '../../assets/style';
import MyStatusBar from '../../component/MyStatusBar';
import Carousel from 'react-native-reanimated-carousel';
import {SCREEN_WIDTH} from '../../config/Screen';
import {useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MyHeader from '../../component/MyHeader';
import {img_url_2, img_url_3} from '../../config/constants';

const PoojaHistoryDetailes = ({navigation, route}) => {
  
  const progressValue = useSharedValue(0);
  const [state, setState] = useState({
    paginationIndex: 0,
    poojaData: route?.params?.poojaData,
  });
  useEffect(() => {}, [paginationIndex]);

  const updateState = data => {
    setState(prevState => {
      const newData = {...prevState, ...data};
      return newData;
    });
  };

  const {paginationIndex, poojaData} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.bodyColor}}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {poojaData?.pooja_image.length != 0 && astrologerSharedInfo()}
              {astrologerInfo()}
              {bannerInfo()}
              {renderPagination()}
              {remediesInfo()}
              {aboutInfo()}
              {/* {continueButtonInfo()} */}
            </>
          }
          // contentContainerStyle={{paddingVertical: Sizes.fixPadding}}
        />
      </View>
    </View>
  );

  function continueButtonInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('poojaPayement', {poojaData: poojaData})
        }
        style={{
          marginHorizontal: Sizes.fixPadding * 6,
          marginVertical: Sizes.fixPadding,
          borderRadius: 1000,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{paddingVertical: Sizes.fixPadding * 1}}>
          <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
            Book Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function aboutInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
        }}>
        <Text style={{...Fonts.black18RobotoMedium, color: Colors.blackLight}}>
          About the Product
        </Text>
        <Text
          style={{
            ...Fonts.gray14RobotoMedium,
            marginVertical: Sizes.fixPadding * 0.7,
          }}>
          {poojaData?.pooja_detail[0]?.description}
        </Text>
      </View>
    );
  }

  function remediesInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <Text style={{...Fonts.gray12RobotoMedium}}>
          Category - Book a Pooja
        </Text>
        <Text style={{...Fonts.primaryLight18RobotoMedium}}>
          {poojaData?.title}
        </Text>
        <Text style={{...Fonts.black16RobotoMedium}}>
          ₹ {poojaData?.price}{' '}
          {/* <Text
              style={{
                ...Fonts.gray16RobotoMedium,
                textDecorationLine: 'line-through',
              }}>
              {' '}
              7500{' '}
            </Text>{' '} */}
          {/* <Text style={{...Fonts.white14RobotoMedium, color: Colors.red}}>
              20% Off
            </Text> */}
        </Text>
      </View>
    );
  }

  function renderPagination() {
    return (
      <View style={styles.paginationContainer}>
        {poojaData?.pooja_detail[0]?.collection.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  paginationIndex === index
                    ? Colors.blackLight
                    : Colors.grayDark + '70',
              },
            ]}
          />
        ))}
      </View>
    );
  }

  function bannerInfo() {
    const baseOptions = {
      vertical: false,
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH * 0.7,
    };

    const renderItem = ({index}) => {
      return (
        <View
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.7,
            backgroundColor: Colors.whiteColor,
            borderRadius: Sizes.fixPadding * 2,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: img_url_3 + poojaData?.pooja_detail[0]?.collection[index]}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      );
    };

    return (
      <SafeAreaView edges={['bottom']} style={{flex: 1}}>
        <Carousel
          {...baseOptions}
          loop
          testID={'xxx'}
          style={{
            width: '100%',
            borderBottomColor: Colors.grayLight,
            paddingHorizontal: Sizes.fixPadding,
          }}
          autoPlay={true}
          autoPlayInterval={4000}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 112,
          }}
          data={poojaData?.pooja_detail[0]?.collection}
          pagingEnabled={true}
          onSnapToItem={index => {
            updateState({paginationIndex: index});
          }}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  }

  function astrologerInfo() {
    return (
      <View
        style={{
          marginLeft: Sizes.fixPadding * 1.5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: Sizes.fixPadding,
        }}>
        <View
          style={{
            width: SCREEN_WIDTH*0.22,
            height: SCREEN_WIDTH*0.22,
            borderRadius: 1000,
            borderWidth: 2,
            borderColor: Colors.white,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.black,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: img_url_2 + poojaData?.astrologer?.img_url}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.whiteDark,
            paddingVertical: Sizes.fixPadding * 0.2,
          }}>
          <Text style={{...Fonts.black14InterMedium, textAlign: 'center'}}>
            {poojaData?.astrologer?.owner_name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.whiteDark,
            paddingHorizontal: Sizes.fixPadding * 2,
            paddingVertical: Sizes.fixPadding,
            borderTopLeftRadius: Sizes.fixPadding,
            borderBottomLeftRadius: Sizes.fixPadding,
            elevation: 8,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.blackLight,
          }}>
          <Text style={{...Fonts.gray12RobotoMedium}}>Completed on</Text>
          <Text style={{...Fonts.gray16RobotoMedium}}>
            {moment(poojaData.date).format('DD MMM YYYY')}
          </Text>
          <Text style={{...Fonts.gray14RobotoMedium}}>
            {moment(poojaData?.time).format('hh:mm A')}
          </Text>
        </View>
      </View>
    );
  }

  function astrologerSharedInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>navigation.navigate('poojaAstroUploads', {
          poojaData: poojaData
        })}
        style={{
          margin: Sizes.fixPadding,
          backgroundColor: Colors.grayLight,
          padding: Sizes.fixPadding * 2,
          borderRadius: Sizes.fixPadding * 2,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowColor: Colors.blackLight
        }}>
        <Text
          style={{
            ...Fonts.primaryLight18RobotoMedium,
            textAlign: 'center',
            color: Colors.primaryDark
          }}>
          View Pooja Details shared by Astrologer
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return <MyHeader title={'Pooja Details'} navigation={navigation} />;
  }
};

export default PoojaHistoryDetailes;

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    paddingVertical: Sizes.fixPadding,
  },
  paginationDot: {
    width: 12,
    height: 2,
    borderRadius: 5,
    margin: 5,
  },
});
