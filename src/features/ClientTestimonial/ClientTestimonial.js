import Stars from 'react-native-stars';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH } from "../../config/Screen";
import { Colors, Sizes, Fonts } from "../../assets/style";
import { base_url } from "../../config/constants";

function ClientTestimonial({navigation}) {

    const testimonialsData = [
        [
            {
                id: 1,
                description: "<p>Many blogs provide commentary on a particular subject or topic, ranging from philosophy, religion, and arts to science, politics, and sports. Others function as more personal online diaries or online brand advertising of a particular individual or company. </p>",
                cust_pic: require('../../assets/images/daily_horoscope.png'),
                name: "Durgesh",
                rating: 1,
            },
            {
                id: 2,
                description: "<p>Many blogs provide commentary on a particular subject or topic, ranging from philosophy, religion, and arts to science, politics, and sports. Others function as more personal online diaries or online brand advertising of a particular individual or company. </p>",
                cust_pic: require('../../assets/images/daily_horoscope.png'),
                name: "Priyanshi",
                rating: 3,
            },
        ],
        [
            {
                id: 1,
                description: "<p>Many blogs provide commentary on a particular subject or topic, ranging from philosophy, religion, and arts to science, politics, and sports. Others function as more personal online diaries or online brand advertising of a particular individual or company. </p>",
                cust_pic: require('../../assets/images/daily_horoscope.png'),
                name: "Jagriti",
                rating: 2,
            },
            {
                id: 2,
                description: "<p>Many blogs provide commentary on a particular subject or topic, ranging from philosophy, religion, and arts to science, politics, and sports. Others function as more personal online diaries or online brand advertising of a particular individual or company. </p>",
                cust_pic: require('../../assets/images/daily_horoscope.png'),
                name: "Roj",
                rating: 3,
            },
        ],
    ];


    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('tesetimonialsDetails', { data: item[0] })
                    }
                    activeOpacity={0.8}
                    style={{
                        width: SCREEN_WIDTH * 0.65,
                        marginLeft: Sizes.fixPadding * 1.5,
                        borderRadius: Sizes.fixPadding,
                        overflow: 'hidden',
                        borderColor: Colors.primaryLight,
                        elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        marginBottom: Sizes.fixPadding * 1.5,
                        shadowColor: Colors.black,
                        backgroundColor: Colors.white,
                        padding: Sizes.fixPadding * 0.8,
                    }}>
                    <Text numberOfLines={5} style={{ ...Fonts.gray11RobotoRegular }}>
                        "
                        {item[0]?.description
                            .replace(/<[^>]*>/g, '')
                            .replace(/&#(?:x([\da-f]+)|(\d+));/gi, '')}
                        "
                    </Text>
                    <View style={{ ...styles.row }}>
                        <Image
                            source={require('../../assets/images/users/user1.jpg')}
                            style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                ...Fonts.gray11RobotoRegular,
                                marginLeft: Sizes.fixPadding * 0.5,
                            }}>
                            {item[0]?.name}
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Stars
                                default={4}
                                count={5}
                                half={true}
                                starSize={9}
                                fullStar={
                                    <Ionicons
                                        name={'star'}
                                        size={9}
                                        color={Colors.primaryLight}
                                    />
                                }
                                emptyStar={
                                    <Ionicons
                                        name={'star-outline'}
                                        size={9}
                                        color={Colors.primaryLight}
                                    />
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {item.length == 2 && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate('tesetimonialsDetails', { data: item[1] })
                        }
                        style={{
                            width: SCREEN_WIDTH * 0.65,
                            marginLeft: Sizes.fixPadding * 1.5,
                            borderRadius: Sizes.fixPadding,
                            overflow: 'hidden',
                            borderColor: Colors.primaryLight,
                            elevation: 5,
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                            marginBottom: Sizes.fixPadding * 1.5,
                            shadowColor: Colors.black,
                            backgroundColor: Colors.white,
                            padding: Sizes.fixPadding * 0.8,
                        }}>
                        <Text numberOfLines={5} style={{ ...Fonts.gray11RobotoRegular }}>
                            "
                            {item[1]?.description
                                .replace(/<[^>]*>/g, '')
                                .replace(/&#(?:x([\da-f]+)|(\d+));/gi, '')}
                            "
                        </Text>
                        <View style={{ ...styles.row }}>
                            <Image
                                source={require('../../assets/images/users/user2.jpg')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 100,
                                }}
                            />
                            <Text
                                style={{
                                    ...Fonts.gray11RobotoRegular,
                                    marginLeft: Sizes.fixPadding * 0.5,
                                }}>
                                {item[1]?.name}
                            </Text>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <Stars
                                    default={4}
                                    count={5}
                                    half={true}
                                    starSize={9}
                                    fullStar={
                                        <Ionicons
                                            name={'star'}
                                            size={9}
                                            color={Colors.primaryLight}
                                        />
                                    }
                                    emptyStar={
                                        <Ionicons
                                            name={'star-outline'}
                                            size={9}
                                            color={Colors.primaryLight}
                                        />
                                    }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
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
                    paddingVertical: Sizes.fixPadding,
                }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>
                    Client Testimonials
                </Text>
            </View>
            <FlatList
                data={testimonialsData}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
            />
        </View>
    );
}

export default ClientTestimonial

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});