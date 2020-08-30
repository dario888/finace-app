import React, {FC, Fragment} from 'react'


type BudgetT ={
    key: string,
    expenseName: string,
    amount: number
    sumAmount: number
}

const ExpensePercentage: FC<BudgetT> = ({expenseName, amount, sumAmount}) => {

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
