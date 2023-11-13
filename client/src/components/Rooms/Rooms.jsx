import { useEffect, useState } from "react"
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import Loader from "../Shared/Loader";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [categoryData, setCategoryData] = useState(rooms);
    const [loading, setLoading] = useState(false);

    const [params, setParams] = useSearchParams();
    const selected = params.get('category');


    useEffect(() => {
        setLoading(true)
        fetch('./rooms.json')
            .then(res => res.json())
            .then(data => {
                setRooms(data)
                setCategoryData(data)
                setLoading(false)
                if (selected) {
                    setLoading(true)
                    const selectedData = rooms?.filter(room => room?.category === selected)
                    setCategoryData(selectedData);
                    setLoading(false)
                }
            })
    }, [selected])

    if (loading) return <Loader />

    return (
        <Container>
            {
                categoryData.length ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pt-12">
                        {categoryData?.map(room => <Card key={room._id} room={room} />)}
                    </div>
                    :
                    <div className="min-h-[50vh] flex flex-col items-center justify-center">
                        <Heading title={'No rooms available in this category'} subtitle={'Please select other categories'} center={true} />
                    </div>
            }

        </Container>

    )
}

export default Rooms