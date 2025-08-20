import React, { useEffect, useState, useRef } from 'react'
import { TeamCard } from '../../../components'
import { getAllTeams, getTeam, getTeamMessages, sendTeamMessage } from '../../../controllers/teams'
import { useOutletContext } from 'react-router-dom'

const TeamsDash = () => {
  const {isMobile} = useOutletContext()
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [teamLoading, setTeamLoading] = useState(true)
  const [teamsData, setTeamsData] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [error, setError] = useState()
  const [teamInfo, setTeamInfo] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])

  const messagesRef = useRef(null) // Ref for messages container to auto-scroll

  useEffect(() => {
    const fetchAllTeams = async () => {
      setError(null)
      try {
        const res = await getAllTeams()
        setTeamsData(res)
      } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        setError(error.response.data.msg)
      } finally {
        setLoading(false)
      }
    }

    fetchAllTeams()
  }, [])

  useEffect(() => {
    if (!selectedTeam) return

    setMessages([])    
    const fetchTeamMessages = async () => {
      try {
        const res = await getTeamMessages(selectedTeam)
        setMessages(res.messages)
      } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        setError(error.response.data.msg)
      }
    }

    fetchTeamMessages();

    const fetchTeamDetails = async () => {
      try {
        const res = await getTeam(selectedTeam)
        setTeamInfo(res)
      } catch (error) {
        console.error("Error: ", error.response?.data || error.message)
        setError(error.response.data.msg)
      } finally {
        setTeamLoading(false)
      }
    }

    fetchTeamDetails();
  }, [selectedTeam])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    setBtnLoading(true)
    try {
      const res = await sendTeamMessage(selectedTeam, newMessage)
      setMessages((prev) => [...prev, res])
      setNewMessage("")
    } catch (err) {
      console.error("Send message error", err)
    } finally {
      setBtnLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>
        Loading...
      </div>
    )
  }

  if (!isMobile) {
    return (
      <div className='w-full h-screen flex overflow-hidden'>
        <div className='flex-1 flex flex-col overflow-hidden h-full'>
          <h1 className='text-desktop-h4 font-bold p-5 flex-shrink-0'>Teams</h1>

          <div className='flex-1 overflow-y-auto'>
            {
              teamsData.map((team) => (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`cursor-pointer ${selectedTeam === team.id ? 'bg-slate-100' : ''}`}
                >
                  <TeamCard id={team.id} name={team.name} members={team.member_count} />
                </div>
              ))
            }
          </div>
        </div>
        <div className='flex-1 flex flex-col border-l border-primary-blue h-full'>
          {
            !selectedTeam ? (
              <div className='flex justify-center items-center h-full'>
                {"<-"} Select a team
              </div>
            ) : (
              teamLoading ? (
                <div className='text-desktop-h5 w-full h-full flex justify-center items-center font-bold'>
                  Loading...
                </div>
              ) : (
                <>
                  {/* Team header */}
                  <div className='p-4 border-b flex-shrink-0'>
                    <h2 className='text-lg font-bold'>{teamInfo?.name}</h2>
                    <p className='text-sm text-slate-500'>
                      Members: {teamInfo?.members?.map(m => m.name).join(", ")}
                    </p>
                  </div>

                  {/* Messages */}
                  <div ref={messagesRef} className='flex-1 p-4 overflow-y-auto'>
                    {messages.map((msg) => (
                      <div key={msg.id} className='mb-2'>
                        <span className='font-bold'>{msg.sender_name}: </span>
                        <span>{msg.content}</span>
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="p-4 bg-white border-t flex-shrink-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full rounded-lg px-3 py-2 pr-20 focus:ring-0 outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary-blue text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-white border hover:border-primary-blue hover:text-primary-blue transition duration-200"
                      >
                        {btnLoading ? "Sending" : "Send"}
                      </button>
                    </div>
                  </div>
                </>
              )
            )
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='w-full h-screen relative overflow-hidden'>
        {!selectedTeam && (
          <div className='flex flex-col h-full'>
            <h1 className='text-desktop-h4 font-bold p-5 flex-shrink-0'>Teams</h1>
            <div className='flex-1 overflow-y-auto'>
              {
                teamsData.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => setSelectedTeam(team.id)}
                    className='cursor-pointer'
                  >
                    <TeamCard id={team.id} name={team.name} members={team.member_count} />
                  </div>
                ))
              }
            </div>
          </div>
        )}
        {selectedTeam && (
          <div className='absolute top-0 left-0 w-full h-full bg-white flex flex-col overflow-hidden'>
            {teamLoading ? (
              <div className='text-desktop-h5 w-full h-full flex justify-center items-center font-bold'>
                Loading...
              </div>
            ) : (
              <>
                {/* Team header with back button */}
                <div className='p-4 border-b flex flex-col gap-2'>
                  <div>
                    <button 
                      onClick={() => setSelectedTeam(null)} 
                      className='text-primary-blue font-bold cursor-pointer text-sm'
                    >
                      ← Back
                  </button>
                  </div>
                  <div>
                    <h2 className='text-xl font-bold'>{teamInfo?.name}</h2>
                    <p className='text-sm text-slate-500'>
                      Members: {teamInfo?.members?.map(m => m.name).join(", ")}
                    </p>
                  </div>
                </div>

                <div ref={messagesRef} className='flex-1 p-4 overflow-y-auto'>
                  {messages.map((msg) => (
                    <div key={msg.id} className='mb-2'>
                      <span className='font-bold'>{msg.sender_name}: </span>
                      <span>{msg.content}</span>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-4 bg-white border-t flex-shrink-0">
                  <div className="relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full rounded-lg px-3 py-2 pr-20 focus:ring-0 outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary-blue text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-white border hover:border-primary-blue hover:text-primary-blue transition duration-200"
                    >
                      {btnLoading ? "Sending" : "Send"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default TeamsDash