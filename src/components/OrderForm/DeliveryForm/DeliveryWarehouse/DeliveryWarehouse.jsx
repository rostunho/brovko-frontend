import { useState, useEffect } from 'react';
import { findWarehouse } from 'shared/services/api';
import { LocationSelector } from 'shared/components/LocationSelector';

export default function DeliveryWarehouse({
  handleData,
  cityName,
  cityRef,
  postMachine,
  initialValue,
  ...props
}) {
  const [warehouses, setWarehouses] = useState([]);
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [selectedWarehouseData, setSelectedWarehouseData] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () => fetchWarehousesFromAPI,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleData, selectedWarehouseData, cityRef]
  );

  // // testing ... delete later
  // useEffect(() => {
  //   fetchWarehousesFromAPI();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [targetWarehouse]);

  useEffect(() => {
    handleData && handleData(selectedWarehouseData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouseData]);

  async function fetchWarehousesFromAPI() {
    // if (targetWarehouse.length < 1) {
    //   return;
    // }

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

  return (
    <LocationSelector
      label={!postMachine ? 'Відділення Нової Пошти' : 'Поштомат Нової Пошти'}
      data={warehouses}
      initialValue={initialValue}
      placeholder="Вкажіть номер, або адресу"
      extractSearchValue={extractTargetWarehouse}
      extractData={extractWarehouseData}
    />
  );
}
