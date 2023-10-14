import { Fragment, useEffect, useReducer } from "react";
import Box from "../../component/box";
import Column from "../../component/column";
import Title from "../../component/title";
import PostCreate from "../post-create";
import { Alert, LOAD_STATUS, Skeleton } from "../../component/load";
import { getDate } from "../../util/getDate";
import PostItem from "../post-item";


import "./index.css";
import { REQUEST_ACTION_TYPE, requestInitialState, requestReducer } from "../../util/request";


function Container({ children }) {
    const [state, dispatch] = useReducer(requestReducer, requestInitialState)

    const getData = async () => {
        dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS })

        try {
            const res = await fetch("http://localhost:4000/post-list")

            const data = await res.json()

            if (res.ok) {
                dispatch({
                    type: REQUEST_ACTION_TYPE.SUCCESS,
                    payload: convertData(data),
                })
            } else {
                dispatch({
                    type: REQUEST_ACTION_TYPE.ERROR,
                    payload: data.message,
                })
            }
        } catch (error) {
            dispatch({
                type: REQUEST_ACTION_TYPE.ERROR,
                payload: error.message,
            })
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

    useEffect(() => {
        alert('render')
        getData()

        const intervalId = setInterval(() => getData, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <Column>
            {children}
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
            {state.status === LOAD_STATUS.PROGRESS && (
                <>
                    <Box>
                        <Skeleton></Skeleton>
                    </Box>
                    <Box>
                        <Skeleton></Skeleton>
                    </Box>
                </>
            )}

            {state.status === LOAD_STATUS.ERROR && (
                <Alert status={state.status} message={state.message}></Alert>
            )}

            {state.status === LOAD_STATUS.SUCCESS && (
                <Fragment>
                    {state.data.isEmpty ? (
                        <Alert message="Список постів пустий"></Alert>
                    ) : (
                        state.data.list.map((item) => (
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