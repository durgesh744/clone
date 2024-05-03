import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../assets/style';
import MyStatusBar from '../../component/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet, Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import { camera_options } from '../../config/data';
import axios from 'axios';
import {
  api_url2,
  update_customer_profile,
} from '../../config/constants';
import { showToastWithGravityAndOffset } from '../../methods/toastMessage';
import Loader from '../../component/Loader';
import CountryPicker from 'rn-country-picker';
import { connect } from 'react-redux';

const genderData = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const occupationData = [
  { label: 'Student', value: 'Student' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Business', value: 'Business' },
  { label: 'Entrepreneur', value: 'Entrepreneur' },
  { label: 'Housewife', value: 'Housewife' },
  { label: 'Unemployment', value: 'Unemployment' },
];

const problemData = [
  { label: 'Relationship Problem', value: 'Relationship Problem' },
  { label: 'Marriage Problem', value: 'Marriage Problem' },
  { label: 'Career Issue', value: 'Career Issue' },
  { label: 'Business Problem', value: 'Business Problem' },
  { label: 'Family Problem', value: 'Family Problem' },
  { label: 'Health Problem', value: 'Health Problem' },
];

const { width, height } = Dimensions.get('window');

const Register = ({ navigation, selectedLocation, route }) => {

  const [gender, setGender] = useState(null);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    callingCode: '91',
    cca2: 'IN',
    genderFocus: false,
    birthDate: null,
    calenderVisible: false,
    timeVisible: false,
    time: null,
    address: null,
    currentAddress: '',
    profileImage: null,
    baseSixtyFour: null,
    bottomSheetVisible: false,
    selectedOccupation: null,
    occupationFocus: false,
    selectedProblem: null,
    problemFocus: false,
    isLoading: false,
  });

  const {
    firstName,
    lastName,
    email,
    genderFocus,
    birthDate,
    calenderVisible,
    timeVisible,
    time,
    baseSixtyFour,
    profileImage,
    bottomSheetVisible,
    selectedOccupation,
    occupationFocus,
    selectedProblem,
    problemFocus,
    address,
    currentAddress,
    isLoading,
    callingCode,
    cca2,
  } = state;

  const updateState = data => {
    setState(prevState => {
      const newState = { ...prevState, ...data };
      return newState;
    });
  };

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidName(name) {
    // Allow letters, hyphens, and spaces
    const nameRegex = /^[A-Za-z\- ]+$/;
    return nameRegex.test(name);
  }

  function isValidLastName(name) {
    // Allow letters, hyphens, and spaces
    const nameRegex = /^[A-Za-z\- ]+$/;
    return nameRegex.test(name);
  }

  const validation = () => {
    if (!isValidName(firstName)) {
      showToastWithGravityAndOffset('Please enter your valid first name.');
      return false;
    } else if (lastName.length != 0 && !isValidLastName(lastName)) {
      showToastWithGravityAndOffset('Please enter your valid last name.');
      return false;
    } else if (gender == null) {
      showToastWithGravityAndOffset('Please select your gender.');
      return false;
    } else if (!isValidEmail(email)) {
      showToastWithGravityAndOffset('Please enter valid email.');
      return false;
    } else if (birthDate.length == 0) {
      showToastWithGravityAndOffset('Please select your birth date.');
      return false;
    } else if (time == null) {
      showToastWithGravityAndOffset('Please select your birth time.');
      return false;
    } else if (selectedLocation == null) {
      showToastWithGravityAndOffset('Please select your birth address.');
      return false;
    } else if (currentAddress.length == 0) {
      showToastWithGravityAndOffset('Please enter your current address.');
      return false;
    } else if (selectedOccupation == null) {
      showToastWithGravityAndOffset('Please select your occupation.');
      return false;
    } else if (selectedProblem == null) {
      showToastWithGravityAndOffset('Please select your problem.');
      return false;
    } else {
      return true;
    }
  };

  console.log(state, "data data data data data ")


  const register = async () => {
    
    console.log(api_url2 + update_customer_profile + `/66234cb6bc0b52dd9c6881f4`,     " url: api_url2 + update_customer_profile +`/661caf611d0b4e48b67634d2`")
    
    if (validation()) {
      updateState({ isLoading: true });

      let data = new FormData();
        data.append('first_name', firstName),
        data.append('last_name', lastName),
        data.append('date_of_birth', moment(birthDate).format('YYYY-MM-DD'));
        data.append('time_of_birth', moment(time).format('hh:mm'));
        data.append('gender', gender),
        data.append('email', email.length == 0 ? 'null' : email),
        data.append('type', 'phone'),
        data.append('country', 'India'),
        data.append('country_code', '+91'),
        data.append('occupation', selectedOccupation),
        data.append('problem', selectedProblem),
        data.append('current_address', currentAddress);
        data.append('place_of_birth', selectedLocation?.address);
        data.append('lon', selectedLocation?.lat);
        data.append('lat', selectedLocation?.long);

      if (baseSixtyFour != null) {
        data.append('image', baseSixtyFour.toString());
      }

      console.log(state, "data data data data data ")
      console.log(api_url2 + update_customer_profile + `/661caf611d0b4e48b67634d2`,     " url: api_url2 + update_customer_profile +`/661caf611d0b4e48b67634d2`")
      

      await axios({
        method: 'put',
        url: api_url2 + update_customer_profile + `/66234cb6bc0b52dd9c6881f4`,
        headers: {
          'Content-Type': 'aplication/json',
        },
        data: state,
      })
        .then(res => {
          console.log(res, "res")
          updateState({ isLoading: false });
          navigation.navigate("Home");
        })
        .catch(err => {
          updateState({ isLoading: false });
          console.log(err);
        });
    }
  };


  const get_profile_pick = useCallback((type, options) => {
    if (type == 'capture') {
      ImagePicker.launchCamera(options, res => {
        updateState({ bottomSheetVisible: false });
        if (res.didCancel) {
          console.log('user cancel');
        } else if (res.errorCode) {
          console.log(res.errorCode);
        } else if (res.errorMessage) {
          console.log(res.errorMessage);
        } else {
          updateState({
            profileImage: res.assets[0].uri,
            baseSixtyFour: res.assets[0].base64,
          });
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, res => {
        updateState({ bottomSheetVisible: false });
        if (res.didCancel) {
          console.log('user cancel');
        } else if (res.errorCode) {
          console.log(res.errorCode);
        } else if (res.errorMessage) {
          console.log(res.errorMessage);
        } else {
          updateState({
            profileImage: res.assets[0].uri,
            baseSixtyFour: res.assets[0].base64,
          });
        }
      });
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {header()}
              {gapInsert()}
              {profileImageInfo()}
              {firstNameLastNameInfo()}
              {emailInfo()}
              {phoneInput()}
              {GenderBirthInfo()}
              {TimeBirthBirthPlaceInfo()}
              {currentAddresInfo()}
              {occupationInfo()}
              {problemInfo()}
              {proceedButton()}
            </>
          }
        />
      </View>
      {bottomSheetInfo()}
    </View>
  );

  function bottomSheetInfo() {
    return (
      <BottomSheet
        isVisible={bottomSheetVisible}
        onBackdropPress={() => updateState({ bottomSheetVisible: false })}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: Sizes.fixPadding * 2,
            backgroundColor: Colors.white,
          }}>
          {camera_options.map(item => (
            <TouchableOpacity
              key={item.title}
              onPress={() => get_profile_pick(item.type, item.options)}
              style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name={item.title == 'Camera' ? 'camera' : 'image'}
                size={25}
                color={Colors.blackLight}
              />
              <Text
                style={{
                  ...Fonts.primaryLight15RobotoMedium,
                  marginLeft: 5,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }

  function proceedButton() {
    return (
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={{
          width: '70%',
          borderRadius: Sizes.fixPadding * 1.5,
          alignSelf: 'center',
          marginVertical: Sizes.fixPadding,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={register}
          activeOpacity={0.8}
          style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
            Proceed
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  function problemInfo() {
    const renderItem = (item, selected) => {
      return (
        <View
          style={{
            padding: Sizes.fixPadding,
            borderBottomWidth: item._index + 1 != 1 ? 1 : 0,
            borderColor: Colors.gray,
            backgroundColor: Colors.white,
          }}>
          <Text
            style={
              selected
                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
            }>
            {item.label}
          </Text>
        </View>
      );
    };
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
        <View style={{ flex: 0.25 }}>
          <Text style={{ ...Fonts.gray14RobotoMedium }}>Problem</Text>
        </View>

        <Dropdown
          style={[
            styles.dropdown,
            problemFocus && { borderColor: Colors.primaryLight },
            { flex: 0.6 },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          containerStyle={styles.dropdownContainer}
          iconStyle={styles.iconStyle}
          data={problemData}
          maxHeight={300}
          dropdownPosition="top"
          labelField="label"
          valueField="value"
          placeholder={!problemFocus ? 'Options' : '...'}
          value={selectedProblem}
          onFocus={() => updateState({ problemFocus: true })}
          onBlur={() => updateState({ problemFocus: false })}
          onChange={item => {
            updateState({ selectedProblem: item.value, problemFocus: false });
          }}
          renderItem={renderItem}
        />
      </View>
    );
  }

  function occupationInfo() {
    const renderItem = (item, selected) => {
      return (
        <View
          style={{
            padding: Sizes.fixPadding,
            borderBottomWidth: item._index + 1 == 1 ? 0 : 1,
            borderColor: Colors.gray,
            backgroundColor: Colors.white,
          }}>
          <Text
            style={
              selected
                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
            }>
            {item.label}
          </Text>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: Sizes.fixPadding * 2,
        }}>
        <View style={{ flex: 0.25 }}>
          <Text style={{ ...Fonts.gray14RobotoMedium }}>Occupation</Text>
        </View>

        <Dropdown
          style={[
            styles.dropdown,
            occupationFocus && { borderColor: Colors.primaryLight },
            { flex: 0.6 },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          containerStyle={styles.dropdownContainer}
          iconStyle={styles.iconStyle}
          data={occupationData}
          dropdownPosition="top"
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!occupationFocus ? 'Occupation' : '...'}
          value={selectedOccupation}
          onFocus={() => updateState({ occupationFocus: true })}
          onBlur={() => updateState({ occupationFocus: false })}
          onChange={item => {
            updateState({
              selectedOccupation: item.value,
            });
          }}
          renderItem={renderItem}
        />
      </View>
    );
  }

  function currentAddresInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding,
        }}>
        <Input
          // disabled
          value={currentAddress}
          placeholder="Current Address"
          numberOfLines={2}
          placeholderTextColor={Colors.grayDark}
          onChangeText={text => updateState({ currentAddress: text })}
          containerStyle={{ flex: 0.45, padding: 0 }}
          inputContainerStyle={{ height: 30, borderBottomColor: Colors.gray }}
          inputStyle={{ ...Fonts.black16RobotoRegular }}
          rightIcon={
            <Ionicons name="location-sharp" color={Colors.gray} size={25} />
          }
        />
      </View>
    );
  }

  function TimeBirthBirthPlaceInfo() {
    const onSetTime = data => {
      updateState({ timeVisible: false });
      if (data.type == 'set') {
        updateState({ time: data.nativeEvent.timestamp });
      }
    };

    const show_time = () => {
      DateTimePickerAndroid.open({
        value: time == null ? new Date() : new Date(time),
        mode: 'time',
        is24Hour: false,
        onChange: onSetTime,
      });
    };
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'black', top: Sizes.fixPadding * 1.5, marginHorizontal: Sizes.fixPadding * 3 }}> Time of Birth</Text>
          <Text style={{ color: 'black', top: Sizes.fixPadding * 1.5, marginHorizontal: Sizes.fixPadding * 4.7 }}> Address</Text>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: Sizes.fixPadding * 2,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => show_time()}
            style={{
              ...styles.dropdown,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ ...Fonts.gray14RobotoRegular }}>
              {time == null ? 'Birth Time' : moment(time).format('hh:mm A')}{' '}
            </Text>
            <Ionicons name="chevron-down" color={Colors.black + '90'} size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('locationSearch')}
            style={{
              ...styles.dropdown,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={{ ...Fonts.gray14RobotoRegular, flex: 1 }}>
              {selectedLocation == null
                ? 'Birth Place'
                : selectedLocation?.address}
            </Text>
            {/* <Ionicons name="chevron-down" color={Colors.black + '90'} size={16} /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function GenderBirthInfo() {
    const renderItem = (item, selected) => {
      return (
        <View
          style={{
            padding: Sizes.fixPadding,
            borderBottomWidth: item._index + 1 != 3 ? 1 : 0,
            borderColor: Colors.gray,
            backgroundColor: Colors.white,
          }}>
          <Text
            style={
              selected
                ? { ...Fonts.primaryLight15RobotoLight, textAlign: 'center' }
                : { ...Fonts.gray14RobotoRegular, textAlign: 'center' }
            }>
            {item.label}
          </Text>
        </View>
      );
    };

    const renderHeader = date => {
      return (
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                ...Fonts.black16RobotoMedium,
                marginRight: Sizes.fixPadding * 0.5,
              }}>
              {moment(date.timestamp).format('MMMM')}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              color={Colors.black}
              size={18}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: Sizes.fixPadding * 1.5,
            }}>
            <Text
              style={{
                ...Fonts.gray16RobotoMedium,
                marginRight: Sizes.fixPadding * 0.5,
              }}>
              {moment(date.timestamp).format('YYYY')}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              color={Colors.gray}
              size={18}
            />
          </TouchableOpacity>
        </View>
      );
    };

    const renderArrow = item => {
      return (
        <View
          style={{
            width: 30,
            height: 30,
            borderWidth: 1,
            borderRadius: Sizes.fixPadding * 0.4,
            borderColor: Colors.gray,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item == 'left' ? (
            <MaterialCommunityIcons
              name="arrow-left-thin"
              color={Colors.black + '99'}
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-right-thin"
              color={Colors.black + '99'}
              size={20}
            />
          )}
        </View>
      );
    };

    const onChange = gender => {
      setGender(gender.value);
    };

    const get_current_data = date => {
      let currentDate = date;
      let previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);
      return previousDate;
    };

    const onSetDate = (event, date) => {
      if (event.type == 'set') {
        updateState({ birthDate: date });
      }
    };

    const show_date = () => {
      DateTimePickerAndroid.open({
        value: birthDate == null ? new Date() : birthDate,
        maximumDate: new Date(),
        minimumDate: new Date(1900, 1, 1),
        mode: 'date',
        display: 'calendar',
        onChange: onSetDate,
      });
    };

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'black', marginHorizontal: Sizes.fixPadding * 3, marginBottom: Sizes.fixPadding * 0.5, }}>Gender</Text>
          <Text style={{ color: 'black', marginHorizontal: Sizes.fixPadding * 8.7, marginBottom: Sizes.fixPadding * 0.5, }}>Date Of Birth</Text>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: Sizes.fixPadding * 2,
          }}>
          <Dropdown
            style={[
              styles.dropdown,
              genderFocus && { borderColor: Colors.primaryLight },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            containerStyle={styles.dropdownContainer}
            iconStyle={styles.iconStyle}
            data={genderData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!genderFocus ? 'Gender' : '...'}
            value={gender}
            onFocus={() => updateState({ genderFocus: true })}
            onBlur={() => updateState({ genderFocus: false })}
            onChange={onChange}
            renderItem={renderItem}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => show_date()}
            style={{
              ...styles.dropdown,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ ...Fonts.gray14RobotoRegular }}>
              {' '}
              {birthDate == null
                ? 'Birth Date'
                : moment(birthDate).format('Do MMM YYYY')}
            </Text>
            <Ionicons
              name="chevron-down"
              color={Colors.black + '90'}
              size={16}
            />
          </TouchableOpacity>
        </View>
        {calenderVisible && (
          <Calendar
            maxDate={get_current_data(new Date()).toString()}
            enableSwipeMonths
            markingType="custom"
            allowSelectionOutOfRange={false}
            onDayPress={day => {
              updateState({ birthDate: day.dateString, calenderVisible: false });
            }}
            markedDates={{
              [birthDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
                customStyles: {
                  container: {
                    borderRadius: 5,
                  },
                },
              },
            }}
            renderHeader={renderHeader}
            renderArrow={renderArrow}
            // dayComponent={dayComponent}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: Colors.primaryDark,
              selectedDayTextColor: '#ffffff',
              todayTextColor: Colors.primaryDark,
              dayTextColor: '#2d4150',
              textDisabledColor: Colors.grayLight,
            }}
            style={{
              borderWidth: 2,
              marginHorizontal: Sizes.fixPadding * 2,
              marginTop: Sizes.fixPadding,
              borderColor: Colors.primaryDark,
              borderRadius: Sizes.fixPadding,
            }}
          />
        )}
      </View>
    );
  }

  function phoneInput() {
    return (
      <Input
        disabled
        // value={route.params.phone_number}
        placeholder="Enter Mobile No."
        keyboardType="number-pad"
        maxLength={10}
        inputContainerStyle={styles.inputContainer}
        containerStyle={{ height: 60 }}
        inputStyle={{ ...Fonts.black16RobotoRegular }}
        leftIcon={
          <View style={styles.flagContainer}>
            <CountryPicker
              // disable
              countryCode={callingCode}
              containerStyle={styles.pickerStyle}
              pickerTitleStyle={styles.pickerTitleStyle}
              countryFlagStyle={{
                borderRadius: Sizes.fixPadding * 0.5,
                width: 30,
                height: 20,
                resizeMode: 'contain',
              }}
              dropDownImage={null}
              selectedCountryTextStyle={{
                ...Fonts.gray14RobotoRegular,
                marginLeft: Sizes.fixPadding,
              }}
              dropDownImageStyle={{ width: 0 }}
              countryNameTextStyle={{ ...Fonts.gray14RobotoRegular }}
              withCallingCode={false}
              hideCountryCode={false}
              withEmoji={true}
              onSelect={text => {
                console.log(text);
                // updateState({callingCode: text.callingCode, cca2: text.cca2})
              }}
            />
          </View>
        }
      />
    );
  }

  function emailInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2, height: 45 }}>
        <Input
          placeholder="Email address"
          placeholderTextColor={Colors.grayDark}
          keyboardType="email-address"
          onChangeText={text => updateState({ email: text })}
          containerStyle={{ flex: 0.45, padding: 0 }}
          inputContainerStyle={{ height: 30, borderBottomColor: Colors.gray }}
          inputStyle={{ ...Fonts.black16RobotoRegular }}
        />
      </View>
    );
  }

  function firstNameLastNameInfo() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2,
          justifyContent: 'space-between',
          marginTop: Sizes.fixPadding,
          height: 40,
        }}>
        <Input
          placeholder="First Name"
          placeholderTextColor={Colors.grayDark}
          onChangeText={text => updateState({ firstName: text })}
          containerStyle={{ flex: 0.45, padding: 0 }}
          inputContainerStyle={{ height: 30, borderBottomColor: Colors.gray }}
          inputStyle={{ ...Fonts.black16RobotoRegular }}
        />
        <Input
          placeholder="Last Name (optional)"
          placeholderTextColor={Colors.grayDark}
          onChangeText={text => updateState({ lastName: text })}
          containerStyle={{ flex: 0.45, borderBottomColor: Colors.primaryDark }}
          inputContainerStyle={{ height: 30, borderBottomColor: Colors.gray }}
          inputStyle={{ ...Fonts.black16RobotoRegular }}
        />
      </View>
    );
  }

  function profileImageInfo() {
    return (
      <TouchableOpacity
        onPress={() => updateState({ bottomSheetVisible: true })}
        activeOpacity={0.8}
        style={styles.imageContainer}>
        <Image
          source={
            profileImage != null
              ? { uri: profileImage }
              : require('../../assets/images/users/user1.jpg')
          }
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    );
  }

  function gapInsert() {
    return <View style={{ marginBottom: -height * 0.8 }} />;
  }

  function header() {
    return (
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        locations={[0.8, 1]}
        style={{
          padding: Sizes.fixPadding,
          borderRadius: 1000,
          width: '200%',
          alignSelf: 'center',
          height: height,
          top: -height * 0.7,
        }}>
        <View style={{ width: '50%', alignSelf: 'center', top: height * 0.7 }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: Sizes.fixPadding * 0.5,
                alignSelf: 'flex-start',
              }}>
              <AntDesign
                name="leftcircleo"
                color={Colors.white}
                size={Sizes.fixPadding * 2.2}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...Fonts.white18RobotMedium,
              textAlign: 'center',
              marginVertical: Sizes.fixPadding * 2,
            }}>
            Register your Profile
          </Text>
        </View>
      </LinearGradient>
    );
  }

};

const mapStateToProps = state => ({
  selectedLocation: state.user.selectedLocation,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Register);


const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.3,
    height: width * 0.3,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 1000,
    borderWidth: 4,
    overflow: 'hidden',
    borderColor: Colors.white,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    marginBottom: Sizes.fixPadding,
    shadowColor: Colors.blackLight,
  },
  inputContainer: {
    marginHorizontal: Sizes.fixPadding * 2,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    borderRadius: Sizes.fixPadding * 2,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: 0,
    height: 45,
  },
  dropdown: {
    flex: 0.45,
    height: 35,
    borderColor: Colors.gray,
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding * 1.5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    borderRadius: Sizes.fixPadding,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.gray,
    width: '90%',
    alignSelf: 'flex-end',
    marginTop: Sizes.fixPadding * 0.5,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    ...Fonts.gray14RobotoRegular,
  },
  selectedTextStyle: {
    ...Fonts.gray14RobotoRegular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
  },
  timeOption: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 20,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 20,
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
