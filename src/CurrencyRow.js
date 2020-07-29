import React from 'react';
import './CurrencyRow.css';

const CurrencyRow = (props) => {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props;

    return (
            <div className="row">
                <input 
                    type="text" 
                    placeholder="Currency" 
                    className="currencyInput"
                    value = {amount}
                    onChange = {onChangeAmount}/>
                <select 
                    onChange={onChangeCurrency}
                    id="multi-state" 
                    className="stacked-state"
                    value={selectedCurrency}>
                    {currencyOptions.map(el => {
                        return (
                        <option 
                            key={el} 
                            value={el}
                        >
                                {el}
                        </option>
                        )
                    })}
                </select>
            </div>
    )
};

export default CurrencyRow;
