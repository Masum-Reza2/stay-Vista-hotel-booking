import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/SIdebar"

const DashBoard = () => {
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="ml-64 py-4">
                <Outlet />
            </div>
        </div>
    )
}

export default DashBoard