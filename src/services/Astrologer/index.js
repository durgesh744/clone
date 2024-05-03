import fetcher from "../../helper/fetcher";

const getAstro = () => {
    return fetcher.get("/astrologer").then((res) => {
        return res.data
    })
}

export const AstrologerServices = {
    getAstro
}