export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>이런! 문제가 발생했습니다.:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </div>
  );
}
