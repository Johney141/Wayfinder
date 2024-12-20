import { useEffect, useState } from 'react';
import './OrgHome.css'
import { useDispatch, useSelector } from 'react-redux';
import { getRecentArticlesThunk } from '../../../store/articles';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Utilities/Loading/Loading';

function OrgHome () {
    const [isLoaded, setIsLoaded] = useState(false);
    const orgId = useSelector(state => state.sessionState.user.Organization.id);
    const recentArticles = useSelector(state => state.articleState.allArticles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getRecentArticles = async () => {
            await dispatch(getRecentArticlesThunk(orgId))
            setIsLoaded(true);
        }
        
        if(!isLoaded) {
            getRecentArticles();
        }
    }, [isLoaded, dispatch, orgId])
    
    if(!isLoaded) {
        return <Loading />
    }


    return (
        <div className="page-container">
            <h1>Recent Updates</h1>
            <div className='article-container'>
                {recentArticles.length ? (
                    recentArticles.map(article => (
                    <div 
                    className='article' 
                    key={article.id}
                    onClick={() => navigate(`/${orgId}/articles/${article.id}`)}>
                        <h3>{article.title}</h3>
                        {article.body.length >= 187 ? (<p>{article.body.slice(0, 187)}...</p>) :
                            (<p>{article.body}</p>)
                        }
                    </div>
                ))) 
                : (
                    <h3>No recent updates at this time</h3>
                )}
            </div>
        </div>
    )
}

export default OrgHome;
