import React, { useEffect, useState } from "react";
import axios from "axios";

const Whiteboard = () => {
    const APP_ID = 'eb3bd015272e4e45b503749f58ff00fe';
    const SDK_TOKEN = 'NETLESSSDK_YWs9V0tnY21PR0xPWUhXTUxQWSZub25jZT1lMGQ1ZTA1MC0zNWMwLTExZWUtYmRlZS03OTJjYTM3M2FjNDkmcm9sZT0wJnNpZz0yMDNmMDI1NGYwYWJhZmRiNmFhYmU0MGU3ZWIzNWRmZmY3MTMzMzQ2MjdiNjc0YzBlYTEzZjdhYTkwMGYzODVk';
    const [roomId, setRoomId] = useState('');
    const [whiteBoard, setWhiteBoard] = useState({});
    const [roomToken, setRoomToken] = useState('');
    useEffect(() => {
        import('white-web-sdk')
            .then((module) => {
                setWhiteBoard(module);
            });
        const createRoomHeaders = {
            'token': `${SDK_TOKEN}`,
            'Content-Type': 'application/json',
            'region': 'eu'
        }

        const setRoom = async () => {
            axios.post('https://api.netless.link/v5/rooms', JSON.stringify({
                'isRecord': false
            }),
                {
                    headers: createRoomHeaders,
                })
                .then((response) => {
                    setRoomId(response.data.uuid);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setRoom();
        const setRoomToken = async (roomId) => {
            await axios.post(`https://api.netless.link/v5/tokens/rooms/${roomId}`,
                JSON.stringify({ "lifespan": 3600000, "role": "admin" }),
                {
                    headers: {
                        "token": `${SDK_TOKEN}`,
                        "Content-Type": "application/json",
                        "region": "eu"
                    }
                })
                .then((response) => {
                    setRoomToken(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        setRoom(roomId);
    }, [SDK_TOKEN])
    return (
        <div>

        </div>
    )
}

export default Whiteboard;