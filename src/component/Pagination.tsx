import { usePagination, DOTS } from '@/hooks/usePagination';

type PaginationProps = {
	onPageChange: (number: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
};

export const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
}: PaginationProps) => {
	const paginationRange = usePagination({
		totalCount,
		pageSize,
		siblingCount,
		currentPage,
	});

	if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrev = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange?.[paginationRange.length - 1];
	console.log('pagination', paginationRange);
	return (
		<ul className='pagination'>
			<li>
				<button onClick={onPrev}>prev</button>
			</li>
			{paginationRange?.map((pageNumber, index) => (
				<li key={`unia-${index}`}>
					{pageNumber === (DOTS as string) ? (
						DOTS
					) : (
						<button
							disabled={currentPage === pageNumber}
							onClick={() => onPageChange(pageNumber as number)}
						>
							{pageNumber}
						</button>
					)}
				</li>
			))}
			<li>
				<button onClick={onNext}>next</button>
			</li>
		</ul>
	);
};
