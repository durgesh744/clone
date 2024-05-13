import React, { useState } from 'react'
import { Button, Divider } from 'react-native-paper'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../../component/common/Header'
import { Colors, Sizes, Fonts } from '../../../assets/style'
import MyStatusBar from '../../../component/MyStatusBar'
import { SCREEN_WIDTH } from '../../../config/Screen'
import NoDataFound from '../../../component/NoDataFound'
import Loader from '../../../component/Loader'
import LinearGradient from 'react-native-linear-gradient'

const PanditList = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)
    const data = route.params.pooja
    const [selectedAstrologer, setSelectedAstrologer] = useState(null);

    const selectAstrologer = (astrologer) => {
        setSelectedAstrologer(astrologer);
        // navigation.navigate('astrologerDetailes', {
        //     data: item?.id,
        // })
    };

    const astrologerData = [
        {
            owner_name: "Astro Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 10000,
            id: 1
        },
        {
            owner_name: "Durgesh Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 10000,
            id: 2
        },
        {
            owner_name: "Umesh Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 10000,
            id: 3
        },
        {
            owner_name: "Ramu Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 5000,
            id: 4
        },
        {
            owner_name: "Umesh Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 10000,
            id: 5
        },
        {
            owner_name: "Ramu Guruji",
            time: "10 Dec 2023 (10 am)",
            type: "Morning",
            price: 5000,
            id: 6
        }
    ]
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                <Header heading={"Pandit List"} navigation={navigation} />
                <FlatList ListHeaderComponent={
                    <>
                        {PanditListBanner()}
                        {PanditLists()}
                    </>
                }
                />
            </View>
        </View>
    )

    function PanditListBanner() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", paddingTop: Sizes.fixPadding }} >
                    <Image
                        source={require('../../../assets/images/users/user3.jpg')}
                        style={{
                            width: "90%",
                            height: 180,
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }} >
                    <Text style={{ paddingVertical: 2, fontWeight: 600, color: Colors.primaryLight, fontSize: 16 }}>{data.poojaName}</Text>
                    <Text style={{ fontWeight: 600, fontSize: 14 }}>{data.description}</Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 10,
                        paddingBottom: Sizes.fixPadding
                    }}>

                        <Text style={{ paddingVertical: 2, fontWeight: 600, color: Colors.primaryDark, fontSize: 16 }}>₹{data.price}</Text>
                        <Text style={{ fontWeight: 600, color: Colors.red, fontSize: 12, paddingTop: 2 }}>10% off</Text>
                    </View>
                </View>
                <Divider />
            </View>
        )
    }

    function PanditLists() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => selectAstrologer(item)}
                    style={{
                        borderColor: selectedAstrologer?.id === item.id ? Colors.primaryLight : Colors.grayLight,
                        borderWidth: 2,
                        width: SCREEN_WIDTH * 0.4,
                        marginTop: Sizes.fixPadding * 1,
                        borderRadius: Sizes.fixPadding,
                        overflow: 'hidden',
                        elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowColor: Colors.black,
                        backgroundColor: Colors.white,
                        alignItems: 'center',
                        backgroundColor: Colors.grayLight,
                        marginRight: 10,
                        marginLeft: 10,
                    }}>
                    <Image
                        source={require("../../../assets/images/users/user3.jpg")}
                        style={{
                            width: SCREEN_WIDTH * 0.14,
                            height: SCREEN_WIDTH * 0.14,
                            borderRadius: 1000,
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: Colors.white,
                            marginVertical: Sizes.fixPadding * 0.5,
                        }}
                    />
                    <View
                        style={{
                            paddingHorizontal: Sizes.fixPadding * 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: -1,
                        }}>
                        <Text numberOfLines={1} style={{ ...Fonts.black14InterMedium }}>
                            {item?.owner_name}

                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.black11InterMedium, color: "#686767", paddingVertical: 4 }}>
                            {item?.time}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.black11InterMedium, paddingBottom: 4, color: "#686767" }}>
                            ({item.type})
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-evenly',
                            width: '100%',
                            backgroundColor: Colors.primaryLight,
                            alignItems: 'center',
                            paddingVertical: Sizes.fixPadding,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}>
                        <Text style={{ ...Fonts.primaryDark11InterMedium, color: Colors.white }}>₹{item.price}/-</Text>
                    </View>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: Colors.bodyColor,
                        alignItems: "center",
                        paddingBottom: 30
                    }}
                >
                    <Loader visible={isLoading} />
                    <FlatList
                        data={astrologerData}
                        renderItem={renderItem}
                        numColumns={2}
                        ListEmptyComponent={<NoDataFound />}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        marginHorizontal: Sizes.fixPadding * 4,
                        marginVertical: Sizes.fixPadding,
                        borderRadius: Sizes.fixPadding * 1.5,
                        overflow: 'hidden',
                    }}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={{ paddingVertical: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
                            Book Now
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </>
        );
    };
}

export default PanditList
