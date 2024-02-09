import React from 'react';
import { PersonRecord } from 'types'
import DirectoryCard from './DirectoryCard';
import style from './DirectoryCardList.module.css';

interface DirectoryCardListProps {
	people: PersonRecord[]
} 

export default function DirectoryCardList({people}: DirectoryCardListProps): React.ReactElement {
    return <div className={style.container}>
        {people.length 
            ? people.map(p => <DirectoryCard key={p.id} person={p} />)
            : <p>No results found.</p>
        }
    </div>;
}