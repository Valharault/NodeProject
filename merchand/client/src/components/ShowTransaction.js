import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";

export default function ShowTransaction() {
    const { id } = useParams();
    const { getItem, isReady } = useContext(ListContext);

    const item = useMemo(() => getItem(parseInt(id)), [id, isReady]);
    console.log(item);
    return (
        <p>
            {!isReady && "Loading ...."}
            {isReady && `${id} ${item?.name}`}
        </p>
    );
}
