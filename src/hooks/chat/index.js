import { useEffect, useState } from "react"
import { ChatServices } from "../../services/chat";

export const useSendRequest = () => {
    const [request, setRequest] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const sendRequest = (formData) => {
        ChatServices.sendRequest()
            .then((res) => {
                console.log(res)
                setRequest(res.data)
            })
            .catch((err) => {
                console.log(err, "error")
            })
            .finally(() => {
                setIsLoading(true)
            })
    }

    return {
        request,
        isLoading,
        sendRequest,
        setIsLoading
    }
}

export const useGetGroupChatDetails = () => {
    const [chat, setChat] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChat = (otherMemberId) => {
        ChatServices.getChatId(otherMemberId)
            .then((res) => {
                setChat(res.groups)
            })
            .catch((err) => {
                console.log(err, "error")
            })
            .finally(() => {
                setIsLoading(true)
            })
    }

    return {
        chat,
        isLoading,
        handleChat,
        setIsLoading
    }
}

export const useSocketEvents = (socket, handlers) => {

    useEffect(() => {
        Object.entries(handlers).forEach(([event, handlers]) => {
            socket.on(event, handlers)
        })

        return () => {
            Object.entries(handlers).forEach(([event, handlers]) => {
                socket.off(event, handlers)
            })
        }

    }, [socket, handlers])
}


export const useGetOldChat = () => {
    const [oldChat, setOldChat] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchOldMessages = (chatId, page) => {
        ChatServices.getOldMessages(chatId, page)
            .then((res) => {
                setOldChat(res)
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(true)
            })
    }

    return { oldChat, isLoading, setIsLoading , fetchOldMessages}
}