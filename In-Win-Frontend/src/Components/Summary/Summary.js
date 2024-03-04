import React, { useState, useEffect } from 'react';
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';
import { useLocation } from "react-router-dom";
function Summary() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const { exchangeRate, currency } = CurrencyState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [realestatePrice, setRealestateprice] = useState(null);
  const [fixedDeposit, setFixedDeposit] = useState(null);
  const [antiquePieces, setAntiquePieces] = useState(null);
  const [loans, setLoans] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [insurances, setInsurances] = useState(null);
  const [totalPropertyValue, setTotalPropertyValue] = useState(0);
  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };

  //total 
  useEffect(() => {
    // Calculate total property value
    const total = totalPrice + goldPrice + realestatePrice + antiquePieces + vehicles;
    // Subtract loans and insurances
    const totalMinusLoansAndInsurances = total - loans - insurances;
    setTotalPropertyValue(totalMinusLoansAndInsurances);
  }, [totalPrice, goldPrice, realestatePrice, antiquePieces, vehicles, loans, insurances]);


  //for Loans 
  useEffect(() => {
    fetch(`${BASE_URl}/api/loans/totalLoansAmount/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setLoans(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);

  //for Insurances 
  useEffect(() => {
    fetch(`${BASE_URl}/api/insurance/totalPermiumPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setInsurances(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);

  //for vehicles 
  useEffect(() => {
    fetch(`${BASE_URl}/api/vehicles/totalVehiclesPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setVehicles(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);




  //AntiquePieces 
  useEffect(() => {
    // Fetch total stocks price when component mounts
    fetch(`${BASE_URl}/api/antiquePieces/totalAPPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setAntiquePieces(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);
  //fixed Deposits
  useEffect(() => {
    // Fetch total stocks price when component mounts
    fetch(`${BASE_URl}/api/fixedDeposits/totalFDPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setFixedDeposit(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);
  //for realestate
  useEffect(() => {
    // Fetch total stocks price when component mounts
    fetch(`${BASE_URl}/api/realestate/totalRealestatePrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setRealestateprice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);
  //for gold
  useEffect(() => {
    // Fetch total stocks price when component mounts
    fetch(`${BASE_URl}/api/gold/totalGoldPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setGoldPrice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);


  //for stocks
  useEffect(() => {
    // Fetch total stocks price when component mounts
    fetch(`${BASE_URl}/api/stocks/totalStocksPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setTotalPrice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, []);

  return (
    <div>
      <table class="    table table-striped mt-3"  >
        <thead>
        </thead>
        <tbody  >
          <tr className='border border-dark'>
            <th scope="" className='border border-dark'>Property</th>
            <th className='border border-dark'>Current Value In {currency}</th>
          </tr>
          <tr className='border border-dark'>
            <th scope="row" className='border border-dark'>Stocks</th>
            <td className='border border-dark'>{renderPrice(totalPrice && totalPrice.toFixed(2))}     </td>
          </tr>

          <tr className='border border-dark'>
            <th className='border border-dark'>Gold</th>
            <td className='border border-dark'>{renderPrice(goldPrice)}      </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Realestate</th>
            <td className='border border-dark'>{renderPrice(realestatePrice)}      </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Fixed Deposit</th>
            <td className='border border-dark'>{renderPrice(fixedDeposit)}      </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Antique Pieces</th>
            <td className='border border-dark'>{renderPrice(antiquePieces)}      </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Vehicles</th>
            <td className='border border-dark'>{renderPrice(vehicles)}      </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Insurance</th>
            <td className='border border-dark'>{renderPrice(insurances)}       </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>Loans</th>
            <td className='border border-dark'>{renderPrice(loans)}   </td>
          </tr>
          <tr className='border border-dark'>
            <th className='border border-dark'>total</th>
            <td className={`border border-dark ${totalPropertyValue >= 0 ? 'text-success' : 'text-danger'}`}>{renderPrice(totalPropertyValue.toFixed(2))}       {currency}</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
