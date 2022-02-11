import React from 'react'
import PropTypes from 'prop-types'
import { useBudgets } from '../contexts/BudgetsContext'

export default function ViewExpensesModal({ show, budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteExpense, deleteBudget } =
    useBudgets()

  const expenses = getBudgetExpenses(budgetId)
  const budget = budgets.find((b) => b.id === budgetId)

  if (!budget) {
    return ''
  }

  return (
    <div className={show ? 'block' : 'hidden'}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-1/4 mx-auto my-6">
          <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
              <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                {budget.name} Expenses
                <button
                  className="px-2 py-2 ml-2 mb-2 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => deleteBudget(budget)}
                >
                  Delete this Budget
                </button>
              </h3>
              <div className="absolute mt-1 right-4 top-4">
                <button
                  className="bg-transparent border border-transparent"
                  onClick={() => handleClose()}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-700 dark:text-white"
                    viewBox="0 0 1792 1792"
                  >
                    <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative flex-auto p-4">
              <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between">
                    <div>{expense.description}</div>
                    <div>
                      {expense.amount
                        .toLocaleString('en-GB')
                        .replace(/,/g, '.')}
                      ${' '}
                      <button
                        className="px-2 py-2 ml-2 mb-2 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => deleteExpense(expense)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  )
}

ViewExpensesModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  budgetId: PropTypes.string,
}
