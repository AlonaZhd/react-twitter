import { Fragment, useState } from "react";
import Box from "../../component/box";
import Column from "../../component/column";
import Title from "../../component/title";
import PostCreate from "../post-create";
import { Alert, LOAD_STATUS, Skeleton } from "../../component/load";
import { getDate } from "../../util/getDate";
import PostItem from "../post-item";

import "./index.css";


function Container() {
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState("")
    const [data, setData] = useState(null)

    const getData = async () => {
        setStatus(LOAD_STATUS.PROGRESS)

        try {
            const res = await fetch("http://localhost:4000/post-list")

            const data = await res.json()

            if (res.ok) {
                setData(convertData(data))
                setStatus(LOAD_STATUS.SUCCESS)
            } else {
                setMessage(data.message)
                setStatus(LOAD_STATUS.ERROR)
            }
        } catch (error) {
            setMessage(data.message)
            setStatus(LOAD_STATUS.ERROR) 
        }
    }

    const convertData = (raw) => ({
        list: raw.list.reverse().map(({ id, username, text, date }) => ({
            id,
            username,
            text,
            date: getDate(date)
        })),

        isEmpty: raw.list.length === 0
    })

    if (status === null) {
        getData()
    }

    return (
        <Column>
            <Box>
                <Column>
                    <Title>Home</Title>
                    <PostCreate
                        onCreate={getData}
                        placeholder="what is happening?!"
                        button="Post"
                    ></PostCreate>
                </Column>
            </Box>
            {status === LOAD_STATUS.PROGRESS && (
                <>
                    <Box>
                        <Skeleton></Skeleton>
                    </Box>
                    <Box>
                        <Skeleton></Skeleton>
                    </Box>
                </>
            )}

            {status === LOAD_STATUS.ERROR && (
                <Alert status={status} message={message}></Alert>
            )}

            {status === LOAD_STATUS.SUCCESS && (
                <Fragment>
                    {data.isEmpty ? (
                        <Alert message="Список постів пустий"></Alert>
                    ) : (
                        data.list.map((item) => (
                            <Fragment key={item.id}>
                                <PostItem {...item}></PostItem>
                            </Fragment>
                        ))
                    )}
                </Fragment>
            )}
        </Column>
    );
}

export default Container;