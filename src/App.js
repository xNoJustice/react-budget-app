import React, { useState } from 'react'
import { useBudgets } from './contexts/BudgetsContext'
import BudgetCard from './components/BudgetCard'
import TotalCard from './components/TotalCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import ViewExpensesModal from './components/ViewExpensesModal'
import logo from './logo.svg'
import './logo.css'

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showExpensesModal, setExpensesModal] = useState(false)
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState('')
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState('')
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true)
    setAddExpenseBudgetId(budgetId)
  }

  function openExpensesModal(budgetId) {
    setExpensesModal(!showExpensesModal)
    setViewExpensesBudgetId(budgetId)
  }

  return (
    <div className="w-full h-auto min-h-screen flex justify-center items-center mx-auto p-6 text-black dark:text-white  text-2xl font-bold">
      <div>
        <img src={logo} alt="logo" className="w-32 h-32 mx-auto logo" />
        <h1 className="text-center text-2xl mb-4">Welcome to Budget App</h1>
        <div className="text-2xl font-bold flex-0 text-center">
          <button
            type="button"
            onClick={() => setShowBudgetModal(!showBudgetModal)}
            className="m-2 p-1 bg-blue-500 rounded-lg dark:text-white"
          >
            Add Budget
          </button>
          <button
            type="button"
            onClick={() => openAddExpenseModal()}
            className="m-2 p-1 bg-green-500 rounded-lg dark:text-white"
          >
            Add Expense
          </button>
        </div>
        <div className="grid gap-4 grid-cols-3">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + parseFloat(expense.amount),
              0,
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
                onAddExpense={() => openAddExpenseModal(budget.id)}
                onViewExpenses={() => openExpensesModal(budget.id)}
              />
            )
          })}
        </div>
        <TotalCard />
        <AddBudgetModal
          show={showBudgetModal}
          handleClose={() => setShowBudgetModal(false)}
        />
        <AddExpenseModal
          show={showExpenseModal}
          budgetId={addExpenseBudgetId}
          handleClose={() => setShowExpenseModal(false)}
        />
        <ViewExpensesModal
          show={showExpensesModal}
          budgetId={viewExpensesBudgetId}
          handleClose={() => openExpensesModal()}
        />
      </div>
    </div>
  )
}

export default App
