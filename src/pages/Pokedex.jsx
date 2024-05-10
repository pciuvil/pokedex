import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/homepage/pokedex/PokeCard';
import PokeSelect from '../components/homepage/pokedex/PokeSelect';
import Pagination from '../components/homepage/pokedex/Pagination';


const Pokedex = () => {


    const [selectValue, setSelectValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage] = useState(8);
    const [pokemons, getPokemons, getTypes] = useFetch();

    const trainer = useSelector(store => store.trainer);

    useEffect(() => {
        if (selectValue) {
            getTypes(selectValue);            
        }else {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=1302'
            getPokemons(url);
        }
    }, [selectValue]);

    const textInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(textInput.current.value.toLowerCase().trim());
        textInput.current.value = '';
    }

    const pokeSearch = (poke) => {
        const perName = poke.name.includes(inputValue);
        return perName;
    }

    
    const indexLastPoke = currentPage*pokePerPage;
    const indexFirstPoke = indexLastPoke-pokePerPage;
    const currentPoke = pokemons?.results.slice(indexFirstPoke, indexLastPoke);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <>
        <header className='pokedex__header'>
        <img src="./assets/pokemonparty.png" alt="pokemon_logo" />
        </header>
        <section className='pokedex'>
            <div className='pokedex__info'>
            <h2><span className='pokedex__title'>Bienvenido {trainer},</span> aqui podras encontrar tu pokemon favorito</h2>
            </div>
            <div className='pokedex__form'>
                <form onSubmit={handleSubmit}>
                    <input ref={textInput} type="text" />
                    <button className='pokedex__btn'>Search</button>
                </form>
                <PokeSelect
                    setSelectValue={setSelectValue}
                />
            </div>
            <div className='pokedex__pagination'>
                <Pagination
                    pokePerPage={pokePerPage}
                    totalPokemons={pokemons?.count}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div className='pokedex__container'>
                {
                    currentPoke?.filter(pokeSearch).map((poke) => (
                        <PokeCard
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }
            </div>
        </section>
        </>
   
    )
}
export default Pokedex