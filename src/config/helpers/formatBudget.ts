export function formatBudgetCurrency(quantity: number): string {
  return Number(quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
