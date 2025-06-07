import { useState } from "react";
import { send } from "../../utils/connections";
import type { ClientMessagePayload } from "../../utils/types";
import { useSocketListener } from "../../hooks/webSocketListener";
import { setUserName } from "../../utils/connections";
import setuser from './setusername.module.css'

function NameApp() {
    const [ownUserName, setToSendUserName] = useState('');
    const [HasUsername, setHasUsername] = useState(false)


    const handleSend = async () => {
        if (!ownUserName.trim()) return;

        const payload: ClientMessagePayload = {
            action: 'setuser',
            data: { message_content: ownUserName, replying_to: 0 }
        };

        await send(payload);
        setHasUsername(true);
        console.log(HasUsername)
        setToSendUserName('');
    };

    const handleOnKey = (event: React.KeyboardEvent) => {
        console.log(event.type)

        if (event.key === 'Enter') {
            handleSend();
        }
    }

    useSocketListener((event) => {
        const { payload } = event;

        if (event.action == "set_username" && payload.user) {
            console.log("Username change for: ", payload.user);

            setUserName(parseInt(payload.user), payload.content);
        }
    })

    return (<div className={`${setuser.input_container} ${HasUsername ? setuser.not_active : ''}`}>
        <div className={`${setuser.form_container}`}>
            <input
                value={ownUserName}
                onChange={(e) => setToSendUserName(e.target.value)}
                onKeyDown={handleOnKey}
                placeholder={"Escribe tu mensaje..."}
                className={`${setuser.input}`}
            />
            <button onClick={handleSend}>
                
            </button>
        </div>
    </div>)
}

export default NameApp;