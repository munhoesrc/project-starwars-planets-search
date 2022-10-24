import { useContext } from 'react';
import { BsTrash } from 'react-icons/bs';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planet, handlePlanet } = useContext(ContextTable);
  const { columm, handleColumm } = useContext(ContextTable);
  const { similarity, handleSimilarity } = useContext(ContextTable);
  const { valueFilter, handleValue } = useContext(ContextTable);
  const { handleBtnFilter } = useContext(ContextTable);
  const { filters, selectFilter } = useContext(ContextTable);
  const { deleteFull, deleteFilter } = useContext(ContextTable);

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
            filters.map((e) => (
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
          Filtrar
        </button>
      </div>
      <div>
        <br />
        <span>Filtros Selecionados:</span>
        {
          selectFilter.length > 0
          && (
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ deleteFull }
            >
              Excluir todos
            </button>
          )
        }
        <div>
          {
            selectFilter?.map((e, i) => (
              <div data-testid="filter" key={ i }>
                <span>{`${e.columm} ${e.similarity} ${e.value} ${' '}`}</span>
                <button
                  data-testid={ `button-delete-${i}` }
                  className="btn__delete"
                  type="button"
                  onClick={ () => deleteFilter(e) }
                >
                  <BsTrash fontSize="16" />
                </button>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Filter;
