import { useState, useEffect } from 'react';
import { findWarehouse } from 'shared/services/api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryWarehouse({
  cityRef,
  handleData,
  postMachine,
  savedWarehouse,
  ...props
}) {
  const [warehouses, setWarehouses] = useState([]);
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [initialWarehouse, setInitialWarehouse] = useState(
    () => savedWarehouse || ''
  );
  const [selectedWarehouseData, setSelectedWarehouseData] = useState(null);

  // useEffect(() => console.log('REF CHANGED', cityRef), [cityRef]);

  useEffect(() => {
    initialWarehouse?.Ref && initialWarehouse?.Ref === savedWarehouse?.Ref
      ? setInitialWarehouse(savedWarehouse)
      : setInitialWarehouse('');

    // console.log('initialWarehouse.Ref :>> ', initialWarehouse.Ref);
    // console.log('savedWarehouse.Ref :>> ', savedWarehouse.Ref);
    // console.log('VS :', initialWarehouse.Ref === savedWarehouse.Ref);

    setWarehouses([]);
    setTargetWarehouse('');
    setSelectedWarehouseData(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityRef]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchWarehousesFromAPI, [targetWarehouse]);

  useEffect(() => {
    savedWarehouse
      ? setSelectedWarehouseData(savedWarehouse)
      : setSelectedWarehouseData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      fetchWarehousesFromAPI();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedWarehouseData, cityRef]
  );

  useEffect(() => {
    handleData && handleData.send(selectedWarehouseData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseData]);

  async function fetchWarehousesFromAPI() {
    // if (targetWarehouse.length < 1) {
    //   return;
    // }

    // console.log('FETCHING FUNCTION WORKS');

    const value = targetWarehouse ? targetWarehouse.toLowerCase() : '';

    const response = await findWarehouse(value, cityRef, postMachine);

    if (!response) {
      return;
    }

    const result = response.filter(point =>
      postMachine
        ? point.TypeOfWarehouse === 'f9316480-5f2d-425d-bc2c-ac7cd29decf0' ||
          point.TypeOfWarehouse === '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc'
        : point.TypeOfWarehouse !== 'f9316480-5f2d-425d-bc2c-ac7cd29decf0' &&
          point.TypeOfWarehouse !== '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc'
    );

    setWarehouses(result);
  }

  const extractTargetWarehouse = data => {
    setTargetWarehouse(data);
  };

  const extractWarehouseData = data => {
    setSelectedWarehouseData(data);
  };

  const clearWarehouse = () => {
    handleData && handleData.clear();
    setWarehouses([]);
    setInitialWarehouse(null);
    setSelectedWarehouseData(null);
    fetchWarehousesFromAPI();
  };

  return (
    <LocationSelector
      label={!postMachine ? 'Відділення Нової Пошти' : 'Поштомат Нової Пошти'}
      data={warehouses}
      // initialValue={savedWarehouse?.Description || initialValue}
      initialValue={initialWarehouse?.Description || ''}
      placeholder="Вкажіть номер, або адресу"
      extract={{
        searchValue: extractTargetWarehouse,
        data: extractWarehouseData,
      }}
      clear={clearWarehouse}
    />
  );
}
