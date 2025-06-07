import { useState } from "react";
import { send } from "../../utils/connections";
import type { ClientMessagePayload } from "../../utils/types";
import { useSocketListener } from "../../hooks/webSocketListener";
import { setUserName } from "../../utils/connections";

function NameApp() {
    const [ownUserName, setToSendUserName] = useState('');


    const handleSend = async () => {
        if (!ownUserName.trim()) return;

        const payload: ClientMessagePayload = {
            action: 'setuser',
            data: { message_content: ownUserName, replying_to: 0 }
        };

        await send(payload);
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

    return (<div>
        <input
            value={ownUserName}
            onChange={(e) => setToSendUserName(e.target.value)}
            onKeyDown={handleOnKey}
            placeholder={"Escribe tu mensaje..."}
        />
        <button onClick={handleSend}>Set username</button>
    </div>)
}

export default NameApp;