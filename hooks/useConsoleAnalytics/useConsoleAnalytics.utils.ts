const IGNORED_ERRORS = [
  'The request has been aborted',
  'Error retreiving a token',
  '[GSI_LOGGER]',
] as const;

export function isIgnoredError(message: string): boolean {
  return !!IGNORED_ERRORS.find((errorMessage) => message.startsWith(errorMessage));
}
