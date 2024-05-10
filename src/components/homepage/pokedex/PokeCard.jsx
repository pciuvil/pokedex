import React, { useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import './styles/pokeCard.css';
import { useNavigate } from 'react-router-dom';

const PokeCard = ({url}) => {

const [pokemon, getPokemons ] =useFetch();

const navigate = useNavigate();

useEffect(() => {
    getPokemons(url);
}, []);

const handlePokemon = () => {
    navigate(`/pokedex/${pokemon.id}`)
}


  return (
   <article onClick={handlePokemon} className={`pokecard border--${pokemon?.types[0].type.name}`}>
    <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
    <figure className='pokecard__img'>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemonimage" />
    </figure>
    <h3 className={`pokecard__name name--${pokemon?.types[0].type.name} `}>{pokemon?.name.charAt(0).toLocaleUpperCase()+pokemon?.name.slice(1)}</h3>
    <ul className='pokecard__types'>
        {
            pokemon?.types.map(type => (
                <li className={`slot${type.slot}`} key={type.type.url}>{type.type.name.charAt(0).toLocaleUpperCase()+type.type.name.slice(1)}</li>
            ))
        }
        
    </ul>
    <span className='type__title'>Type</span>
    <hr />
        <ul className={`pokecard__stats stats--${pokemon?.types[0].type.name}`}>
            {
                pokemon?.stats.map(stat => (
                    !stat.stat.name.includes('-') &&
                    <li key={stat.stat.url}>
                        <span>{stat.stat.name.toUpperCase()}</span>
                        <span>{stat.base_stat}</span>
                    </li>
                ))
            }
        </ul>
   </article>
  )
}

export default PokeCard;