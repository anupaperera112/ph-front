import { Nav, Feed } from '../components'
import { AboutUs, ContactUs, HowToUse } from '../sections'
const UserPage = () => {
  return (
      <div>
          <div className='main'>
              <div className='gradient' />
          </div>
          <div className='app'>
              <Nav />
              <Feed />
              <HowToUse />
              <AboutUs />
              <ContactUs />
          </div>
      </div>
  )
}

export default UserPage
