import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planet, handlePlanet } = useContext(ContextTable);
  const { columm, handleColumm } = useContext(ContextTable);
  const { similarity, handleSimilarity } = useContext(ContextTable);
  const { valueFilter, handleValue } = useContext(ContextTable);
  const { handleBtnFilter } = useContext(ContextTable);

  const columms = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <div>
      <div className="input__search">
        <input
          type="text"
          // name="name-filter"
          id="name-filter"
          value={ planet }
          onChange={ handlePlanet }
          data-testid="name-filter"
        />
      </div>
      <div>
        <select
          value={ columm }
          onChange={ handleColumm }
          data-testid="column-filter"
        >
          {
            columms.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))
          }

        </select>
        <select
          value={ similarity }
          onChange={ handleSimilarity }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ valueFilter }
          onChange={ handleValue }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ handleBtnFilter }
          data-testid="button-filter"
        >
          Filtar
        </button>
      </div>
    </div>
  );
}

export default Filter;
