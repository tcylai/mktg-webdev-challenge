import React, { useState } from 'react';
import classnames from 'classnames';
import { DepartmentRecord } from 'types'
import style from './Filter.module.css';

interface FilterProps {
	department: DepartmentRecord;
    handleFilterClick: (ids: string[]) => void;
    parentIds?: string[];
    selectedFilter: string[];
}

export default function Filter({department, handleFilterClick, parentIds = [], selectedFilter}: FilterProps): React.ReactElement {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOnclick = () => {
        setIsExpanded(prev => !prev);
    }

    const boundHandleFilterClick = () => handleFilterClick([...parentIds, department.id]);

    const isSelected = selectedFilter.includes(department.id);

    return (
        <ul className={classnames(style.container, department.parent && style.hasChildLine)}>
            <div className={style.nameContainer}>
                <div className={classnames(style.chevron, isExpanded && style.expanded, !department.children.length && style.noChevron )} onClick={handleOnclick}>›</div>
                <div className={classnames(style.name, isSelected && style.selectedName)} onClick={boundHandleFilterClick}>{department.name}</div>
            </div>
            {department.children.map((dep: DepartmentRecord) => (
                <li key={dep.id} className={!isExpanded && style.none}>
                    <Filter department={dep} handleFilterClick={handleFilterClick} parentIds={[...parentIds, department.id]} selectedFilter={selectedFilter} />
                </li>
            ))}
        </ul>
    );
}