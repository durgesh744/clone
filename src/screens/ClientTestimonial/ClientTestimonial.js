import axios from 'axios';
import Stars from 'react-native-stars';
import { useEffect, useState } from 'react';
import { SCREEN_WIDTH } from "../../config/Screen";
import { Node_base_url2 } from '../../config/constants';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Sizes, Fonts } from "../../assets/style";

function ClientTestimonial({ navigation }) {
    const [data, setData] = useState([])

    const fetch = async () => {
        const test = await axios.get(Node_base_url2 + `/get-all-testimonial`);
        setData(test.data.result)
    }

    useEffect(() => {
        fetch()
    }, [])

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
                data={data}
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