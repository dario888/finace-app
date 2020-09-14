import React, {Fragment} from 'react'



const ExpensePercentage = ({expense, sumAmount}) => {
    const { expenseName,amount} = expense
    const percent = ( (parseInt(amount) / sumAmount) * 100 ).toFixed();

    return (
      <Fragment>
            <h5>{expenseName && expenseName.toUpperCase()}</h5>
            <div className="bar">
                <div className="progress" style={{width: `${percent}%`}}>
                    {percent + '%'}
                </div>
            </div>
        </Fragment>
    )
}

export default ExpensePercentage
