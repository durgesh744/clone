import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Sizes} from '../../assets/style';
import MyStatusBar from '../../components/MyStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native';
import {SCREEN_WIDTH} from '../../config/Screen';
import axios from 'axios';
import {api_url, base_url, get_fav, get_fortune_store_banner, get_mall_cat, img_url} from '../../config/constants';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import NoDataFound from '../../components/NoDataFound';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ScreenWidth } from '@rneui/base';
const width= Dimensions.get('screen').width
const data = [
  {
    id: 1,
    name: 'Pooja Kit',
    image: require('../../assets/images/ecommerce_1.png'),
  },
  {
    id: 2,
    name: 'Book a Pooja',
    image: require('../../assets/images/ecommerce_1.png'),
  },
  {
    id: 3,
    name: 'Gemstone',
    image: require('../../assets/images/ecommerce_3.png'),
  },
  {
    id: 4,
    name: 'Pooja Kit',
    image: require('../../assets/images/ecommerce_1.png'),
  },
  {
    id: 5,
    name: 'Gemstone',
    image: require('../../assets/images/ecommerce_3.png'),
  },
  {
    id: 6,
    name: 'Book a Pooja',
    image: require('../../assets/images/ecommerce_2.png'),
  },
  {
    id: 6,
    name: 'Book a Pooja',
    image: require('../../assets/images/ecommerce_2.png'),
  },
];

const ECommerce = ({navigation}) => {
  const [data, setdata] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(data.bannerData,"hello data");
  const [state, setState] = useState({
    categoryData: null,
    isLoading: false,
    selectedItem: null,
  });

  

  useEffect(() => {
    get_banner();
    get_category();
    
  }, []);

  const get_category = async () => {
    updateState({isLoading: false});
    axios({
      method: 'get',
      url: api_url + get_mall_cat,
    })
      .then(res => {
        updateState({isLoading: false});
        if (res.data.status) {
          updateState({categoryData: res.data.data});
        }
      })
      .catch(err => {
        console.log(err);
        updateState({isLoading: false});
      });
  };

  const updateState = data => {
    setState(prevState => {
      const newState = {...prevState, ...data};
      return newState;
    });
  };

  const get_banner = async () => {
    // setdata({isLoading: true});
    await axios({
      method: 'get',
      url: api_url + get_fortune_store_banner,
    })
     .then(res => {
        setdata({isLoading: false});
        console.log('sdfasdf0',res.data.data);
        setdata(res.data.data);
      })
     .catch(err => {
        setdata({isLoading: false});
        console.log(err);
      });
  };
  

  
  

  console.log('thisis banner sdfgsdfg data',data?.bannerData);


  const {categoryData, isLoading, selectedItem} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.bodyColor}}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {bannerInfo()}
              {categoryData && eCommerceDataInfo()}
            </>
          }
          contentContainerStyle={{paddingVertical: Sizes.fixPadding}}
        />
      </View>
      {/* {categoryData && continueButtonInfo()} */}
    </View>
  );

  function continueButtonInfo() {
    const on_continue = () => {
      if (selectedItem?.sub_cat == '1') {
        navigation.navigate('eCommerceSubCategory', {
          categoryData: selectedItem,
        });
      } else {
        navigation.navigate('productDetailes', {categoryData: selectedItem});
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={selectedItem == null}
        onPress={() => on_continue()}
        style={{
          marginHorizontal: Sizes.fixPadding * 4,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.5,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{paddingVertical: Sizes.fixPadding}}>
          <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
            Continue
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function eCommerceDataInfo() {

    const navigate_to =(type, item)=>{
      switch(type){
        case 'book a pooja': {
          navigation.navigate('bookPooja', {categoryData: item, type: 'book_a_pooja'})
          break;
        }
        case 'spell':{
          navigation.navigate('bookPooja', {categoryData: item, type: 'spell'})
          break;
        }
        default: {
          navigation.navigate('products', {categoryData: item, type: 'products'})
        }
      }
    }

    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigate_to(item?.name.toLowerCase(),item)
          }
          style={{
            width: SCREEN_WIDTH * 0.45,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            marginBottom: Sizes.fixPadding * 1.5,
            padding: Sizes.fixPadding * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: Sizes.fixPadding * 2,
          }}>
          <View
            style={{
              width: '90%',
              height: SCREEN_WIDTH * 0.4,
              borderTopLeftRadius: Sizes.fixPadding,
              borderTopRightRadius: Sizes.fixPadding,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: base_url + 'admin/' + item.image}}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <LinearGradient
            colors={[Colors.whiteDark, Colors.grayLight]}
            style={{
              width: '100%',
              backgroundColor: Colors.whiteDark,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              position: 'absolute',
              bottom: Sizes.fixPadding,
              paddingVertical: Sizes.fixPadding * 0.3,
              borderRadius: Sizes.fixPadding * 0.7,
              shadowColor: Colors.blackLight,
            }}>
            <Text
              style={[{...Fonts.black14InterMedium}, {textAlign: 'center'}]}>
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={categoryData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={{}}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }

  function bannerInfo() {
    return (
      <SwiperFlatList
      autoplay
      autoplayLoop
      
      data={data}
      renderItem={({ item }) => (
                  <Image
              source={{ uri: img_url +  item.image }} // Assuming each banner object has an 'imageUrl' property
              style={{ width:width, height:100, resizeMode:'contain',  }}
            />
      )}
    />
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
            alignSelf: 'flex-start',
            // flex: 0.2,
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
            // flex: 0.6,
          }}>
          Fortune Store
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/icons/cart.png')}
            style={{width: 22, height: 22}}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default ECommerce;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
