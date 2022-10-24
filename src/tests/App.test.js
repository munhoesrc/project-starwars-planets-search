import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o Projeto Star Wars', () => {
  it('Testando se os filtros foram renderizados', () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
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

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });

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
  it('Testando o filtro para orbital_period, diameter e botão excluir todos', async () => {
    render(<App />);
    const colummFilter = screen.getByTestId('column-filter');
    const similarityFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(colummFilter, 'orbital_period');
    userEvent.selectOptions(similarityFilter, 'menor que');
    userEvent.type(valueFilter, 500);
    userEvent.click(btnFiltrar);

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(1)
      })
    })
    userEvent.selectOptions(colummFilter, 'diameter');
    userEvent.selectOptions(similarityFilter, 'igual a');
    userEvent.type(valueFilter, 12500);
    userEvent.click(btnFiltrar);

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(2)
      })
    })

    const btnDeleteFull = screen.getByRole('button', {
      name: /excluir todos/i
    })

    expect(btnDeleteFull).toBeInTheDocument();

    userEvent.click(btnDeleteFull);

    await waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(3)
      })
    })
  });
  it('Testando o filtro para rotation_period, surface_water e botão excluir', () => {
    render(<App />);
    const colummFilter = screen.getByTestId('column-filter');
    const similarityFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(colummFilter, 'rotation_period');
    userEvent.selectOptions(similarityFilter, 'maior que');
    userEvent.type(valueFilter, 25);
    userEvent.click(btnFiltrar);

    waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(1)
      })
    })
    userEvent.selectOptions(colummFilter, 'surface_water');
    userEvent.selectOptions(similarityFilter, 'maior que');
    userEvent.type(valueFilter, 50);
    userEvent.click(btnFiltrar);

    waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(2);

      })
    })

    const btnDeleteFilter = screen.getByTestId('button-delete-1');
    userEvent.click(btnDeleteFilter);

    waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(3);

      })
    })
    const btnDeleteFilter0 = screen.getByTestId('button-delete-0');
    userEvent.click(btnDeleteFilter0);

    waitFor(() => {
      const table = screen.getByTestId('tabela');
      expect(table).toBeInTheDocument()

      waitFor(() => {
        const planets = screen.getAllByTestId('planet-name');
        expect(planets.length).toBe(4);
      })
    })
  });
});
