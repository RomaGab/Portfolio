import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Tag from './Tag';

const TagGrid = ({tags, maxChars = 60}) => {
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
        <div className="flex flex-col gap-2 mt-0 w-full">
            <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    {firstRow.map((tag, index) => (
                        <Tag key={index} tag={tag}/>
                    ))}
                </div>
                {hasMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`bg-none border-none text-[#bababa] cursor-pointer flex items-center p-1 transition-transform duration-300 hover:text-black ${
                            isExpanded ? 'rotate-90 text-black' : ''
                        }`}
                    >
                        <FaChevronRight size={14}/>
                    </button>
                )}
            </div>
            {isExpanded && hasMore && (
                <div className="flex flex-col gap-2 tag-toggle">
                    {extraRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2 flex-wrap">
                            {row.map((tag, tagIndex) => (
                                <Tag key={tagIndex} tag={tag}/>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagGrid;