import { useNavigate } from 'react-router-dom'
import './Hit.css'
import { useSelector } from 'react-redux';

function Hit({ hit, click }) {
    const navigate = useNavigate();
    const orgId = useSelector(state => state.sessionState.user.Organization.id);

    const handleItemClick = (event) => {
        event.preventDefault();  
    };

    

    return (
        <div 
            className="hit-item article" 
            onClick={() => {
                navigate(`/${orgId}/articles/${hit.objectID}`)
                click();
                
            }}
            onMouseDown={handleItemClick}
        >
            <h3>{hit.title}</h3>
        </div>
    )
}

export default Hit