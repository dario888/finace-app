import React, {Fragment} from 'react'



const ExpensePercentage = ({expenseName, amount, sumAmount}) => {

    const percent = ((amount / sumAmount) * 100).toFixed();

    return (
      <Fragment>
            <h5>{expenseName.toUpperCase()}</h5>
            <div className="bar">
                <div className="progress" style={{width: `${percent}%`}}>
                    {percent + '%'}
                </div>
            </div>
        </Fragment>
    )
}

export default ExpensePercentage
