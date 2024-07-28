

export function formatValueInDollars(centsValue: number) {
    const valueinDollars = centsValue / 100;
    return valueinDollars.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}