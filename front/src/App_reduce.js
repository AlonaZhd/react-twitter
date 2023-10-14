import React, { useReducer } from "react";
import Page from "./component/page";
import Column from "./component/column";
import Box from "./component/box";
// import Container from "./container/post-list";

const LIST_ACTION_TYPE = {
    ADD: "add",
    DELETE: "delete",
    SELECT: "select",
    REVERSE: "reverse",
};

function listReducer(state, action) {
    switch (action.type) {
        case LIST_ACTION_TYPE.ADD:
            const id = new Date().getTime();
            const newItem = { value: action.payload, id };

            return {
                ...state,
                items: [...state.items, newItem],
            };

        case LIST_ACTION_TYPE.DELETE:
            const newItems = state.items.filter(
                (item) => item.id !== action.payload
            );

            return {
                ...state,
                items: newItems,
            };

        case LIST_ACTION_TYPE.SELECT:
            return {
                ...state,
                selectedId:
                    action.payload === state.selectedId ? null : action.payload,
            };

        case LIST_ACTION_TYPE.REVERSE:
            return {
                ...state,
                items: state.items.reverse(),
            };

        default:
            return { ...state };
    }
}

const initState = { items: [] };

function App() {
    const [state, dispatch] = useReducer(listReducer, initState);

    const handleAddItem = (e) => {
        const { value } = e.target;

        if (value.trim() === "") return null;

        dispatch({ type: LIST_ACTION_TYPE.ADD, payload: value });

        e.target.value = "";
    };

    const handleRemoveItem = (id) =>
        dispatch({ type: LIST_ACTION_TYPE.DELETE, payload: id });

    const handleSelectItem = (id) =>
        dispatch({ type: LIST_ACTION_TYPE.SELECT, payload: id });

    const handleReverseItems = () =>
        dispatch({ type: LIST_ACTION_TYPE.REVERSE });

    return (
        <Page>
            <Column>
                <Box>
                    <Column>
                        <h1>Список елементів:</h1>
                        <ul>
                            <Column>
                                {state.items.map(({ value, id }) => (
                                    <li
                                        onClick={() => handleSelectItem(id)}
                                        key={id}
                                    >
                                        <Box
                                            style={{
                                                borderColor:
                                                    state.selectedId === id
                                                        ? "blue"
                                                        : "#e6e6e6",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Column>
                                                <span>{value}</span>
                                                <Box>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveItem(
                                                                id
                                                            );
                                                        }}
                                                    >
                                                        Видалити
                                                    </button>
                                                </Box>
                                            </Column>
                                        </Box>
                                    </li>
                                ))}
                            </Column>
                        </ul>
                    </Column>
                </Box>
                <Box>
                    <input
                        onBlur={handleAddItem}
                        type="text"
                        placeholder="Введіть новий елемент"
                    ></input>
                </Box>
                <Box>
                    <button onClick={handleReverseItems}>
                        Змінити порядок
                    </button>
                </Box>
            </Column>
        </Page>
    );
}

export default App;
