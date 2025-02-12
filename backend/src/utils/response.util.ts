export const customResponse = (
  message: string,
  data: any,
  success: boolean,
) => {
  return {
    message: message,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: data,
    success: success,
  };
};
