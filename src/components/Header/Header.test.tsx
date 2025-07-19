import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'

const defaultProps = {
  searchTerm: '',
  handleSearchChange: () => {},
  setSearchTerm: () => {},
  handleSearchButton: () => {},
  onHintClick: () => {},
}

describe('Header Component', () => {
  test('should render without crashing', () => {
    render(<Header {...defaultProps} />)

    expect(screen.getByText('AU Business Finder')).toBeInTheDocument()
    expect(
      screen.getByText('Australian Companies Register'),
    ).toBeInTheDocument()
  })

  test('should render navigation menu', () => {
    render(<Header {...defaultProps} />)

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('should have proper semantic structure', () => {
    render(<Header {...defaultProps} />)
    const headerElement = screen.getByRole('banner')

    expect(headerElement).toBeInTheDocument()
  })
})
