import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AssetsFilter } from './AssetsFilter';

describe('AssetsFilter', () => {
  const mockOnSubmit = vi.fn();
  const mockOnClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    expect(screen.getByLabelText(/Ativos/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de início/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de fim/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Consultar/ })).toBeInTheDocument();
  });

  it('should show error message when error prop is provided', () => {
    const errorMessage = 'Test error message';
    
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
        error={errorMessage}
        onClearError={mockOnClearError}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should call onClearError when error close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
        error="Test error"
        onClearError={mockOnClearError}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockOnClearError).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit with form data when submit button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    const assetsInput = screen.getByLabelText(/Ativos/);
    const startDateInput = screen.getByLabelText(/Data de início/);
    const endDateInput = screen.getByLabelText(/Data de fim/);
    const submitButton = screen.getByRole('button', { name: /Consultar/ });

    await user.type(assetsInput, 'PETR4 VALE3');
    await user.type(startDateInput, '2024-01-01');
    await user.type(endDateInput, '2024-01-31');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('PETR4 VALE3', '2024-01-01', '2024-01-31');
  });

  it('should disable submit button when form is invalid', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Consultar/ });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when loading', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={true}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Consultando/ });
    expect(submitButton).toBeDisabled();
  });

  it('should show loading text when loading', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={true}
      />
    );

    expect(screen.getByText('Consultando...')).toBeInTheDocument();
  });

  it('should not call onSubmit when assets field is empty', async () => {
    const user = userEvent.setup();
    
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    const startDateInput = screen.getByLabelText(/Data de início/);
    const endDateInput = screen.getByLabelText(/Data de fim/);
    const submitButton = screen.getByRole('button', { name: /Consultar/ });

    await user.type(startDateInput, '2024-01-01');
    await user.type(endDateInput, '2024-01-31');
    
    expect(submitButton).toBeDisabled();
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should not call onSubmit when dates are invalid', async () => {
    const user = userEvent.setup();
    
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    const assetsInput = screen.getByLabelText(/Ativos/);
    const startDateInput = screen.getByLabelText(/Data de início/);
    const endDateInput = screen.getByLabelText(/Data de fim/);
    const submitButton = screen.getByRole('button', { name: /Consultar/ });

    await user.type(assetsInput, 'PETR4');
    await user.type(startDateInput, '2024-01-31');
    await user.type(endDateInput, '2024-01-01');
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show placeholder text in assets field', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    const assetsInput = screen.getByPlaceholderText(/Digite os códigos dos ativos/);
    expect(assetsInput).toBeInTheDocument();
  });

  it('should show helper text in assets field', () => {
    render(
      <AssetsFilter
        onSubmit={mockOnSubmit}
        loading={false}
      />
    );

    expect(screen.getByText(/Ex: PETR4 VALE3 ITUB4/)).toBeInTheDocument();
  });
}); 