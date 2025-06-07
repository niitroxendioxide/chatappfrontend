import userlist from './userlist.module.css'
import { useState } from "react";
import { useSocketListener } from "../../hooks/webSocketListener";
import { getUserName } from '../../utils/connections';
import profile_pic from '../../assets/default-profile-pic.jpg';

function UserList() {
    const [userList, setUserList] = useState<number[]>([]);

    useSocketListener((event) => {
        const payload = event.payload

        if (event.action == 'user_add' && payload.content) {
            console.log(event);

            setUserList((prevUsers) => [...prevUsers, parseInt(payload.content)]);

            // Optionally log the new messages array
            // console.log([...messages, event.payload]);
        }

        if (event.action == 'user_remove' && payload.content) {
            console.log(event);

            setUserList((prevUsers) => prevUsers.filter(user => user !== parseInt(payload.content)));

            // Optionally log the new messages array
            // console.log([...messages, event.payload]);
        }
    })

    return (
        <div className={`${userlist.mainlist}`}>
            <div className={`${userlist.title_container}`}>
                <h1 className={`${userlist.title}`}>Usuarios Conectados</h1>
            </div>
            <div className={`${userlist.list_container}`}>
                {userList.length === 0 ? (
                    <p>No hay usuarios</p>
                ) : (
                userList.map((user_id   ) => (
                    <div className={`${userlist.user_container}`} key={user_id}>
                        <div className={`${userlist.picture_container}`}>
                            <img src={profile_pic} alt="Placeholder for profile pic" className={`${userlist.profile_picture}`} />
                        </div>
                        <h3>{getUserName(user_id)}</h3>
                        <div className={`${userlist.connected_dot}`}></div>   
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default UserList;