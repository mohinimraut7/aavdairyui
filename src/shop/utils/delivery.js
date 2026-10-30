// Display-side totals. The server recalculates everything from DB prices.
export const calcTotals = (subtotal, config) => {
  const threshold = Number(config?.freeDeliveryThreshold ?? 499);
  const fee = Number(config?.deliveryFee ?? 30);
  const deliveryFee = subtotal === 0 || subtotal >= threshold ? 0 : fee;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    amountForFreeDelivery: Math.max(0, threshold - subtotal),
    threshold,
  };
};
