import React from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'
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
    <form onSubmit={(e) =>{ e.preventDefault(); onAddIncome(income)}}>

        <EmojiPickerPopup
            icon ={income.icon}
            onSelect={(icon) => handleChange('icon', icon)}
            />

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
        label="Transaction Date"
        placeholder="Select a date"
        type={"date"}
      />
      <div className=" flex items-center justify-center mt-6">
        <button type="submit" className="add-btn add-btn-fill" >Add Income</button>
      </div>
    </form>
  )
}

export default AddIncomeForm
