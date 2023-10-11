import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';
import ChapterItem from './ChapterItem';

interface ChapterListProps {
   
}

const ChapterList: React.FC<ChapterListProps> = ({  }) => {
    const data = useAppSelector((state)=>state.quran.allChapterLists)


    return (
        <ul className='grid gap-5'>
            {data?.map((chapter)=>(
                <ChapterItem key={chapter.id} chapter={chapter} />
            ))}
        </ul>
    );
};

export default ChapterList;
