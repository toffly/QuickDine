import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Dashboard from "./pages/Dashboard"
import BookingConfirmation from "./pages/BookingConfirmation"

const App = () => {
  return (
    <>
    <Toaster 
    position="bottom-right"
    toastOptions={{
      style: {
        background: "#1a1c1c",
        color: "#ffffff",
        fontFamily: "Manrope, san-serif",
        fontSize: "12px",
        letterSpacing: "0.02em",
        borderRadius: "4px",
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }
    }}
    />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/booking/:slug" element={<BookingConfirmation/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App