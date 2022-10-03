import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

test('should add one item when click "New" button', async () => {
  const {container} = render(<App></App>)
  expect(container.querySelectorAll('.canvas-item').length).toBe(0)
  await userEvent.click(screen.getByText('New'))
  expect(container.querySelectorAll('.canvas-item').length).toBe(1)

  const newItem = container.querySelector('.canvas-item')
  expect(newItem).toHaveStyle('width:200px');
  expect(newItem).toHaveStyle('height:200px');
  
})