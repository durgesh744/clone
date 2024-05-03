export const convertToNewFormat = (data) => {
    return data.map(item => {
        return {
            _id: item._id,
            text: item.content,
            createdAt: new Date(item.createdAt),
            user: {
                _id: item.sender._id
            }
        };
    });
}