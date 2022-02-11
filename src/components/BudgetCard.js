import React from 'react'
import PropTypes from 'prop-types'

export default function BudgetCard({
  name,
  max,
  amount,
  onAddExpense,
  onViewExpenses,
  hideButtons = true,
}) {
  return (
    <div
      className={`${
        amount > (max * 75) / 100
          ? 'bg-red-200 text-gray-800'
          : 'bg-gray-200 text-gray-800'
      } p-6 rounded-lg w-full h-auto`}
    >
      <h1 className="ml-2 text-2x flex justify-between">
        {name}
        <span className="">
          $ {amount.toLocaleString('en-GB').replace(/,/g, '.')}
          {max && (
            <span className="text-gray-400 text-lg">
              / ${max.toLocaleString('en-GB').replace(/,/g, '.')}
            </span>
          )}
        </span>
      </h1>
      {max && (
        <div className="h-5 w-full bg-gray-200 rounded-full ml-3 my-6">
          <div
            className="h-full rounded-full text-right"
            style={{
              width: `${
                parseInt((amount / max) * 100, 10) > 100
                  ? '100'
                  : parseInt((amount / max) * 100, 10)
              }%`,
              backgroundColor:
                parseInt((amount / max) * 100, 10) > 75
                  ? '#ef4444 '
                  : '#f59e0b',
            }}
          ></div>
        </div>
      )}
      {hideButtons && (
        <div>
          <button
            type="button"
            className="m-2 p-1.5 border-2 border-transparent bg-blue-500 text-white"
            onClick={onAddExpense}
          >
            Add Expense
          </button>
          <button
            type="button"
            className="m-2 p-1.5 border-2 border-transparent bg-green-500 text-white"
            onClick={onViewExpenses}
          >
            View Expenses
          </button>
        </div>
      )}
    </div>
  )
}

BudgetCard.propTypes = {
  name: PropTypes.string,
  max: PropTypes.number,
  amount: PropTypes.number,
  onAddExpense: PropTypes.func,
  onViewExpenses: PropTypes.func,
  hideButtons: PropTypes.bool,
}
