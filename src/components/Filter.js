import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planet, handlePlanet } = useContext(ContextTable);

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          type="text"
          name="name-filter"
          id="name-filter"
          data-testid="name-filter"
          value={ planet }
          onChange={ handlePlanet }
        />
      </label>
    </div>
  );
}

export default Filter;
