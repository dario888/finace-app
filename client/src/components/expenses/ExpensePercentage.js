import React, {Fragment} from 'react'



const ExpensePercentage = ({expense, sumAmount}) => {
    const { expensesName, amount} = expense
    const percent =  ( (parseInt(amount) / sumAmount) * 100 ).toFixed(2);
    



    return (
      <Fragment>
            <h6>{expensesName && expensesName.toUpperCase()}</h6>
            <div className="bar">
                <div className="progress" style={{width: `${percent}%`}}>
                    <div className="percentNum">{percent + '%'}</div> 
                </div>
            </div>
        </Fragment>
    )
}

export default ExpensePercentage
