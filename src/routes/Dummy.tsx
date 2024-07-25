import { useLocation, useParams } from 'react-router-dom';

function Dummy() {
    const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const id = searchParams.get('q');

    const { id } = useParams();
    return (
        <div>
            <h1>Dummy Component</h1>
            <p>Recipe ID: {id}</p>
        </div>
    );
}

export default Dummy;
