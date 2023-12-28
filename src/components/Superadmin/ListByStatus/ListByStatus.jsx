import ListByStatusItem from './ListByStatusItem';

const ListByStatus = ({ list }) => {
  return (
    <>
      {list && (
        <ul>
          {list.map(item => (
            <li key={item._id}>
              <ListByStatusItem user={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListByStatus;
