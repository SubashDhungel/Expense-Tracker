import React from 'react'
import Input from '../Inputs/Input'
const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = React.useState({
        source:'',
        amount:'',
        date:'',
        icon:''
    });

    const handleChange = (key, value )=>setIncome((prev) => ({
        ...prev,
        [key]: value
    }));
  return (
    <div>
      <Input 
        vlaue={income.source}
        onChange={({target})=>handleChange('source', target.value)}
        label="Income Source"
        placeholder="Salary"
        type={"text"}
      />
      <Input 
        vlaue={income.amount}
        onChange={({target})=>handleChange('amount', target.value)}
        label="Amount"
        placeholder="0.00"
        type={"number"}
      />
      <Input 
        vlaue={income.date}
        onChange={({target})=>handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type={"date"}
      />
      <div className=" flex items-center justify-center mt-6">
        <button className="add-btn add-btn-fill" onClick={(onAddIncome)}>Add Income</button>
      </div>
    </div>
  )
}

export default AddIncomeForm
