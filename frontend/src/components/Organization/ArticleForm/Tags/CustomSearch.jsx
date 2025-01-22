import { useState } from "react";
import { useSearchBox } from "react-instantsearch-core";



function TagSearchBox({ onTagAdd }) {
    const { query, refine } = useSearchBox();
    const [tag, setTag] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setTag(value);
        refine(value)
    };

    const handleKeyDown = (e) => {
        if(e.key === ' ') {
            e.preventDefault();
            const trimmedTag = tag.trim();
            if(trimmedTag) {
                onTagAdd(trimmedTag)
                setTag('');
                refine('');
            }
        }
        
    }
    return (
        <label className='form-input'>
            Tags
            <input type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search or add tags"
                className="tag-title"
            />
        </label>
    )
}

export default TagSearchBox