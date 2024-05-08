import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyStatusBar from '../../component/MyStatusBar'
import { Colors, Fonts, Sizes } from '../../assets/style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NoDataFound from '../../component/NoDataFound'
import { Image } from 'react-native'
import { SCREEN_WIDTH } from '../../config/Screen'

const DestinationPooja = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />

      <View style={{ flex: 1 }}>
        {header()}
        <FlatList ListHeaderComponent={<>{DestinationPoojaInfo()}</>} />
      </View>
    </View>
  )
}

function DestinationPoojaInfo() {

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

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('astrologyBlogDetails', { poojaData: item })
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
            textAlign:"center",
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
        Destination Pooja
      </Text>
    </View>
  );
}

export default DestinationPooja

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
