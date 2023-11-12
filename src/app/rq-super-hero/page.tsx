'use client';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Hero } from '../super-hero/page';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export default function RqSuperHero() {
	const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
		'super-heros',
		fetchSuperHeroes,
		{ enabled: false }
	);

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
