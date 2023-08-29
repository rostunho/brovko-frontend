import About from 'components/About/About';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';

export default function AboutPage() {
  // Функція для обробки події відправки форми
  const handleSearchSubmit = formData => {
    //необхідні дії з даними з форми
    console.log('Form data submitted:', formData);
    // Наприклад, викликати серверний запит для пошуку
  };
  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter />
      <About />
    </>
  );
}
