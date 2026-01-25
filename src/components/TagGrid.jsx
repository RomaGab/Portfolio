import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const TagGrid = ({ tags, maxChars = 60 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (!tags || tags.length === 0) return null;

    const allRows = [];
    let currentRow = [];
    let currentRowChars = 0;

    tags.forEach((tag) => {
        const tagLength = tag.length + 2;

        if (currentRowChars + tagLength <= maxChars || currentRow.length === 0) {
            currentRow.push(tag);
            currentRowChars += tagLength;
        } else {
            allRows.push(currentRow);
            currentRow = [tag];
            currentRowChars = tagLength;
        }
    });
    if (currentRow.length > 0) allRows.push(currentRow);

    const firstRow = allRows[0];
    const extraRows = allRows.slice(1);
    const hasMore = extraRows.length > 0;

    return (
        <div className="tags-container">
            <div className="tags-row">
                <div className="tags-list">
                    {firstRow.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                    {hasMore && (
                        <button
                            className={`tag-toggle ${isExpanded ? 'active' : ''}`}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <FaChevronRight />
                        </button>
                    )}
                </div>
            </div>
            {isExpanded && hasMore && (
                <div className="tags-extra-container">
                    {extraRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="tags-list">
                            {row.map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagGrid;