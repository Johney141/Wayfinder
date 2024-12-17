import { useNavigate } from 'react-router-dom'
import './Hit.css'
import { useSelector } from 'react-redux';

function Hit({ hit }) {
    const navigate = useNavigate();
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    console.log(hit)
    

    return (
        <div 
            className="hit-item article" 
            onClick={() => navigate(`/${orgId}/articles/${hit.objectID}`)}
        >
            <h3>{hit.title}</h3>
        </div>
    )
}

export default Hit