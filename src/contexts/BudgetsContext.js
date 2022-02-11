import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', [])
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId)
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: uuidv4(), description, amount, budgetId },
    ])
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets
      }

      return [...prevBudgets, { id: uuidv4(), name, max }]
    })
  }

  function deleteBudget({ id }) {
    const newExpenses = expenses.filter((expense) => expense.budgetId !== id)
    const newBudgets = budgets.filter((budget) => budget.id !== id)

    setExpenses(newExpenses)
    setBudgets(newBudgets)
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    )
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}

BudgetsProvider.propTypes = {
  children: PropTypes.element,
}
