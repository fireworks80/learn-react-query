'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

type Hero = {
	id: number;
	name: string;
	alterEgo: string;
};

export default function SuperHero() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<Array<Hero>>([]);

	useEffect(() => {
		axios.get('http://localhost:4000/superheroes').then((res) => {
			setData(res.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading ...</h2>;
	}

	return (
		<>
			<h2>Super Hero</h2>
			{data.map(({ name }) => (
				<p key={name}>{name}</p>
			))}
		</>
	);
}
