export const sortingFunctions = {
  // eslint-disable-next-line no-sequences
  'Без сортування': (a, b) => (a, b),
  'Від дешевих до дорогих': (a, b) => a.price - b.price,
  'Від дорогих до дешевих': (a, b) => b.price - a.price,
  'За рейтингом': (a, b) => b.rating - a.rating,
  Новинки: (a, b) => b.createdAt.localeCompare(a.createdAt),
};
