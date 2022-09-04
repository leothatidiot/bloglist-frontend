import React from 'React'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  'url': 'https://127.0.0.1',
  'title': 'Things I don\'t know as of 2018',
  'author': 'Bobi',
  'user': {
    'username': 'root',
    'name': 'Superuser',
    'id': '631259158904fc8b18309857'
  },
  'likes': 2,
  'id': '631259158904fc8b18309859'
}

test('5.13 not render its url or number of likes by default', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.togglableContent')

  expect(div).toHaveTextContent('Things I don\'t know as of 2018')
  expect(div).toHaveTextContent('Bobi')
  expect(div.childElementCount).toBe(1) // not have url, likes
})

test('5.14 url and number of likes are shown after expanded', async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.fullContent')

  expect(div.childElementCount).toBe(4)
})

test('5.15 like button clicked twice, event handler called twice', async () => {
  const user = userEvent.setup()

  const mockClickLike = jest.fn()
  const mockClickRemove = jest.fn()

  render(<Blog blog={blog} clickLike={mockClickLike}  clickRemove={mockClickRemove}/>)

  const button = screen.getByText('view')
  await user.click(button) // expand

  // click like button twice
  await user.click(screen.getByText('like'))
  await user.click(screen.getByText('like'))

  expect(mockClickLike.mock.calls).toHaveLength(2)
})
