import React from 'React'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

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

test('5.16', async () => {
  const user = userEvent.setup()
  const mockCreateBlog = jest.fn()
  const mockSetMessage = jest.fn()

  render(<CreateForm createBlog={mockCreateBlog} setMessage={mockSetMessage} />)

  await user.type(
    screen.getByPlaceholderText('write title content here'),
    blog.title
  )
  await user.type(
    screen.getByPlaceholderText('write author content here'),
    blog.author
  )
  await user.type(
    screen.getByPlaceholderText('write url content here'),
    blog.url
  )
  await user.click(screen.getByText('create'))

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Things I don\'t know as of 2018')
})