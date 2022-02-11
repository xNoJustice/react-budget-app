import React from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function TotalCard() {
  const { budgets, expenses } = useBudgets()
  const amount = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0,
  )
  const max = budgets.reduce(
    (total, budget) => total + parseFloat(budget.max),
    0,
  )
  if (max > 0) {
    return (
      <div className="w-1/3 m-auto mt-4">
        <BudgetCard
          key="total"
          name="Total"
          max={max}
          amount={amount}
          onAddExpense={() => {}}
          onViewExpenses={() => {}}
          hideButtons={false}
        />
      </div>
    )
  }
  return ''
}
