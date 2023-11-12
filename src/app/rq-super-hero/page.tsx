'use client';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Hero } from '../super-hero/page';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export default function RqSuperHero() {
	const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
		'super-heros',
		fetchSuperHeroes,
		{ cacheTime: 5000 } //cache의 시간을 변경 할 수 있다.
		// { enabled: false }
	);

	console.log(isLoading, isFetching);

	// cache가 되어 db의 데이터가 변경이 되어도 isLoading false가 되면 변경이 되지 않지만
	// isFetching은 db변경시 background에서 다시 fetch하므로 true로 다시 변경이 된다.

	if (isLoading || isFetching) return <h2>Loading ...</h2>;

	if (isError) return <h2>{error?.message}</h2>;

	return (
		<>
			<h2>RQ Super Hero</h2>
			<button onClick={refetch}>fetch heros</button>
			{data?.data.map(({ name }: Hero) => (
				<p key={name}>{name}</p>
			))}
		</>
	);
}
