import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { createRef, useEffect, useState } from 'react';
import MyStatusBar from '../../component/MyStatusBar';
import { Colors, Fonts, Sizes } from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  api_url,
  api_url2,
  user_web_api_login,
  user_web_api_verification_otp,
} from '../../config/constants';
import Loader from '../../component/Loader';
import axios from 'axios';
import { showToastWithGravityAndOffset } from '../../methods/toastMessage';

const CELL_COUNT = 4;

const Otp = ({ navigation, route }) => {
  
  console.log(route.params.otp);
  const [otp, setOtp] = useState(route.params.otp);
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [otpprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const validation = () => {
    if (otp.toString() != value) {
      showToastWithGravityAndOffset('Wrong Otp!');
      return false;
    } else {
      return true;
    }
  };

  const handle_otp = async () => {
    if (validation()) {
      setIsLoading(true);
      await axios({
        method: 'get',
        url:
          api_url +
          user_web_api_verification_otp +
          `number=${route.params.phone_number}&otp=${value}`,
      })
        .then(async res => {
          setIsLoading(false);
          navigation.navigate('Register', {
            phone_number: route.params.phone_number,
            id: res.data.id,
          });
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  const resend_otp = async () => {
    setIsLoading(true);
    await axios({
      method: 'get',
      url:
        api_url2 +
        user_web_api_login +
        `number=${route.params.phone_number}`,
    })
      .then(res => {
        setIsLoading(false);
        if (res.data.status == 1) {
          setOtp(res.data.otp);
          setCounter(59);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

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
        {imageInfo()}
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            {backHandleInfo()}
            {topTitleInfo()}
            {numberInfo()}
            {phoneInput()}
            {resendOtpInfo()}
            {submiteButtonInfo()}
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  function submiteButtonInfo() {
    return (
      <TouchableOpacity
        onPress={handle_otp}
        activeOpacity={0.8}
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
            Verify
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function resendOtpInfo() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: Sizes.fixPadding * 3,
        }}>
        <Text style={{ ...Fonts.gray14RobotoRegular }}>Resend code in </Text>
        <Text style={{ ...Fonts.greenDark14InterMedium }}>{counter} Sec </Text>
        {counter == 0 && (
          <Text
            onPress={resend_otp}
            style={{ ...Fonts.primaryLight14RobotoMedium }}>
            Resend
          </Text>
        )}
      </View>
    );
  }

  function phoneInput() {
    const inputRef = createRef();
    return (
      <CodeField
        ref={inputRef}
        {...otpprops}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    );
  }

  function numberInfo() {
    return (
      <Text
        style={{
          ...Fonts.greenDark14InterMedium,
          textAlign: 'center',
          marginTop: Sizes.fixPadding * 3,
        }}>
        Otp send to +91 {route.params.phone_number}
      </Text>
    );
  }

  function topTitleInfo() {
    return (
      <Text
        style={{
          ...Fonts.primaryDark18RobotoMedium,
          textAlign: 'center',
        }}>
        Verify your Number
      </Text>
    );
  }

  function backHandleInfo() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: Sizes.fixPadding * 0.5,
          alignSelf: 'flex-start',
          marginHorizontal: Sizes.fixPadding * 2,
        }}>
        <AntDesign
          name="leftcircleo"
          color={Colors.primaryDark}
          size={Sizes.fixPadding * 2.2}
        />
      </TouchableOpacity>
    );
  }

  function imageInfo() {
    return <View style={{ flex: 0.1 }}></View>;
  }

}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.9,
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
  root: { flex: 1, padding: 20 },
  title: Fonts.greenDark14InterMedium,
  codeFieldRoot: { marginVertical: Sizes.fixPadding * 3, alignSelf: 'center' },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 42,
    borderWidth: 1,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.grayDark,
    textAlign: 'center',
    backgroundColor: Colors.white,
    marginRight: 5,
    marginHorizontal: 10,
    ...Fonts.gray14RobotoMedium,
    fontSize: 22,
  },
  focusCell: {
    borderColor: Colors.primaryLight,
  },
});


export default Otp