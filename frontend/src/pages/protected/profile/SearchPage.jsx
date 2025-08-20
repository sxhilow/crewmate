import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { SearchUser } from '../../../components'

const SearchPage = () => {
  const { isMobile } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isMobile) {
      navigate('/projects')
    }
  }, [isMobile, navigate])

  return isMobile ? <SearchUser /> : null
}

export default SearchPage
