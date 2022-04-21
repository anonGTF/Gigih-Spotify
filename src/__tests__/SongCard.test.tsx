import { screen, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import SongCard from "../components/SongCard"

test('all informations are rendered', () => {
    render(<SongCard image="https://i.scdn.co/image/ab67616d00001e02b09e43acba71b02dea059ad8" title="Cantik" singer="Kahitna" duration={240000} isSelected onSelect={_ => {}}/>)
    const title = screen.getByText('Cantik')
    const singer = screen.getByText('Kahitna')
    const duration = screen.getByText('4:00')
    const image = screen.getByRole('img')
    
    expect(title).toBeInTheDocument()
    expect(singer).toBeInTheDocument()
    expect(duration).toBeInTheDocument()
    expect(image).toBeInTheDocument()
})