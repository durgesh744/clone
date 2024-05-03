import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import React, { createRef, useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'rn-country-picker';
import { Divider, Input } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {
    api_url2,
    base_url,
    google_login,
    user_web_api_login,
} from '../../config/constants';
import Loader from '../../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStatusBar from '../../component/MyStatusBar';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { useAuth } from '../../context/AuthContext';

const Login = ({ navigation }) => {
    const { setUser, user } = useAuth()
    const inputRef = createRef();
    const [state, setState] = useState({
        callingCode: '91',
        cca2: 'IN',
        phoneNumber: '',
        errorMessage: '',
        isLoading: false,
    });

    const validation = () => {
        const numericRegex = /^\d{10}$/;
        if (phoneNumber.length == 0) {
            setState((pre) => ({ ...pre, errorMessage: 'Please enter phone number' }))
            inputRef.current.shake();
            return false;
        } else if (phoneNumber.length != 10) {
            setState((pre) => ({ ...pre, errorMessage: 'Please enter correct phone number' }))
            inputRef.current.shake();
            return false;
        } else if (!numericRegex.test(phoneNumber)) {
            setState((pre) => ({ ...pre, errorMessage: 'Please enter numeric value' }))
            inputRef.current.shake();
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        GoogleSignin.configure()
    }, [])

    const on_login = async () => {
        setState((pre) => ({ ...pre, isLoading: true }))

        console.log(base_url +
            user_web_api_login +
            `number=${phoneNumber}`)

        if (validation()) {
            await axios({
                method: 'post',
                url:
                    base_url +
                    user_web_api_login +
                    `number=${phoneNumber}`,
            })
                .then(res => {
                    setState((pre) => ({ ...pre, isLoading: false }))
                    if (res.data.success) {
                        console.log(res.data)
                        navigation.navigate('Otp', {
                            otp: res.data.otp,
                            phone_number: state.phoneNumber
                        });
                        setUser(res.data)
                        AsyncStorage.setItem("user", JSON.stringify(res.data));
                    } else {
                        showToastWithGravityAndOffset(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setState((pre) => ({ ...pre, isLoading: false }))
                });
        }
    };

    const on_google_login = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            login_with_google(userInfo?.user)
        } catch (error) {
            console.log(error)
        }
    };

    const login_with_google = async userData => {
        try {
            setState((pre) => ({ ...pre, isLoading: true }))
            const response = await ApiRequest.postRequest({
                url: api_url2 + google_login,
                data: {
                    social_id: userData?.id,
                    email: userData?.email,
                    username: userData?.name,
                },
            });

            if (response?.success) {
                dispatch(UserActions.setUserData(response.data));

                await AsyncStorage.setItem(
                    'isRegister',
                    JSON.stringify({ type: 'login', value: true }),
                );
                navigation.navigate('Register', {
                    phone_number: state.phoneNumber
                });
            }
            setState((pre) => ({ ...pre, isLoading: false }))
        } catch (e) {
            console.log(e);
            await AsyncStorage.setItem('isRegister', JSON.stringify({ type: 'profile', value: false }));
            setState((pre) => ({ ...pre, isLoading: false }))
        }
    };

    const on_facebook_login = () => {
    };

    const go_home = () => {
        navigation.navigate(
        );
    };

    const { callingCode, cca2, phoneNumber, errorMessage, isLoading } = state;

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{ flex: 1 }}>
                {skipInfo()}
                {imageInfo()}
                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
                        {topTitleInfo()}
                        {phoneInput()}
                        {termsPrivacyInfo()}
                        {submiteButtonInfo()}
                        {orContinueInfo()}
                        {socialLoginInfo()}
                    </View>
                    {bottomViewInfo()}
                </View>
            </LinearGradient>
        </View>
    );

    function bottomViewInfo() {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginBottom: Sizes.fixPadding * 1.5,
                }}>
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/user.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
                        Verified Genuine{'\n'}Astrologers
                    </Text>
                </View>
                <Divider orientation="vertical" />
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/private.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
                        100%{'\n'}Private
                    </Text>
                </View>
            </View>
        );
    }

    function socialLoginInfo() {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding * 2,
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => on_facebook_login()}
                    style={{
                        ...styles.socialButton,
                        backgroundColor: Colors.blueFacebook,
                    }}>
                    <MaterialIcons
                        name="facebook"
                        color={Colors.white}
                        size={Sizes.fixPadding * 2.5}
                    />
                    <Text
                        style={{
                            ...Fonts.white14RobotoMedium,
                            marginLeft: Sizes.fixPadding,
                        }}>
                        Facebook
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={on_google_login}
                    style={{
                        ...styles.socialButton,
                        backgroundColor: Colors.white,
                        borderWidth: 0.5,
                        borderColor: Colors.gray,
                    }}>
                    <Image
                        source={require('../../assets/images/icons/google_logo.png')}
                        style={{
                            width: Sizes.fixPadding * 2.5,
                            height: Sizes.fixPadding * 2.5,
                        }}
                    />
                    <Text
                        style={{
                            ...Fonts.gray14RobotoMedium,
                            marginLeft: Sizes.fixPadding,
                        }}>
                        Google
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function orContinueInfo() {
        return (
            <Text style={{ ...Fonts.gray18RobotoRegular, textAlign: 'center' }}>
                Or Continue With
            </Text>
        );
    }

    function submiteButtonInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={on_login}
                style={{
                    width: '70%',
                    marginVertical: Sizes.fixPadding * 2,
                    alignSelf: 'center',
                }}>
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{
                        width: '100%',
                        paddingVertical: Sizes.fixPadding,
                        borderRadius: Sizes.fixPadding * 1.5,
                    }}>
                    <Text style={{ ...Fonts.white18RobotBold, textAlign: 'center' }}>
                        Send OTP
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    function termsPrivacyInfo() {
        return (
            <Text
                style={{
                    fontSize: 11,
                    fontFamily: 'Roboto-Regular',
                    textAlign: 'center',
                    marginHorizontal: Sizes.fixPadding,
                }}>
                By continue you agree to our Terms of use & Privacy Policy
            </Text>
        );
    }

    function phoneInput() {
        const onChangeText = text => {
            setState({ phoneNumber: text, errorMessage: '', isLoading: false });
        };
        return (
            <Input
                ref={inputRef}
                placeholder="Enter Mobile No."
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={text => onChangeText(text)}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ ...Fonts.black16RobotoRegular }}
                errorMessage={errorMessage}
                errorStyle={{ textAlign: 'center' }}
                leftIcon={
                    <View style={styles.flagContainer}>
                        <CountryPicker
                            countryCode={callingCode}
                            containerStyle={styles.pickerStyle}
                            pickerTitleStyle={styles.pickerTitleStyle}
                            countryFlagStyle={{
                                borderRadius: 0,
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                            }}
                            withCallingCode={true}
                            withFilter={true}
                            withEmoji={true}
                            containerButtonStyle={{}}
                            onSelect={text => {
                                console.log(text);
                            }}
                        />
                    </View>
                }
            />
        );
    }

    function topTitleInfo() {
        return (
            <Text
                style={{
                    ...Fonts.primaryDark16RobotoMedium,
                    textAlign: 'center',
                }}>
                Get Started With Fortune Talk!
            </Text>
        );
    }

    function imageInfo() {
        return (
            <View style={{ flex: 0.3 }}>
                <Image
                    source={require('../../assets/images/splash_logo.png')}
                    style={{
                        width: '40%',
                        height: '100%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
            </View>
        );
    }

    function skipInfo() {
        const on_skip = async () => {
            await AsyncStorage.setItem(
                'isRegister',
                JSON.stringify({ type: 'login', value: false }),
            );
            go_home();
        };
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={on_skip}
                style={{
                    flex: 0,
                    alignSelf: 'flex-end',
                    margin: Sizes.fixPadding * 2,
                }}>
                <Text style={{ ...Fonts.white14RobotoMedium }}>Skip</Text>
            </TouchableOpacity>
        );
    }
};


const styles = StyleSheet.create({
    bottomContainer: {
        flex: 0.7,
        backgroundColor: Colors.white,
        borderTopLeftRadius: Sizes.fixPadding * 7,
        paddingTop: Sizes.fixPadding * 2,
    },
    inputContainer: {
        marginHorizontal: Sizes.fixPadding * 3,
        borderWidth: 1,
        borderColor: Colors.grayLight,
        borderRadius: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: 0,
        marginTop: Sizes.fixPadding * 2,
    },
    flagContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Sizes.fixPadding * 0.8,
        borderRightWidth: 1,
        borderColor: Colors.grayLight,
    },
    socialButton: {
        flex: 0,
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 0.8,
        borderRadius: Sizes.fixPadding,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        color: '#000',
        fontSize: 25,
        marginBottom: 25,
        fontWeight: 'bold',
    },
    pickerTitleStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    pickerStyle: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        fontSize: 16,
        color: '#000',
    },
    selectedCountryTextStyle: {
        color: '#000',
        textAlign: 'right',
    },

    countryNameTextStyle: {
        color: '#000',
        textAlign: 'right',
    },

    searchBarStyle: {
        flex: 1,
    },
});


export default Login