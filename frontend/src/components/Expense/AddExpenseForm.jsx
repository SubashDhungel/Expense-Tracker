import React from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = React.useState({
        category:'',
        amount:'',
        date:'',
        icon:''
    });
  
    const handleChange = (key, value )=>setExpense((prev) => ({
        ...prev,
        [key]: value
    }));
  return (
    <form onSubmit={(e) =>{ e.preventDefault(); onAddExpense(expense)}}>

        <EmojiPickerPopup
            icon ={expense.icon}
            onSelect={(icon) => handleChange('icon', icon)}
            />

      <Input 
        vlaue={expense.category}
        onChange={({target})=>handleChange('category', target.value)}
        label="Expense Category"
        placeholder="Rent"
        type={"text"}
      />
      <Input 
        vlaue={expense.amount}
        onChange={({target})=>handleChange('amount', target.value)}
        label="Amount"
        placeholder="0.00"
        type={"number"}
      />
      <Input 
        vlaue={expense.date}
        onChange={({target})=>handleChange('date', target.value)}
        label="Transaction Date"
        placeholder="Select a date"
        type={"date"}
      />
      <div className=" flex items-center justify-center mt-6">
        <button type="submit" className="add-btn add-btn-fill" >Add Expense</button>
      </div>
    </form>
  )
}


export default AddExpenseForm
