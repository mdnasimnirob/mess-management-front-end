import { MdLogout } from "react-icons/md";


const Profile = () => {

    return (
        <div>
            <h1>this is profile</h1>
            <div className="fixed lg:right-10 right-3 lg:bottom-7 bottom-14 text-center ">
                <button className="flex items-center gap-2 border-2 bg-gray-200 px-2 py-1 rounded-md shadow-md">
                    <MdLogout className="text-red-600" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;