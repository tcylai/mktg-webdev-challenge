import React from 'react';
import { PersonRecord } from 'types';
import style from './DirectoryCard.module.css';

import PersonSilhouette from 'assets/PersonSilhouette.svg';

interface DirectoryCardProps {
	person: PersonRecord
} 

export default function DirectoryCard({person}: DirectoryCardProps): React.ReactElement {
    return <span className={style.cardContainer}>
        <div className={style.infoContainer}>
            <img src={person.avatar ? person.avatar.url : PersonSilhouette} className={style.avatar}/>
            <p className={style.name}>{person.name}</p>
            <p>{person.title}</p>
            <p>{person.department.name}</p>
        </div>
    </span>;
}