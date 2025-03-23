import { describe, it, expect, vi } from 'vitest';
import * as cli from '../src/cli.js';
import * as funkoService from '../src/funkoService.js';
import chalk from 'chalk';
import yargs from 'yargs';

// Mock de los comandos de yargs
vi.mock('yargs');

// Test para el comando `add`
describe('cli.ts', () => {
    it('should add a Funko using CLI', async () => {
        const addFunkoMock = vi.spyOn(funkoService, 'addFunko').mockImplementation(() => {});
        const mockArgs = {
            usuario: 'usuario1',
            id: '1',
            nombre: 'Funko1',
            descripcion: 'Descripción de Funko1',
            tipo: 'Pop!',
            genero: 'Animación',
            franquicia: 'The Big Bang Theory',
            numero: 101,
            exclusivo: true,
            caracteristicas: 'Brilla en la oscuridad',
            valor: 50
        };
        // Simula el CLI pasando los argumentos correctos
        //await cli.handlerAddFunko(mockArgs);
        expect(addFunkoMock).toHaveBeenCalledWith(mockArgs.usuario, expect.objectContaining(mockArgs));
        addFunkoMock.mockRestore();
    });

    it('should show an error if Funko ID already exists using CLI', async () => {
        const addFunkoMock = vi.spyOn(funkoService, 'addFunko').mockImplementation(() => {});
        const consoleErrorMock = vi.spyOn(console, 'log').mockImplementation(() => {});

        // Simula que el Funko ya existe
        vi.spyOn(funkoService, 'addFunko').mockImplementation(() => {
            console.log(chalk.red('Error: Ya existe un Funko con este ID.'));
        });

        /*await cli.handlerAddFunko({
            usuario: 'usuario1',
            id: '1',
            nombre: 'Funko1',
            descripcion: 'Descripción de Funko1',
            tipo: 'Pop!',
            genero: 'Animación',
            franquicia: 'The Big Bang Theory',
            numero: 101,
            exclusivo: true,
            caracteristicas: 'Brilla en la oscuridad',
            valor: 50
        });*/

        expect(consoleErrorMock).toHaveBeenCalledWith(chalk.red('Error: Ya existe un Funko con este ID.'));
        consoleErrorMock.mockRestore();
    });
});
