import { useEffect, useState } from "react"
import useSecureAxios from "./useSecureAxios"
import useGlobal from "./useGlobal";

const useRole = () => {

    const secureAxios = useSecureAxios();
    const { user } = useGlobal();

    const [role, setRole] = useState('')
    useEffect(() => {
        secureAxios.get(`/roleCheck/${user?.email}`)
            .then(res => setRole(res.data))
    }, [user, secureAxios])
    return role;
}

export default useRole
