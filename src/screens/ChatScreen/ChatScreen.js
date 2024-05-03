import { Colors, Sizes } from '../../assets/style'
import { KeyboardAvoidingView } from 'react-native'
import { getSocket } from '../../context/socket'
import { NEW_MESSAGE } from '../../config/constants'
import { GiftedChat } from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../component/MyStatusBar'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useGetOldChat, useSocketEvents } from '../../hooks/chat'
import { convertToNewFormat } from '../../utils/function'
import { useAuth } from '../../context/AuthContext'

const ChatScreen = ({ navigation, route }) => {
    const {user} = useAuth()
    // console.log(route.params.chatId, "route.params.chatId",);
    const chatId = route.params.chatId
    const members = route.params.members

    const [page, setPage] = useState(1)
    const { oldChat, fetchOldMessages } = useGetOldChat(chatId, page)

    const [isLoading, setIsLoading] = useState([]);
    const [messages, setMessages] = useState([])

    // console.log(oldChat.messages, "oldChat")

    const socket = getSocket()
    // console.log(oldChat, "oldChat oldChat oldChat oldChat")
    console.log(socket.connected, socket.id);

    const onSend = useCallback((messages = []) => {
        if (messages.length > 0) {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages),
            )
            let message = messages[0].text
            socket.emit(NEW_MESSAGE, { chatId, members, message })
        }
    }, [])

    useEffect(() => {
        if (oldChat?.messages) {
            const oldMessages =convertToNewFormat(oldChat?.messages)
            setMessages(oldMessages.reverse())
        }
    }, [oldChat])

    // const newMessagesHandler = useCallback((data) => {
    //     // console.log(data.message)
    // }, [])

    // const eventHandlers = { [NEW_MESSAGE]: newMessagesHandler }
    // useSocketEvents(socket, eventHandlers)

    // useEffect(() => {
    // setMessages(oldMessages)
    // }, [])

    useEffect(() => {
        fetchOldMessages(chatId, page)
    }, [chatId])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryLight }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            {header()}

            <KeyboardAvoidingView style={styles.container}>
                <ImageBackground source={require('../../assets/images/chat_background.png')}
                    style={{ flex: 1, width: '100%', height: '100%' }}>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: user?.user?.id,
                        }}
                    />
                </ImageBackground>
            </KeyboardAvoidingView>
        </View>
    )
}

function header() {
    return (
        <View
            style={{
                padding: Sizes.fixPadding * 1.5,
                ...styles.row,
                justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                onPress={() => end_chat()}
                style={{
                    alignSelf: 'flex-start',
                    flex: 0,
                }}>
                <AntDesign
                    name="leftcircleo"
                    color={Colors.white}
                    size={Sizes.fixPadding * 2.2}
                />
            </TouchableOpacity>
            <Text
                style={{
                    textAlign: 'center',
                    flex: 0.6,
                }}>
                {/* {astroData?.owner_name}  */}
                Durgesh
            </Text>
            <TouchableOpacity
                disabled
                activeOpacity={0.8}
                onPress={() => on_share()}
                style={{ flex: 0 }}>
            </TouchableOpacity>
        </View>
    );
}


export default ChatScreen

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