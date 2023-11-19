import { useLoaderData } from "react-router-dom"
import Container from "../../components/Shared/Container"
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import RoomInfo from "./RoomInfo";
import RoomsReservation from "./RoomsReservation";

const RoomDetails = () => {
    const room = useLoaderData();
    return (
        <Container>
            <Helmet>
                <title>{room?.title}</title>
            </Helmet>

            <div className="max-w-screen-lg mx-auto">
                <Header room={room} />
                <div className="grid md:grid-cols-7 py-10 pt-16 gap-4">
                    <RoomInfo roomData={room} />
                    <div className="col-span-3 order-first md:order-last">
                        <RoomsReservation room={room} />
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default RoomDetails