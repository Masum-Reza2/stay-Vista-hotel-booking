import { useState } from "react"
import AddRoomForm from "../../../components/Form/AddRoomForm"
import useGlobal from "../../../hooks/useGlobal"
import uploadImage from "../../../hooks/uploadImage"
import useSecureAxios from "../../../hooks/useSecureAxios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const AddRoom = () => {
    const { user } = useGlobal();
    const secureAxios = useSecureAxios();
    const navigate = useNavigate()

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates[0].endDate;
        const from = dates[0].startDate;
        const price = form.price.value;
        const guests = form.total_guest.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const bedrooms = form.bedrooms.value;

        // image upload process
        let upimage = form.image.files[0]

        // from now i will create custom hooks js extensions only, it provides more benefits and can be use from anywhere from component or from any file 
        const image = await uploadImage(upimage)
        // image upload process

        const host = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        }

        const roomData = {
            location,
            category,
            title,
            to,
            from,
            price,
            guests,
            bathrooms,
            description,
            bedrooms,
            image,
            host,
        }

        try {
            const addRoomRes = await secureAxios.post(`/rooms`, roomData);
            if (addRoomRes?.data?.insertedId) {
                toast.success(`Room added successfully! `)
                navigate('/dashboard/myListings')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <div></div>
            <div>
                <AddRoomForm dates={dates} setDates={setDates} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default AddRoom