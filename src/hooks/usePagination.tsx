import { useMemo } from 'react';

type UsePaginationProps = {
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	currentPage: number;
};

export const DOTS = '...';

const range = (start: number, end: number) => {
	let length = end - start + 1;

	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}: UsePaginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);
		// 20
		console.log(
			'🚀 ~ file: usePagination.tsx:26 ~ paginationRange ~ totalPageCount:',
			totalPageCount
		);

		const totalPageNumbers = siblingCount + 5;
		// 6
		console.log(
			'🚀 ~ file: usePagination.tsx:29 ~ paginationRange ~ totalPageNumbers:',
			totalPageNumbers
		);

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}
		/**
		 * 1 - 1, 1 => 1
		 * 2 - 1, 1 => 1
		 * 3 - 1, 1 => 2
		 */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		console.log(
			'🚀 ~ file: usePagination.tsx:48 ~ paginationRange ~ leftSiblingIndex:',
			leftSiblingIndex
		);
		/**
		 * 1 + 6, 6 => 6
		 */
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		const shouldShowLeftDots = leftSiblingIndex > 3;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			// 15
			let leftItemCount = 3 + 2 * siblingCount;
			console.log(
				'🚀 ~ file: usePagination.tsx:69 ~ paginationRange ~ siblingCount:',
				siblingCount
			);
			console.log(
				'🚀 ~ file: usePagination.tsx:69 ~ paginationRange ~ leftItemCount:',
				leftItemCount
			);
			let leftRange = range(1, leftItemCount);
			console.log(
				'🚀 ~ file: usePagination.tsx:70 ~ paginationRange ~ leftRange:',
				leftRange
			);

			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			console.log(
				'🚀 ~ file: usePagination.tsx:88 ~ paginationRange ~ rightItemCount:',
				rightItemCount
			);
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);

			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
