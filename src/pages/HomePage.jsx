import { Nav } from "../components"
import { useState } from "react"
const HomePage = () => {
  // const [user, setUser] = useState({ name: "", email: "" });
  return (
    <div className="w-full">
      <Nav/>
      <h1 className="text-4xl text-center">Wellcome, Jayasuriya Pharmacy</h1>
    </div>
  )
}

export default HomePage
