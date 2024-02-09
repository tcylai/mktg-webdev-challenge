// The main component encapsulating everything to do with the Directory
// on the people page

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PersonRecord, DepartmentRecord } from 'types'
import DirectoryCardList from './DirectoryCardList'
import FilterList from './FilterList'
import DirectorySearch from './DirectorySearch'
import style from './Directory.module.css'

interface DirectoryProps {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function Directory({
	allPeople,
	allDepartments,
}: DirectoryProps): React.ReactElement {
	const [selectedFilter, setSelectedFilter] = useState([])
	const [isHideNoAvatar, setIsHideNoAvatar] = useState(false)
	const [searchName, setSearchName] = useState('')
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 540) {
				setIsMobile(true)
				setSelectedFilter([])
			} else {
				setIsMobile(false)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const departments = useMemo(() => {
		// Rebuilds departments into a tree instead of a flat list for easier
		// implementation using components and array maps
		const queue = allDepartments.filter((d) => d.parent === null)
		const result = [...queue]

		while (queue.length) {
			const department = queue.pop()

			department.children.forEach((c, ix) => {
				const info = allDepartments.find((allDeps) => c.id === allDeps.id)
				department.children[ix] = { ...info }
				queue.push(department.children[ix])
			})
		}

		return result
	}, [allDepartments])

	const handleFilterClick = useCallback((ids: string[]) => {
		setSelectedFilter((prev: string[]) => {
			if (ids.length && prev.length) {
				return prev[prev.length - 1] === ids[ids.length - 1] ? [] : ids
			}
			return ids
		})
	}, [])

	const handleNameSearch = useCallback((e) => {
		setSearchName(e.target.value.trim())
	}, [])

	const handleHideClick = useCallback(() => {
		setIsHideNoAvatar((prev) => !prev)
	}, [])

	const filteredPeople = useMemo(
		() =>
			allPeople.filter((p) => {
				const departmentFiltering =
					!selectedFilter.length ||
					p.department.id === selectedFilter[selectedFilter.length - 1]
				const noAvatarFiltering = !isHideNoAvatar || p.avatar
				const nameFiltering =
					!searchName || p.name.toLowerCase().includes(searchName.toLowerCase())

				return departmentFiltering && noAvatarFiltering && nameFiltering
			}),
		[selectedFilter, isHideNoAvatar, searchName, allPeople]
	)

	return (
		<div className={style.directoryPage}>
			<div className={style.headingContainer}>
				<h1 className={style.heading}>HashiCorp Humans</h1>
				<p className={style.subHeading}>Find a HashiCorp Human</p>
			</div>
			<DirectorySearch
				handleHideClick={handleHideClick}
				handleNameSearch={handleNameSearch}
				isHideNoAvatar={isHideNoAvatar}
			/>
			<div className={style.contentContainer}>
				{!isMobile && (
					<FilterList
						departments={departments}
						handleFilterClick={handleFilterClick}
						selectedFilter={selectedFilter}
					/>
				)}
				<DirectoryCardList people={filteredPeople} />
			</div>
		</div>
	)
}
