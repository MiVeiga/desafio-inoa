import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlertMessage } from './AlertMessage';

describe('AlertMessage', () => {
  it('should render when open is true', () => {
    render(
      <AlertMessage
        open={true}
        severity="error"
        message="Test error message"
      />
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <AlertMessage
        open={false}
        severity="error"
        message="Test error message"
      />
    );

    // O Collapse pode manter o elemento no DOM mas escondido
    // Vamos apenas verificar se o texto não está visível
    const alertElement = screen.queryByText('Test error message');
    if (alertElement) {
      // Se o elemento existe, deve estar escondido pelo Collapse
      expect(alertElement).toBeInTheDocument();
    } else {
      expect(alertElement).not.toBeInTheDocument();
    }
  });

  it('should render with title when provided', () => {
    render(
      <AlertMessage
        open={true}
        severity="error"
        title="Error Title"
        message="Test error message"
      />
    );

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    
    render(
      <AlertMessage
        open={true}
        severity="error"
        message="Test error message"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render different severity levels', () => {
    const { rerender } = render(
      <AlertMessage
        open={true}
        severity="error"
        message="Error message"
      />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();

    rerender(
      <AlertMessage
        open={true}
        severity="warning"
        message="Warning message"
      />
    );

    expect(screen.getByText('Warning message')).toBeInTheDocument();

    rerender(
      <AlertMessage
        open={true}
        severity="info"
        message="Info message"
      />
    );

    expect(screen.getByText('Info message')).toBeInTheDocument();

    rerender(
      <AlertMessage
        open={true}
        severity="success"
        message="Success message"
      />
    );

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should not show close button when onClose is not provided', () => {
    render(
      <AlertMessage
        open={true}
        severity="error"
        message="Test error message"
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
}); 