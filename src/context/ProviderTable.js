import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ContextTable from './ContextTable';

function ProviderTable({ children }) {
  const [data, setData] = useState([]);
  const [planet, setPlanet] = useState('');
  const [columm, setColumm] = useState('population');
  const [similarity, setSimilarity] = useState('maior que');
  const [valueFilter, setValeuFilter] = useState(0);

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
    if (similarity === 'maior que') {
      const filter = data.filter((e) => Number(e[columm]) > Number(valueFilter));
      setData(filter);
    }
    if (similarity === 'menor que') {
      const filter = data.filter((e) => Number(e[columm]) < Number(valueFilter));
      setData(filter);
    }
    if (similarity === 'igual a') {
      const filter = data.filter((e) => e[columm] === valueFilter);
      setData(filter);
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const filter = results.filter((element) => delete element.residents);
      setData(filter);
    };
    requestAPI();
  }, []);

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
