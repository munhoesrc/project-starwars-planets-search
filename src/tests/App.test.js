import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o Projeto Star Wars', () => {
  it('Testando se os filtros foram renderizados', () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();

    const btnFilter = screen.getByRole('button', { name: /filtar/i });
    expect(btnFilter).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(1);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(2);
  });
  it('Testando se a tabela de planetas foi renderizada', async () => {
    render(<App />);

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets).toBeInTheDocument()
      })
    })
  });
  it('Testando o filtro por nome', async () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    userEvent.type(filterName, 'tatooine');

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(1)
      })
    })
  })
  it('Testando o filtro para population', async () => {
    render(<App />);
    const colummFilter = screen.getByTestId('column-filter');
    const conferFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const btnFilter = screen.getByRole('button', { name: /filtar/i });

    userEvent.selectOptions(colummFilter, 'population');
    userEvent.selectOptions(conferFilter, 'maior que');
    userEvent.type(valueFilter, 1);
    userEvent.click(btnFilter);

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(1)
      })
    })
  });
});
