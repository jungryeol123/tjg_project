import { useParams } from "react-router-dom";

export function ProductDetail() {
    const {pid} = useParams();

    return(
        <div>
            {pid}
        </div>

    );
}