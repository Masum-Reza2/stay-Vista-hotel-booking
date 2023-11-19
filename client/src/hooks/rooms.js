import useSecureAxios from "./useSecureAxios"

export const getRooms = async () => {
    const { data } = useSecureAxios.get(`/rooms`)
    return data;
}