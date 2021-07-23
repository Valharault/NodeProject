import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

const data = [
    {id: 1, name: "forks", unitPrice: 1, quantity: 2},
    {id: 2, name: "knifes", unitPrice: 2, quantity: 2},
];

export const ListContext = createContext();

export default function ListProvider({children}) {
    const [list, setList] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setList(data);
        setReady(true);
    }, []);

    const deleteElement = useCallback(
        (item) => {
            setList(list.filter((_item) => _item.id !== item.id));
        },
        [list]
    );

    const editElement = useCallback(
        (values) => {
            setList(list.map((it) => (it.id === values.id ? values : it)));
        },
        [list]
    );

    const addElement = useCallback(
        (values) => {
            setList([...list, {id: Date.now(), ...values}]);
        },
        [list]
    );

    const getItem = useCallback(
        (id) => {
            return list.find((it) => it.id === id);
        },
        [list]
    );

    const totalPrice = useMemo(
        () => list.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
        [list]
    );

    return (
        <ListContext.Provider
            value={{
                list,
                deleteElement,
                editElement,
                addElement,
                totalPrice,
                getItem,
                isReady: ready,
            }}
        >
            {children}
        </ListContext.Provider>
    );
}
