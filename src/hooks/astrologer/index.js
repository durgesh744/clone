import { useEffect, useState } from "react"
import { AstrologerServices } from "../../services/Astrologer";

export const useGetAstrologers = () => {
    const [astro, setAstro] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [refetchCounter, setRefetchCounter] = useState(0);

    // Define a function to trigger a re-fetch
    const refetch = () => {
        // Increment the refetch counter to force a re-fetch
        setRefetchCounter((prevCounter) => prevCounter + 1);
    };

    useEffect(() => {
        AstrologerServices.getAstro()
            .then((res) => {
                setAstro(res)
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(true)
            })
    }, [refetchCounter])

    return { astro, isLoading, refetch, setIsLoading }
}