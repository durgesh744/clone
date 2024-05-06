import { Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-paper'
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../component/MyStatusBar'
import HomeSkeleton from '../../component/skeleton/HomeSkeleton'
import { TouchableOpacity } from 'react-native'
import { SCREEN_WIDTH } from '../../config/Screen'
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { dataBanner, freeInsightData } from '../../config/data'
import { img_url_2, img_url } from '../../config/constants'
import ClientTestimonial from '../ClientTestimonial/ClientTestimonial'
import LatestBlogs from '../LatestBlogs/LatestBlogs'
import EcommerceInfo from '../Ecommerce/EcommerceInfo'

const Home = ({ navigation }) => {
  const [state, setState] = useState({
    isRegister: false,
    backClickCount: 0,
    isLoading: false,
    testimonialsData: null,
    astroData: null,
    blogData: null,
    recentAstroData: null,
    activeChatVisible: false,
    liveAstroData: null,
    isRefreshing: false,
    offerAstroData: null,
    onlineAstroData: null,
    trendingAstroData: null,
    activeChatData: null,
    courseData: null,
    learningBannerData: null
  });

  const {
    isRegister,
    activeChatVisible,
    backClickCount,
    isLoading,
    testimonialsData,
    blogData,
    recentAstroData,
    liveAstroData,
    isRefreshing,
    astroData,
    offerAstroData,
    onlineAstroData,
    trendingAstroData,
    activeChatData,
    courseData,
    learningBannerData
  } = state;
  

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <HomeSkeleton visible={isLoading} />
      {header()}
      <FlatList ListHeaderComponent={
        <>
          {searchInfo()}
          {dataBanner && bannerInfo()}
          {liveAstroData != null
            ? liveAstroData.length != 0 && liveAstrologerInfo()
            : null}
          {freeInsightInfo({ navigation })}
          <EcommerceInfo navigation={navigation} />
          <LatestBlogs navigation={navigation}  />
          <ClientTestimonial navigation={navigation} />
        </>
      }
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 10 }}
      />
    </View>
  )
}

function freeInsightInfo({ navigation }) {
  const on_press = id => {
    switch (id) {
      case 1:
        navigation.navigate('freeInsights');
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
        <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Free Insights</Text>
      </View>
      <FlatList
        data={freeInsightData}
        renderItem={renderItem}
        scrollEnabled={false}
        horizontal
      />
    </View>
  );
}

function liveAstrologerInfo() {
  const on_live = item => {
  };
  const renderItem = ({ item, index }) => {
    return (
      <View>
        {item.status == 'live' ? (
          <Image
            source={require('../../assets/gifs/live_gif.gif')}
            style={{
              width: '80%',
              height: 20,
              resizeMode: 'contain',
              alignSelf: 'center',
              bottom: -10,
              zIndex: 99,
              marginLeft: Sizes.fixPadding * 1.5,
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: Colors.primaryLight,
              paddingVertical: Sizes.fixPadding * 0.2,
              width: '80%',
              height: 20,
              alignSelf: 'center',
              bottom: -10,
              zIndex: 99,
              marginLeft: Sizes.fixPadding * 1.5,
              borderRadius: 1000,
            }}>
            <Text style={{ ...Fonts.white12RobotoMedium, textAlign: 'center' }}>
              Scheduled
            </Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={item.status != 'live'}
          onPress={() => {
            on_live(item);
          }}
          style={{
            width: SCREEN_WIDTH * 0.28,
            height: SCREEN_WIDTH * 0.31,
            marginLeft: Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            borderWidth: item.id == 1 ? 3 : 0,
            borderColor: Colors.primaryLight,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            marginBottom: Sizes.fixPadding * 1.5,
            shadowColor: Colors.black,
          }}>
          <ImageBackground
            source={{ uri: img_url_2 + item.img_url }}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}></ImageBackground>
          <LinearGradient
            colors={[
              Colors.black + '00',
              item.id == 1 ? Colors.primaryLight : Colors.black,
            ]}
            locations={[0.75, 1]}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'flex-end',
              padding: Sizes.fixPadding * 0.4,
            }}>
            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
              <Text style={{ ...Fonts.white11InterMedium }}>
                {/* {item.owner_name} */}
                durgesh
              </Text>
              <Ionicons name="videocam" color={Colors.white} size={18} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingTop: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Live Astrologers</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('live')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={liveAstroData}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function bannerInfo() {
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.4,
  };

  const renderItem = ({ index }) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH * 0.95,
          height: SCREEN_WIDTH * 0.35,
          backgroundColor: Colors.whiteColor,
          borderRadius: 5,
          padding: Sizes.fixPadding * 0.5,
        }}>
        <Image
          source={{ uri: img_url + dataBanner[index].image }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            marginHorizontal: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        testID={'xxx'}
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
          marginTop: Sizes.fixPadding * 0.5,
          paddingHorizontal: Sizes.fixPadding,
        }}
        autoPlay={true}
        autoPlayInterval={4000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
        }}
        data={dataBanner}
        pagingEnabled={true}
        onSnapToItem={index => {
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

function searchInfo() {
  return (
    <View
      style={{
        paddingVertical: Sizes.fixPadding,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.gray + '30',
        paddingHorizontal: Sizes.fixPadding * 1.5,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('searchAstrologers', {
            astrologerData: astroData,
          })
        }
        style={{
          ...styles.row,
          borderBottomWidth: 0,
          margin: 0,
          padding: 0,
          paddingVertical: 0,
          paddingTop: 0,
          backgroundColor: Colors.grayLight + '50',
          borderRadius: 1000,
          paddingHorizontal: Sizes.fixPadding,
          height: 36,
        }}>
        <Image
          source={require('../../assets/images/icons/search.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text
          style={{
            ...Fonts.gray14RobotoRegular,
            marginLeft: Sizes.fixPadding,
          }}>
          Search for an astrologer...
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function header() {
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 1.5,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.openDrawer()}
        style={{ paddingVertical: Sizes.fixPadding }}>
        <Image
          source={require('../../assets/images/icons/bar_icon.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
      <Divider
        orientation="vertical"
        width={1}
        color={Colors.gray + '30'}
        style={{ marginHorizontal: Sizes.fixPadding }}
      />
      <Image
        source={require('../../assets/images/logo_icon.png')}
        style={{ width: 25, height: 25 }}
      />
      <Text
        style={{
          ...Fonts.primaryLight18RighteousRegular,
          marginLeft: Sizes.fixPadding,
        }}>
        FortuneTalk
      </Text>
      <View style={{ ...styles.row, flexGrow: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('wallet', { type: 'wallet' })}
          style={{ paddingVertical: Sizes.fixPadding * 0.5 }}>
          <Image
            source={require('../../assets/gifs/wallet_gif.gif')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            paddingVertical: Sizes.fixPadding * 0.5,
            marginLeft: Sizes.fixPadding,
          }}>
          <Image
            source={require('../../assets/images/icons/translate.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
