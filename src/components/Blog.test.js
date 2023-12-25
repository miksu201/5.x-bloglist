import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './Blogform'

describe('render <Blog />', () => {

  const blog = {
    title: "Testing front end",
    likes: 0,
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  const usert = {
    name: "Fan of michael",
  }

  test(',test title', async() => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={mockHandler} user={usert} deleteBlog={mockHandler} />)
    
    const element = screen.getByText('Testing front end Michael Chan')
    expect(element).toBeDefined()
  })

  test(',test likes & and url after click', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={mockHandler} user={usert} deleteBlog={mockHandler} />)
    const user = userEvent.setup()

    const button = screen.getByTestId('reveal-button')
    await user.click(button)

    const likes = screen.getByText('likes 0')
    const url = screen.getByText('https://reactpatterns.com/')
    const name = screen.getByText('Fan of michael')
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
    expect(name).toBeDefined()
  })

  test(',test & count button clicks on like button', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={mockHandler} user={usert} deleteBlog={mockHandler} />)
    const user = userEvent.setup()
    
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('render <BlogForm />', () => {
  test(', test on filling the form and submit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)
    

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'testing a title form...')
    await user.type(inputs[1], 'testing a author form...')
    await user.type(inputs[2], 'testing a url form...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    
    expect(createBlog.mock.calls[0][0].title).toBe('testing a title form...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a author form...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a url form...')
  })
})