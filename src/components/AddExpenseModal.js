import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useBudgets } from '../contexts/BudgetsContext'

export default function AddExpenseModal({ show, budgetId, handleClose }) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef(budgetId)
  const { addExpense, budgets } = useBudgets()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !descriptionRef.current.value.trim() ||
      !amountRef.current.value.trim() ||
      !budgetIdRef.current.value.trim()
    )
      return

    addExpense({
      description: descriptionRef.current.value.trim(),
      amount: amountRef.current.value.trim(),
      budgetId: budgetIdRef.current.value.trim(),
    })

    descriptionRef.current.value = ''
    amountRef.current.value = ''
    budgetIdRef.current.value = ''
    handleClose()
  }

  return (
    <div className={show ? 'block' : 'hidden'}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-1/3 mx-auto my-6">
          <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
              <h3 className="text-xl font-semibold text-center dark:text-gray-200">
                New Expense
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
                <label
                  htmlFor="description"
                  className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description ..."
                  className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  ref={descriptionRef}
                  autoComplete="true"
                  required
                />
              </div>
            </div>
            <div className="relative flex-auto p-4">
              <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                <label
                  htmlFor="amount"
                  className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  min={0}
                  step={0.1}
                  ref={amountRef}
                  required
                />
              </div>
            </div>
            <div className="relative flex-auto p-4">
              <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-200">
                <label
                  className="block font-medium leading-relaxed tracking-tighter text-gray-700 text-md dark:text-gray-100"
                  htmlFor="budgets"
                >
                  Budget
                </label>
                <select
                  name="budgets"
                  id="budgets"
                  ref={budgetIdRef}
                  className="px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg w-96 focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                  required
                >
                  {budgets.map((budget) => (
                    <option value={budget.id} key={budget.id}>
                      {budget.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-end p-4 border-t border-gray-300 border-solid rounded-b">
                <button
                  className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  )
}

AddExpenseModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  budgetId: PropTypes.string,
}
