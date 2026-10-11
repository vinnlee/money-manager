"use client";

import NumberFlow, { type Format } from "@number-flow/react";

type NumberFlowCurrencyProps = {
  /** The numeric value to display */
  value: number;
  /** Currency code (default: VND) */
  currency?: string;
  /** Locale for formatting (default: vi-VN) */
  locale?: string;
  /** Additional className */
  className?: string;
  /** Whether to show the sign (+/-) */
  showSign?: boolean;
};

const defaultFormat: Format = {
  style: "currency",
  currency: "VND",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/**
 * Animated currency display using NumberFlow.
 * Use this throughout the app for all money values.
 */
export function NumberFlowCurrency({
  value,
  currency = "VND",
  locale = "vi-VN",
  className,
  showSign = false,
}: NumberFlowCurrencyProps) {
  const format: Format = {
    ...defaultFormat,
    currency,
    signDisplay: showSign ? "exceptZero" : "auto",
  };

  return (
    <NumberFlow value={value} format={format} locales={locale} className={className} willChange />
  );
}
