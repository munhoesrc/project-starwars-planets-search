import { useContext } from 'react';
import ContextTable from '../context/ContextTable';
import Filter from '../components/Filter';

function Table() {
  const { data, planet } = useContext(ContextTable);

  return (
    <>
      <div>
        <Filter />
      </div>
      <br />
      <table data-testid="tabela">

        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Created</th>
          <th>Terrain</th>
          <th>url</th>
        </tr>

        <tbody>
          {
            (data
              .filter((e) => e.name.toLowerCase()
                .includes(planet.toLowerCase()))
              .map((e) => (
                <tr key={ e.name }>
                  <td>
                    {e.name}
                  </td>
                  <td>
                    {e.climate}
                  </td>
                  <td>
                    {e.diameter}
                  </td>
                  <td>
                    {e.edited}
                  </td>
                  <td>
                    {e.films.map((el, i) => (
                      <ul key={ i }>
                        <li>{el}</li>
                      </ul>
                    ))}
                  </td>
                  <td>
                    {e.gravity}
                  </td>
                  <td>
                    {e.orbital_period}
                  </td>
                  <td>
                    {e.population}
                  </td>
                  <td>
                    {e.rotation_period}
                  </td>
                  <td>
                    {e.surface_water}
                  </td>
                  <td>
                    {e.created}
                  </td>
                  <td>
                    {e.terrain}
                  </td>
                  <td>
                    {e.url}
                  </td>
                </tr>
              )))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
