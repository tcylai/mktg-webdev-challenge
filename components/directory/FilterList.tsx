import React from 'react';
import { DepartmentRecord } from 'types'
import DirectoryFilter from './Filter';
import style from './FilterList.module.css';

interface DirectoryFiltersProps {
	departments: DepartmentRecord[];
    handleFilterClick: (ids: string[]) => void;
    selectedFilter: string[];
}

// TODO: Make list always seen... fixed?

export default function FilterList({departments, handleFilterClick, selectedFilter}: DirectoryFiltersProps): React.ReactElement {
    return (
        <div className={style.container}>
            <p className={style.heading}>Filter By Department</p>
            {departments.map(department => (
                <DirectoryFilter key={department.id} department={department} handleFilterClick={handleFilterClick} selectedFilter={selectedFilter} />
            ))}
        </div>
    );
}