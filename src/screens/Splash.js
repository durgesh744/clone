import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import MyStatusBar from '../component/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../assets/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const providerData = await AsyncStorage.getItem('user');
        const data = JSON.parse(providerData);
        if (data) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('login');
        }
      } catch (error) {
        console.error('Error reading user data:', error);
        // Handle error or navigate to a default screen
        navigation.navigate('login'); // Navigating to login in case of error
      }
    };

    const timeout = setTimeout(() => {
      checkUser();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/gifs/splash.gif')}
          // style={{ width: SCREEN_WIDTH * 0.65, height: SCREEN_WIDTH * 0.65 }}
        />
      </LinearGradient>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapDispatchToProps, null)(Splash);

