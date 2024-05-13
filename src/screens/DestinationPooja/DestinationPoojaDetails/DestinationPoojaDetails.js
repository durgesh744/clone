import React from 'react'
import { Divider } from 'react-native-paper'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../../component/common/Header'
import { Colors, Sizes } from '../../../assets/style'
import MyStatusBar from '../../../component/MyStatusBar'
import { TouchableWithoutFeedback } from 'react-native'

const DestinationPoojaDetails = ({ navigation, route }) => {
    const data = route.params.poojaData

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                <Header heading={"Destination Pooja"} navigation={navigation} />
                <FlatList ListHeaderComponent={
                    <>
                        {DestinationPoojaBanner()}
                        {DestinationPoojaDetail()}
                    </>
                }
                />
            </View>
        </View>
    )
    function DestinationPoojaBanner() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: Colors.primaryLight, height: 180 }} >
                    <Text style={{ paddingVertical: 20, textAlign: "center", fontWeight: 600, color: "white", fontSize: 16 }}>{data?.templeName}</Text>
                </View>
                <View style={{ alignItems: "center", marginTop: -120 }} >
                    <Image
                        source={require('../../../assets/images/users/user3.jpg')}
                        style={{
                            width: "90%",
                            height: 200,
                            borderRadius: 10,
                        }}
                    />
                </View>
                <Text style={{ paddingVertical: 10, textAlign: "center", fontWeight: 600, color: Colors.primaryLight, fontSize: 18 }}>{data?.address}</Text>
                <Divider />
            </View>
        )
    }

    function DestinationPoojaDetail() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("panditlist", { pooja: item })}
                >
                    <View style={{
                        borderRadius: 10,
                        borderWidth: 3,
                        borderColor: Colors.primaryLight,
                        marginBottom: Sizes.fixPadding,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        padding: 3
                    }}>
                        <Image
                            source={require('../../../assets/images/users/user3.jpg')}
                            style={{
                                width: 130,
                                height: 100,
                                borderRadius: 10,
                            }}
                        />
                        <View style={{ flex: 1 }} >
                            <Text style={{ paddingVertical: 2, fontWeight: 600, color: Colors.primaryLight, fontSize: 14 }}>{item.poojaName}</Text>
                            <Text style={{ fontWeight: 600, fontSize: 14 }}>{item.description}</Text>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 10
                            }}>

                                <Text style={{ paddingVertical: 2, fontWeight: 600, color: Colors.primaryDark, fontSize: 16 }}>₹{item.price}</Text>
                                <Text style={{ fontWeight: 600, color: Colors.red, fontSize: 12, paddingTop: 2 }}>10% off</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        };

        return (
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <Text style={{ paddingVertical: 10, fontWeight: 600, fontSize: 14 }}>Rituals on behalf Devotees</Text>
                <FlatList
                    data={data?.pooja}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}

export default DestinationPoojaDetails
