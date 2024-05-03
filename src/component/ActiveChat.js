import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native-paper';
import {Colors, Fonts, Sizes} from '../assets/style';
import {SCREEN_WIDTH} from '../config/Screen';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './Loader';
import { connect } from 'react-redux';

const ActiveChat = ({
  navigation,
  activeChatVisible,
  updateState,
  chatData,
  userData,
  startTime,
  inVoiceId,
  dispatch
}) => {

  const [isLoading, setIsLoading] = useState(false);

  const deduct_wallet = async () => {
  };

  const customer_profile = async () => {
  };

  const on_resume = async()=>{
  }

  return (
    <Modal
      visible={activeChatVisible}
    >
      <Loader visible={isLoading} />
      <View
        style={{
          backgroundColor: Colors.white,
          width: SCREEN_WIDTH * 0.8,
          alignSelf: 'center',
          padding: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding,
        }}>
        <Text
          style={{...Fonts.primaryLight18RobotoMedium, textAlign: 'center'}}>
          Alert!
        </Text>
        <Text
          style={{
            ...Fonts.black16RobotoRegular,
            textAlign: 'center',
            marginVertical: Sizes.fixPadding * 2,
          }}>
          You have an active chat
        </Text>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={deduct_wallet}
            style={{borderRadius: Sizes.fixPadding, overflow: 'hidden'}}>
            <LinearGradient
              colors={[Colors.blackLight, Colors.gray]}
              style={{
                width: SCREEN_WIDTH * 0.3,
                paddingVertical: Sizes.fixPadding * 0.6,
              }}>
              <Text style={{...Fonts.white14RobotoMedium, textAlign: 'center'}}>
                End
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={on_resume}
            style={{borderRadius: Sizes.fixPadding, overflow: 'hidden'}}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primaryDark]}
              style={{
                width: SCREEN_WIDTH * 0.3,
                paddingVertical: Sizes.fixPadding * 0.6,
              }}>
              <Text style={{...Fonts.white14RobotoMedium, textAlign: 'center'}}>
                Resume
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(null, mapDispatchToProps)(ActiveChat);
