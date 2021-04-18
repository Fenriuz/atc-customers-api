export const databaseErrors = (dbErr: any, defaultError: string): string => {
  const errors = {
    11000: () => {
      const key = Object.keys(dbErr?.keyValue);

      return `ATC error: duplicated ${key}`;
    },
  };

  const error = errors[dbErr?.code]();
  if (!error) {
    return defaultError;
  }

  return error;
};
