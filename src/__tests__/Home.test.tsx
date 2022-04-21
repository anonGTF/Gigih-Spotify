import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../utils/test-utils'
import dummy from '../utils/dummy';
import 'jest-canvas-mock';
import '@testing-library/jest-dom'
import Home from "../pages/Home"

const server = setupServer(
    rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
        return res(ctx.json(dummy))
    }),
)
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('call api should return list of Song', async () => { 
    render(<Home />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Tulus' } })
    fireEvent.submit(screen.getByRole('textbox'))

    await waitFor(() => screen.getAllByText('Tulus'))

    expect(screen.getAllByText('Tulus')).toHaveLength(5)
 })