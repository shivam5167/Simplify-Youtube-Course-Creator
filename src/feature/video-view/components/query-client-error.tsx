"use client";

import React from "react";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@/components/ui/button";

const QueryClientErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="flex h-56 w-full flex-col items-center justify-center gap-3 rounded-md bg-red-100 px-4 py-2 text-red-600 dark:bg-[#18030c] dark:text-[#f54180]">
    <div className="text-center">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
);

export default QueryClientErrorBoundary;
