/* eslint-disable react/prop-types */
// import { formatDistance } from "date-fns"
import { useState } from "react"
import Button from "../../components/Button/Button"
import Calender from "./Calender"
import { formatDistance } from "date-fns"


const RoomsReservation = ({ room }) => {

    const [value, setValue] = useState({
        startDate: new Date(room?.from),
        endDate: new Date(room?.to),
        key: 'selection',
    })

    const totalDays = parseFloat(formatDistance(new Date(room?.to), new Date(room?.from)).split(' ')[0])
    const totalPrice = totalDays * room?.price;


    return (
        <div className="border p-3 rounded-xl">
            <div className="pb-3">
                <p><span className="font-bold text-lg">${room?.price}</span> <span>night</span></p>
            </div>
            <hr />
            <div className="flex justify-center">
                <Calender value={value} />
            </div>
            <div className="space-y-4">
                <hr />
                <Button label={'Reserve'} />
                <hr />
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
        </div>
    )
}

export default RoomsReservation