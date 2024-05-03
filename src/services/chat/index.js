import chatFetcher from "../../helper/chatFetcher"

const sendRequest = (formData) => {
    return chatFetcher.put("/api/v1/user/sendrequest", formData).then((res) => {
        return res.data
    })
}
const getChatId = (otherMemberId) => {
    return chatFetcher.get(`/api/v1/chat/my/groups?otherMemberId=${otherMemberId}`).then((res) => {
        return res.data
    })
}
const getOldMessages = (chatId, page) => {
    return chatFetcher.get(`/api/v1/chat/message/${chatId}?page=${page}`).then((res) => {
        return res.data
    })
}

export const ChatServices = {
    sendRequest,
    getChatId,
    getOldMessages
}