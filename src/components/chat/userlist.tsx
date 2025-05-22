
import { useState } from "react";
import { useSocketListener } from "../../hooks/webSocketListener";

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
    })

    return (
        <div className="mainlist">
            <div className="userObj">
                {userList.length === 0 ? (
                    <p>No hay usuarios</p>
                ) : (
                userList.map((user_id   ) => (
                    <div
                        key={user_id}
                    >
                        <h3>Usuario: {user_id}</h3>   
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default UserList;