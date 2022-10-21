import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ContextTable from './ContextTable';

function ProviderTable({ children }) {
  const [data, setData] = useState([]);
  const [planet, setPlanet] = useState('');

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
  }), [data, planet]);

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
