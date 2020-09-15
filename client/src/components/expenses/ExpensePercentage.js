import React, {Fragment} from 'react'



const ExpensePercentage = ({expense, sumAmount}) => {
    const { expensesName, amount} = expense
    const percent = ( (parseInt(amount) / sumAmount) * 100 ).toFixed();

    return (
      <Fragment>
            <h6>{expensesName && expensesName.toUpperCase()}</h6>
            <div className="bar">
                <div className="progress" style={{width: `${percent}%`}}>
                    {percent + '%'}
                </div>
            </div>
        </Fragment>
    )
}

export default ExpensePercentage
