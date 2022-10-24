import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ContextTable from './ContextTable';

const filtersOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function ProviderTable({ children }) {
  const [data, setData] = useState([]);
  const [planet, setPlanet] = useState('');
  const [similarity, setSimilarity] = useState('maior que');
  const [valueFilter, setValeuFilter] = useState(0);
  const [filters, setFilters] = useState(filtersOptions);
  const [columm, setColumm] = useState(filters[0]);
  const [selectFilter, setSelectFilter] = useState([]);
  const [initial, setInitial] = useState([]);

  const handleColumm = ({ target: { value } }) => {
    setColumm(value);
  };

  const handleSimilarity = ({ target: { value } }) => {
    setSimilarity(value);
  };

  const handleValue = ({ target: { value } }) => {
    setValeuFilter(value);
  };

  const handleBtnFilter = () => {
    const filtersTotal = filters.filter((e) => e !== columm);
    setFilters(filtersTotal);
    setColumm(filtersTotal[0]);
    if (similarity === 'maior que') {
      const filter = data.filter((e) => Number(e[columm]) > Number(valueFilter));
      setData(filter);
      setSelectFilter([...selectFilter,
        { columm, similarity, value: valueFilter, array: filter }]);
    }
    if (similarity === 'menor que') {
      const filter = data.filter((e) => Number(e[columm]) < Number(valueFilter));
      setData(filter);
      setSelectFilter([...selectFilter,
        { columm, similarity, value: valueFilter, array: filter }]);
    }
    if (similarity === 'igual a') {
      const filter = data.filter((e) => e[columm] === valueFilter);
      setData(filter);
      setSelectFilter([...selectFilter,
        { columm, similarity, value: valueFilter, array: filter }]);
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const filter = results.filter((element) => delete element.residents);
      setData(filter);
      setInitial(filter);
    };
    requestAPI();
  }, []);

  const deleteFull = () => {
    setData(initial);
    setFilters(filtersOptions);
    setSelectFilter([]);
  };

  const deleteFilter = (index) => {
    if (selectFilter.length === 1) {
      setData(initial);
      setFilters(filtersOptions);
      setSelectFilter([]);
    }
    if (selectFilter.length >= 2) {
      const varFilter = selectFilter.filter((e) => e.columm !== index.columm);
      setSelectFilter(varFilter);
      setFilters([...filters, index.columm]);
      setData(selectFilter[selectFilter.length - 2].array);
    }
  };

  const handlePlanet = ({ target: { value } }) => {
    setPlanet(value);
  };

  const value = useMemo(() => ({
    data,
    planet,
    handlePlanet,
    columm,
    handleColumm,
    similarity,
    handleSimilarity,
    valueFilter,
    handleValue,
    handleBtnFilter,
    filters,
    setFilters,
    deleteFull,
    deleteFilter,
    selectFilter,
    setSelectFilter,
    // eslint-disable-next-line
  }), [data, planet, columm, similarity, valueFilter]);

  return (
    <ContextTable.Provider value={ value }>
      {children}
    </ContextTable.Provider>
  );
}

ProviderTable.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default ProviderTable;
