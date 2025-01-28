import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const AllSkillPage = () => {
  const { token } = useContext(SessionContext)

  const [skills, setSkill] = useState([])

  const fetchAllSkill = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
      if (response.ok) {
        const skillsData = await response.json()
        setSkill(skillsData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllSkill()
  }, [])

  const handleDelete = async currentSkillId => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/${currentSkillId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 204) {
        fetchAllSkill()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>All skills</h1>
      <ul>
        {skills.map(currentSkill => (
          <li key={currentSkill._id}>
            <p>{currentSkill.title}</p>
            <button type='button' onClick={() => handleDelete(currentSkill._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllSkillsPage