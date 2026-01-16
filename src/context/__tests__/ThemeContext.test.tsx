import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("No Context");
    return (
        <div>
            <span data-testid="theme-value">{context.theme}</span>
            <button onClick={context.toggleTheme}>Toggle</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('provides default theme (light if no system preference)', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('toggles theme and updates document class', async () => {
        const user = userEvent.setup();
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByText('Toggle');
        await user.click(button);

        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');

        await user.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
    });
});
