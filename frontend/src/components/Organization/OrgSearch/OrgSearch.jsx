import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { getSearchArticlesThunk } from "../../../store/articles";
import Loading from "../../Utilities/Loading/Loading";


function OrgSearch() {
    const [searchParams] = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const orgId = useSelector(state => state.sessionState.user.Organization.id)
    const articles = useSelector(state => state.articleState.allArticles)
    let search = searchParams.get('q');
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
        return <h1>No articles found</h1>
    } 


    return (
        <div>
           {articles.map(article => <h1 key={article.id}>{article.title}</h1>)}
        </div>
    )
}

export default OrgSearch