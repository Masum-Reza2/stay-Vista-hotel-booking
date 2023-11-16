import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const useGlobal = () => {
    const all = useContext(AuthContext);
    return all;
}

export default useGlobal