import userlist from './userlist.module.css'
import { useState, useEffect } from "react";
import { useSocketListener } from "../../hooks/webSocketListener";
import profile_pic from '../../assets/default-profile-pic.jpg';
import { getUserName, setUserName } from '../../utils/connections';

// Create a global username map
function UserList() {
    const [userIds, setUserIds] = useState<number[]>([]);
    const [_, setUsernameVersion] = useState(0); // Force re-renders
    
    // Update global username map and force re-render
    const updateUsername = (userId: number, username: string) => {
        setUsernameVersion(v => v + 1); // Trigger re-render
    };

    useSocketListener((event) => {
        const payload = event.payload;

        if (event.action === 'user_add' && payload.content) {
            const userId = parseInt(payload.content);
            setUserIds(prev => [...prev, userId]);
        }

        if (event.action === 'user_remove' && payload.content) {
            const userId = parseInt(payload.content);
            setUserIds(prev => prev.filter(id => id !== userId));
        }

        if (event.action === "set_username" && payload.user && payload.content) {
            const userId = parseInt(payload.user);
            updateUsername(userId, payload.content);
            setUserName(userId, payload.content);
        }
    });

    return (
        <div className={`${userlist.mainlist}`}>
            <div className={`${userlist.title_container}`}>
                <h1 className={`${userlist.title}`}>Usuarios Conectados</h1>
            </div>
            <div className={`${userlist.list_container}`}>
                {userIds.length === 0 ? (
                    <p>No hay usuarios</p>
                ) : (
                    userIds.map(userId => (
                        <div className={`${userlist.user_container}`} key={userId}>
                            <div className={`${userlist.picture_container}`}>
                                <img 
                                    src={profile_pic} 
                                    alt="Placeholder for profile pic" 
                                    className={`${userlist.profile_picture}`} 
                                />
                            </div>
                            <h3>{getUserName(userId)}</h3>
                            <div className={`${userlist.connected_dot}`}></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default UserList;