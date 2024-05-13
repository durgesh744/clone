import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import MyStatusBar from '../../component/MyStatusBar'
import { Colors, Fonts, Sizes } from '../../assets/style'
import NoDataFound from '../../component/NoDataFound'
import { SCREEN_WIDTH } from '../../config/Screen'
import Header from '../../component/common/Header'

const DestinationPooja = ({ navigation }) => {
  const poojaData = [
    {
      id: 1,
      templeName: "Siddhivinayak Temple (Prabhadevi)",
      image: require("../../assets/images/temple1.png"),
      address: "Kolhapur Maharashtra",
      pooja: [
        {
          poojaName: "Mahapooja",
          description: "Devotees can have on their desire day",
          price: 3000,
          off: "10% off"
        },
        {
          poojaName: "Mahapooja",
          description: "Devotees can have on their desire day",
          price: 3000,
          off: "10% off"
        },
        {
          poojaName: "Hawana Pooja",
          description: "Devotees can have on their desire day",
          price: 3000,
          off: "10% off"
        },
      ]
    },
    {
      id: 2,
      templeName: "Shri Sai Baba Temple(Shirdi)",
      image: require("../../assets/images/temple1.png"),
      address: "Kolhapur Maharashtra",
      pooja: [
        {
          poojaName: "Mahapooja",
          description: "Devotees can have on their desire day",
          price: 3000,
          off: "10% off"
        },
        {
          poojaName: "Hawana Pooja",
          description: "Devotees can have on their desire day",
          price: 5000,
          off: "10% off"
        },
        {
          poojaName: "Mataji Nevadya",
          description: "Devotees can have on their desire day",
          price: 4000,
          off: "10% off"
        },
      ]
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Header navigation={navigation} />
      <FlatList ListHeaderComponent={<>{DestinationPoojaInfo()}</>} />
    </View>
  )

  function DestinationPoojaInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('destinationpoojadetails', { poojaData: item })
          }
          style={{
            marginHorizontal: Sizes.fixPadding,
            backgroundColor: Colors.whiteDark,
            marginBottom: Sizes.fixPadding * 2,
            borderRadius: Sizes.fixPadding,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.blackLight,
          }}>
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: SCREEN_WIDTH * 0.4,
              borderTopRightRadius: Sizes.fixPadding,
              borderTopLeftRadius: Sizes.fixPadding,
            }}
          />
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.white18RobotBold,
              fontSize: 14,
              color: Colors.black,
              paddingTop: Sizes.fixPadding,
              paddingLeft: Sizes.fixPadding,
              backgroundColor: Colors.primaryLight,
              color: Colors.white,
              paddingBottom: Sizes.fixPadding,
              fontSize: 18,
              textAlign: "center",
              borderBottomRightRadius: Sizes.fixPadding,
              borderBottomLeftRadius: Sizes.fixPadding,

            }}>
            {item.templeName.replace(/<[^>]*>/g, '')}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ paddingVertical: Sizes.fixPadding }}>
        <FlatList
          data={poojaData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }
}


export default DestinationPooja

