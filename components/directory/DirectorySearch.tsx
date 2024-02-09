import React from 'react';
import style from './DirectorySearch.module.css';
import MagnifyingGlassIcon from 'assets/MagnifyingGlassIcon.svg';

export default function DirectorySearch({handleHideClick, handleNameSearch, isHideNoAvatar}): React.ReactElement {
    return <div className={style.container}>
        <div className={style.inputContainer}>
            <input className={style.input} placeholder='Search people by name' onChange={handleNameSearch} />
            <img src={MagnifyingGlassIcon} className={style.magnifyingGlass}/>
        </div>
        <div className={style.hideOptionContainer} onClick={handleHideClick}>
            <input id="hideNoAvatar" type="checkbox" className={style.checkbox} checked={isHideNoAvatar} />
            <label htmlFor="hideNoAvatar" className={style.hideText}>Hide people missing a profile image</label>
        </div>
    </div>;
}