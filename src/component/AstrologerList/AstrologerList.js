import React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Sizes } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';

const AstrologerList = ({ navigation, item, handleRequest, handleWithAstroChat }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() =>
                //     navigation.navigate('astrologerDetailes', {
                //         data: item?.id,
                //     })
                // }
                style={{
                    width: SCREEN_WIDTH * 0.4,
                    marginLeft: Sizes.fixPadding * 1.5,
                    borderRadius: Sizes.fixPadding,
                    overflow: 'hidden',
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    marginBottom: Sizes.fixPadding * 1.5,
                    shadowColor: Colors.black,
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                }}>
                <Image
                    source={require('../../assets/gifs/trending.gif')}
                    style={{ width: '100%', height: Sizes.fixPadding * 2 }}
                />
                <View
                    style={{
                        paddingHorizontal: Sizes.fixPadding * 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: SCREEN_WIDTH * 0.14,
                            height: SCREEN_WIDTH * 0.14,
                            borderRadius: 1000,
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: Colors.primaryLight,
                            marginVertical: Sizes.fixPadding * 0.5,
                        }}
                    />
                    <Stars
                        default={4}
                        count={5}
                        half={true}
                        starSize={14}
                        fullStar={
                            <Ionicons name={'star'} size={14} color={Colors.primaryLight} />
                        }
                        emptyStar={
                            <Ionicons
                                name={'star-outline'}
                                size={14}
                                color={Colors.primaryLight}
                            />
                        }
                    // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                    />
                    <Text numberOfLines={1} >
                        {item.owner_name}
                    </Text>
                    <Text >
                        ({item.experties})
                    </Text>
                    <Text >{item.language}</Text>
                    <Text
                        style={{
                            marginTop: Sizes.fixPadding * 0.2,
                        }}>
                        ₹{(10)}/min
                    </Text>
                    <View
                        style={{
                            marginVertical: Sizes.fixPadding,
                        }}>
                        <TouchableOpacity
                            onPress={() =>  handleWithAstroChat (item)}
                            style={{
                                width: SCREEN_WIDTH * 0.14,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor:
                                    item.current_status == 'Busy'
                                        ? Colors.red_a
                                        : item?.current_status == 'Online'
                                            ? Colors.green_a
                                            : Colors.primaryLight,
                                borderRadius: Sizes.fixPadding * 0.5,
                                paddingVertical: Sizes.fixPadding * 0.4,
                                backgroundColor:
                                    item.current_status == 'Busy' ? Colors.red_a : Colors.white,
                            }}>
                            <Text
                                style={{
                                    color:
                                        item.current_status == 'Busy'
                                            ? Colors.white
                                            : item?.current_status == 'Online'
                                                ? Colors.green_a
                                                : Colors.primaryLight,
                                }}>
                                Chat
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color:
                                    item.current_status == 'Busy'
                                        ? Colors.red_a
                                        : item?.current_status == 'Online'
                                            ? Colors.green_a
                                            : Colors.primaryLight,
                            }}>
                            {item.current_status == 'Busy'
                                ? `Wait - ${item.max_call_min_last_user} min`
                                : item?.current_status == 'Online'
                                    ? 'Available Now'
                                    : ''}
                        </Text>
                    </View>

                    <View style={{ paddingBottom: 10 }} >
                        <Button onPress={() => handleRequest(item)} title='Send Request' />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AstrologerList
