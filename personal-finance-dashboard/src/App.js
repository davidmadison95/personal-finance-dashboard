import React, { useState, useEffect } from 'react';

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [goal, setGoal] = useState(1000);
  const [goalProgress, setGoalProgress] = useState(0);

  useEffect(() => {
    const incomeTotal = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expenseTotal = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    setIncome(incomeTotal);
    setExpenses(expenseTotal);
    setGoalProgress(((incomeTotal - expenseTotal) / goal) * 100);
  }, [transactions, goal]);

  const addTransaction = (e) => {
    e.preventDefault();
    const { description, amount, type } = e.target.elements;
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        description: description.value,
        amount: parseFloat(amount.value),
        type: type.value,
      },
    ]);
    e.target.reset();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Personal Finance Dashboard</h1>

      <form onSubmit={addTransaction}>
        <input name="description" placeholder="Description" required />
        <input name="amount" type="number" step="0.01" placeholder="Amount" required />
        <select name="type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Summary</h2>
      <p>Total Income: ${income.toFixed(2)}</p>
      <p>Total Expenses: ${expenses.toFixed(2)}</p>
      <p>Balance: ${(income - expenses).toFixed(2)}</p>

      <h3>Savings Goal</h3>
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(parseFloat(e.target.value))}
      />
      <p>Goal Progress: {goalProgress.toFixed(2)}%</p>

      <h2>Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.description} - ${t.amount.toFixed(2)} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceDashboard;
