import { Fragment, useEffect, useState } from "react";
import Box from "../../component/box";
import PostContent from "../../component/post-content";
import Column from "../../component/column";
import PostCreate from "../post-create";
import { Alert, LOAD_STATUS, Skeleton } from "../../component/load";
import { getDate } from "../../util/getDate";

import "./index.css";

export default function PostItem({ id, username, text, date }) {
    const [data, setData] = useState({
        id, username, text, date, reply: null
    })

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState("")

    const getData = async () => {
        setStatus(LOAD_STATUS.PROGRESS)
        try {
            const res = await fetch(`http://localhost:4000/post-item?id=${data.id}`)
        
            const resData = await res.json()
            
            if (res.ok) {
                setData(convertData(resData));
                setStatus(LOAD_STATUS.SUCCESS);
            } else {
                setMessage(resData.message);
                setStatus(LOAD_STATUS.ERROR);
            }
        } catch (error) {
            setMessage(error.message);
            setStatus(LOAD_STATUS.ERROR);
        }
    }

    const convertData = ({ post }) => ({
        id: post.id,
        username: post.username,
        text: post.text,
        date: getDate(post.date),

        reply: post.reply.reverse().map(({ id, username, text, date }) => ({
            id,
            username,
            text,
            date: getDate(date),
        })),

        isEmpty: post.reply.length === 0,
    })

    const [isOpen, setOpen] = useState(false)

    const handleOpen = async () => {
        setOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen === true) {
            // alert(isOpen)
            getData()
        }
    }, [isOpen])

    return (
        <Box style={{ padding: "0" }}>
            <div
                style={{
                    padding: "20px",
                    cursor: "pointer",
                }}
                onClick={handleOpen}
                >
                <PostContent
                    username={data.username}
                    date={data.date}
                    text={data.text}
                >
                </PostContent>
            </div>

            {isOpen && (
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <Column>
                        <Box className="post-item__inside-box">
                        <PostCreate
                            placeholder='Post your reply!'
                            button='Reply'
                            id={data.id}
                            onCreate={getData}
                        />
                        </Box>

                        {status === LOAD_STATUS.PROGRESS && (
                            <>
                                <Box>
                                    <Skeleton />
                                </Box>
                                <Box>
                                    <Skeleton />
                                </Box>
                            </>
                        )}

                        {status === LOAD_STATUS.ERROR && (
                            <Alert status={status} message={message} />
                        )}

                        {status === LOAD_STATUS.SUCCESS &&
                            data.isEmpty === false &&
                            data.reply.map((item) => (
                                <Fragment key={item.id}>
                                <Box>
                                    <PostContent {...item} />
                                </Box>
                                </Fragment>
                            ))}
                    </Column>
                </div>
            )}
        </Box>
    );
}
