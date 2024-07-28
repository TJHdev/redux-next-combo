export const delayedResponse: Promise<undefined> = new Promise((resolve) =>
  setTimeout(() => resolve(undefined), 5000)
);
