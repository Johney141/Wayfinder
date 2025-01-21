import { useSearchBox } from "react-instantsearch-core";

function TagSearchBox(props) {
    const { query, refine } = useSearchBox();

    return (
        <label className='form-input'>
            Tags
            <input type="text"
                value={query}
                onChange={(e) => refine(e.target.value)}
                placeholder="Search or add tags"
                className="tag-title"
            />
        </label>
    )
}

export default TagSearchBox