import Notifications from './notifications';
import Searchbar from './searchbar';
import UserProfile from './userProfile';
import user from 'media/builderIcons/user.svg';

// Sample user details
const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: user,
};
// Header Component 
const UserHeader = () => {
    return (
        <div className="flex items-center justify-between bg-white py-4 px-5 border-b border-gray-300 shadow-sm sticky top-0 z-40">
            {/* Left - Dashboard title */}
            <div className="text-2xl font-semibold">{`WELCOME! ${userDetails.name}`}</div>

            {/* Right - Search + Theme Toggle + Notifications + User */}
            <div className="flex items-center gap-4">

                {/* Search Bar */}
                <Searchbar />

                {/* Notification */}
                <Notifications />

                {/* Profile */}
                <UserProfile userDetails={userDetails} />
                
            </div>
        </div>
    );
};

export default UserHeader;
