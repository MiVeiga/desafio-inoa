import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './index';

describe('Home Page', () => {
  it('should render welcome message', () => {
    render(<Home />);
    
    expect(screen.getByText('Bem vindo B3 Quote App')).toBeInTheDocument();
  });

  it('should render h1 element', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Bem vindo B3 Quote App');
  });

  it('should render in a div container', () => {
    const { container } = render(<Home />);
    
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });
}); 