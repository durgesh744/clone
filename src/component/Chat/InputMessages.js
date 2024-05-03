import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Divider } from '@rneui/themed';
import React, { useState } from 'react';
import { Send } from 'react-native-gifted-chat';
import { Colors, Fonts, Sizes } from '../../../assets/style';

const InputMessages = ({
  onSend,
  customOnPress,
  sendButtonProps,
  sendProps,
}) => {
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: Colors.white,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        bottom: 10,
      }}>
      <View style={[styles.row]}>
        <Divider
          orientation="vertical"
          color={Colors.gray}
          style={{
            height: 1,
            marginHorizontal: Sizes.fixPadding * 0.5,
          }}
        />

        <TextInput
          value={message}
          placeholder="Enter message..."
          placeholderTextColor={Colors.gray}
          onChangeText={setMessage}
          style={{
            width: '60%',
            padding: Sizes.fixPadding * 0.5,
            ...Fonts.black14InterMedium,
            paddingBottom: Sizes.fixPadding * 1.5,
          }}
        />


        <Send
          containerStyle={{ justifyContent: 'center' }}
          {...sendProps}
          sendButtonProps={{
            ...sendButtonProps,
            onPress: () => {
              setMessage(''), customOnPress(message, onSend);
            },
          }}
          disabled={message.length == 0 || message.trim() === ''}
          onPress={() => {
            console.log("dklmkldl");
            onSend();
            setMessage('');
          }}
        >
          <View
            style={{
              paddingHorizontal: Sizes.fixPadding * 2,
              paddingVertical: Sizes.fixPadding * 0.7,
              borderRadius: 1000,
              backgroundColor: Colors.primaryLight,
            }}>
            <Text style={{color:"black"}}>Send</Text>
          </View>
        </Send>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputMessages;

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
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.blackLight,
  },
});
