import { MdSearch } from 'react-icons/md';
import { FormEvent, useContext, useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../Providers/CartContext';

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('');

  const { filterProducts } = useContext(CartContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.length > 0) {
      filterProducts(searchInput);
    }
  };

  const handleOnChange = (inputValue: string) => {
    setSearchInput(inputValue);
    filterProducts(inputValue);
  };

  return (
    <StyledSearchForm onSubmit={(event) => handleSubmit(event)}>
      <input
        type='text'
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
          handleOnChange(event.target.value);
        }}
        placeholder='Digitar pesquisa'
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
