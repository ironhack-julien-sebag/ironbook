import React, { useState } from "react"
import "./App.css"

import LinkedinLogo from "./linkedin-logo.svg"

import users from "./users.json"

const cities = ["Berlin", "Lisbon", "Paris"]

function App() {
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [city, setCity] = useState("")
    
    const [foundUsers, setFoundUsers] = useState(users)

    const filter = e => {
        const keyword = e.target.value

        if (keyword !== "") {
            const results = users.filter(user => {
                return (
                    user.firstName
                        .toLowerCase()
                        .startsWith(keyword.toLowerCase()) ||
                    user.lastName
                        .toLowerCase()
                        .startsWith(keyword.toLowerCase())
                )
            })

            setFoundUsers(results)
        } else {
            setFoundUsers(users)
        }

        setName(keyword)
    }

    const filterRoles = e => {
        const checked = e.target.checked

        if (checked === true) {
            const filteredResults = users.filter(user => {
                return user.role.toLowerCase() === e.target.value
            })

            setFoundUsers(filteredResults)
        } else {
            setFoundUsers(users)
        }
    }

    const filterCity = e => {
        const campus = e.target.value

        if (campus !== "") {
            const filteredCampuses = users.filter(user => {
                return user.campus.toLowerCase() === e.target.value
            })

            setFoundUsers(filteredCampuses)
        } else {
            setFoundUsers(users)
        }
    }

    return (
        <div className="container">
            <h1>Ironbooks</h1>

            <div className="form">
                <input
                    type="search"
                    value={name}
                    onChange={filter}
                    placeholder="Search by name"
                />

                <div className="checkboxes">
                    <div className="item">
                        <label htmlFor="student">Student</label>
                        <input
                            type="checkbox"
                            name="role"
                            id="student"
                            value="student"
                            onChange={filterRoles}
                        />
                    </div>

                    <div className="item">
                        <label htmlFor="teacher">Teacher</label>
                        <input
                            type="checkbox"
                            name="role"
                            id="teacher"
                            value="teacher"
                            onChange={filterRoles}
                        />
                    </div>

                    <select onChange={filterCity}>
                        <option value="">All cities</option>

                        {cities.map(city => (
                            <option
                                value={city.toLowerCase()}
                                key={city.toLowerCase()}
                            >
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <td>First name</td>
                        <td>Last name</td>
                        <td>Campus</td>
                        <td>Role</td>
                        <td>Links</td>
                    </tr>
                </thead>

                <tbody>
                    {foundUsers && foundUsers.length > 0
                        ? foundUsers.map(user => (
                              <tr key={`${user.firstName}${user.lastName}`}>
                                  <td>{user.firstName}</td>
                                  <td>{user.lastName}</td>
                                  <td>{user.campus}</td>
                                  <td>
                                      {user.role.slice(0, 1).toUpperCase() +
                                          user.role.slice(1)}
                                  </td>
                                  <td>
                                      {user.linkedin && (
                                          <a
                                              href={user.linkedin}
                                              target="_blank"
                                              rel="noreferrer noopener"
                                          >
                                              <img
                                                  src={LinkedinLogo}
                                                  alt="Logo Linkedin"
                                                  className="linkedin"
                                              />
                                          </a>
                                      )}
                                  </td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
        </div>
    )
}

export default App
