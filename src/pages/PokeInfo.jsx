import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './styles/pokeInfo.css';

const PokeInfo = () => {

  const params = useParams();

  const [pokemon, getPokemon] = useFetch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    getPokemon(url);
  }, []);

  console.log(pokemon);

  return (

    <div >
      <header>
        <img src="./styles/banner.png" alt="header.img" />
      </header>
      <div className='pokeinfo'>
        <section className='pokeinfo__container'>

          <div className={`pokeinfo__back--color ${pokemon?.types[0].type.name}`}></div>
          <figure className='pokeinfo__img'>
            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
          </figure>
          <div className='pokeinfo__nameid'>
            <span># {pokemon?.id}</span>
            <h2><hr />{pokemon?.name.charAt(0).toLocaleUpperCase() + pokemon?.name.slice(1)}<hr /></h2>
          </div>
          <ul className='pokeinfo__WH'>
            <li><span>Weight </span><span>{pokemon?.weight}</span></li>
            <li><span>Height </span><span>{pokemon?.height}</span></li>
          </ul>
          <div className='pokeinfo__typeskill'>
            <article>
              <h3>Type</h3>
              <ul >
                {
                  pokemon?.types.map(type => (
                    <li className={`pokeinfo__type--color ${pokemon?.types[0].type.name}`} key={type.type.url}>{type.type.name}</li>
                  ))
                }
              </ul>
            </article>
            <article>
              <h3>Skills</h3>
              <ul className='pokeinfo__skill'>
                {
                  pokemon?.abilities.map(skill => (
                    <li key={skill.ability.url}>{skill.ability.name}</li>
                  ))
                }
              </ul>
            </article>
          </div>
          <ul className='pokeinfo__stats'>
            <h2>Stats <span><hr /></span></h2>
            {
              pokemon?.stats.map(stat => (
                <li key={stat.stat.url}><span>{stat.stat.name}</span><span>{stat.base_stat}/150</span>
                  <div className='stats__bar'><div style={{ width: `${stat.base_stat / 1.5}%` }} className='stats__prog'></div></div></li>
              ))
            }
          </ul>
        </section>
        <div className='pokeinfo__mov'>
          <h2>Movements <hr /></h2>
          <ul >
            {
              pokemon?.moves.map(move => (
                <li key={move.move.url}>{move.move.name}</li>
              ))
            }
          </ul>

        </div>
      </div>
    </div>
  )
}

export default PokeInfo;