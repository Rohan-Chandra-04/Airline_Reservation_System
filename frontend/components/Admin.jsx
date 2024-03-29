
import AddAirport from "./AddAirport"
import ViewBookings from "./ViewBookings"

export default function Admin() {

    return(
        <>
            <div className="text-6xl text-center text-white bg-purple-700 rounded-md">
                <h1 className="pt-4 pb-4">Admin Page</h1>
            </div>
            
            <AddAirport />

            <ViewBookings />
        </>
    )
}