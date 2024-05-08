import { FlatList, Image, StyleSheet, Text, TextBase, TouchableOpacity, View } from "react-native"
import { Colors, Sizes, Fonts } from "../../assets/style"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from "../../component/MyStatusBar";
import { SCREEN_WIDTH } from "../../config/Screen";
import { useState } from "react";

const Notification = ({ navigation }) => {

    const [notification, setNotification] = useState([
        {
            heading: "Damo Class Started, Join Now!!",
            subHeading: "Lorem ipmus dolor sit amet"
        },
        {
            heading: "Damo Class Started, Join Now!!",
            subHeading: "Lorem ipmus dolor sit amet"
        },
        {
            heading: "Damo Class Started, Join Now!!",
            subHeading: "Lorem ipmus dolor sit amet"
        },
    ])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 10,
                    paddingHorizontal: Sizes.fixPadding,
                    paddingVertical: 7,
                    marginHorizontal: SCREEN_WIDTH * 0.025,
                    backgroundColor: "#F4F4F4",
                    borderRadius: 5,
                    shadowColor: Colors.blackLight,
                    elevation: 5,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10, alignItems: "center" }}>
                    <Image source={require("../../assets/images/logo_icon.png")} style={{
                        width: '10%',
                        height: 35,
                        resizeMode: "stretch"
                    }} />

                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center', fontWeight: "600", color: "black" }}>
                            {item.heading}
                        </Text>
                        <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
                            {item.subHeading}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            {header({ navigation })}
            <FlatList
                data={notification}
                renderItem={renderItem}
                scrollEnabled={false}
                style={{
                    paddingTop: 12,
                    paddingHorizontal: 5
                }}
            />
        </View>
    )
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
                }}
            >
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
                }}>
                Notification
            </Text>
            <TouchableOpacity>
                <Text style={{ color: Colors.primaryLight }} >Clear All</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Notification

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
});