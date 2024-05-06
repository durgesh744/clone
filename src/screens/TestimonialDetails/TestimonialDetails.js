import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MyStatusBar from '../../component/MyStatusBar';
import { Colors, Fonts, Sizes } from '../../assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TestimonialsDetails = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList ListHeaderComponent={<>{testimonialsInfo()}</>} />
            </View>
        </View>
    );

    function testimonialsInfo() {
        return (
            <>
            <View style={{ margin: Sizes.fixPadding * 1.5, backgroundColor: Colors.white, elevation: 5, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, shadowColor: Colors.blackLight }}>
                <Text style={{ ...Fonts.black14InterMedium }}>
                    {route?.params?.data?.description
                        ?.replace(/<[^>]*>/g, '')
                        .replace(/&#(?:x([\da-f]+)|(\d+));/gi, '')}
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
        </>
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
                    Testimonials
                </Text>
            </View>
        );
    }
};

export default TestimonialsDetails;

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
