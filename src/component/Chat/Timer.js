import {View, Text, StyleSheet, TouchableOpacity, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import database from '@react-native-firebase/database';
import {Colors, Fonts, Sizes} from '../../assets/style';

const Timer = ({
  deduct_wallet,
  providerData,
  userData,
  end_chat,
  updateState,
}) => {
  const [minutes, setMinutes] = useState(30);
  const [isChatStart, setIsChatStart] = useState(false);
  const [wallet, setWallet] = useState(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  let interValId;
  
  useEffect(() => {
    database()
      .ref(`CurrentRequest/${providerData?.id}`)
      .on('value', snapshot => {
        setWallet(parseInt(snapshot.val()?.wallet));
      });
    database()
      .ref(`CurrentRequest/${providerData?.id}`)
      .once('value', snapshot => {
        setMinutes(parseInt(snapshot.val()?.minutes));
      });
    database()
      .ref(`CustomerCurrentRequest/${userData?.id}`)
      .on('value', snapshot => {
        if (snapshot.val()?.status == 'active') {
          database()
          .ref(`CurrentRequest/${providerData?.id}`)
          .once('value', snapshot => {
            updateState({
              startTime: snapshot.val()?.date,
              inVoiceId: snapshot.val()?.invoice_id
            })
          });
          setIsChatStart(true);
        } else {
          setIsChatStart(false);
          clearInterval(interValId);
        }
      });
  }, [wallet, appStateVisible]);

  useEffect(() => {
    if (isChatStart) {
      interValId = setInterval(() => {
        setMinutes(prevTime => {
          database()
            .ref(`CurrentRequest/${providerData?.id}`)
            .update({
              minutes: prevTime - 1,
            });
          if (prevTime - 1 <= 0) {
            clearInterval(interValId);
            deduct_wallet();
          }
          if (prevTime - 1 == 120) {
            database()
              .ref(`CustomerCurrentRequest/${userData?.id}`)
              .update({
                status: 'active', //hold/active
              })
              .then(() => {
                updateState({balanceAlert: true});
              })
              .catch(err => {
                console.log(err);
              });
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interValId);
    }
    return () => {
      clearInterval(interValId);
    };
  }, [isChatStart]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
      database().ref(`CustomerCurrentRequest/${userData?.id}`).off();
    };
  }, []);

  const formatTime = leftTime => {
    const seconds = parseFloat(leftTime).toFixed(0)
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
  
    // Add leading zeros if needed
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    remainingSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <View
      style={[
        styles.row,
        {
          justifyContent: 'space-evenly',
          marginVertical: Sizes.fixPadding * 2,
          backgroundColor: 'transparent',
        },
      ]}>
      <View
        style={{
          backgroundColor: Colors.primaryLight,
          width: '30%',
          paddingVertical: Sizes.fixPadding * 0.5,
          borderRadius: 1000,
        }}>
        <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
          {formatTime(minutes)}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => end_chat()}
        style={{
          backgroundColor: Colors.primaryLight,
          width: '30%',
          paddingVertical: Sizes.fixPadding * 0.5,
          borderRadius: 1000,
        }}>
        <Text style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
          End Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;

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
    shadowColor: Colors.blackLight
  },
});
