import { useState } from "react";
import Column from "../../component/column";
import FieldForm from "../../component/field-form";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";

import "./index.css";

function PostCreate({ onCreate, placeholder, button, id=null }) {
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState("")

    const handleSubmit = (value) => {
        return sendData({ value })
    }

    const sendData = async (dataToSend) => {
        setStatus(LOAD_STATUS.PROGRESS)

        try {
            const res = await fetch("http://localhost:4000/post-create", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: convertData(dataToSend)
            })

            const data = await res.json()

            if (res.ok) {
                setStatus(null)

                if (onCreate) onCreate()
            } else {
                setMessage(data.message)
                setStatus(LOAD_STATUS.ERROR)
            }
        } catch (error) {
            setMessage(error.message)
            setStatus(LOAD_STATUS.ERROR)
        }
    }

    const convertData = ({ value }) =>
        JSON.stringify({
            text: value,
            username: 'user',
            postId: id,
        })

    return (
        <Column>
            <FieldForm
               
                placeholder={placeholder}
                button={button}
                onSubmit={handleSubmit}
            >
                {status === LOAD_STATUS.ERROR && (
                    <Alert status={status} message={message}></Alert>
                )}
                
                {status === LOAD_STATUS.PROGRESS && <Loader></Loader>}
            </FieldForm>
        </Column>
    );
}

export default PostCreate;