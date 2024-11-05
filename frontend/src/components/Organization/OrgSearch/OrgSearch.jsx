import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"
import { getSearchArticlesThunk } from "../../../store/articles";
import Loading from "../../Utilities/Loading/Loading";


function OrgSearch() {
    const [searchParams] = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const orgId = useSelector(state => state.sessionState.user.Organization.id)
    const articles = useSelector(state => state.articleState.allArticles)
    let search = searchParams.get('q');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getSearchArticles = async () => {
            await dispatch(getSearchArticlesThunk(orgId, search))
           
            setIsLoaded(true)
        }

        if (search) {
            setIsLoaded(false);  
            getSearchArticles();
        }

    }, [orgId, search, dispatch]);

    if(!isLoaded) {
        return <Loading />
    }


    if(!articles.length) {
        return (
            <div className="page-container">
                <h2>Search Results (No articles found)</h2>
            </div>
    )
    } 


    return (
        <div className="page-container">
            <h2>Search Results ({articles.length} found)</h2>
            <div className="article-container">
                {articles.map(article => (
                    <div 
                        className="article"
                        key={article.id}
                        onClick={() => navigate(`/${orgId}/articles/${article.id}`)}>
                        <h3>{article.title}</h3>
                        <p>{article.plainText.slice(0, 187)}...</p>
                    </div>
                ))}
           </div>
        </div>
    )
}

export default OrgSearch