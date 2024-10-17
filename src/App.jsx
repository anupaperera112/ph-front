import { Nav, Feed } from './components'
import { AboutUs, ContactUs, HowToUse } from './sections'

function App() {
  return (
    <>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className='app'>
        <Nav />
        <Feed />
        <HowToUse/>
        <AboutUs/>
        <ContactUs/>
      </div>
    </>
  )
}

export default App
