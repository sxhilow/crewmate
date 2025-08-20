import React, {useEffect, useState} from 'react'
import { NotificationCard } from '../../../components'
import { getAllNotifications } from '../../../controllers/notification'
import { respondToRequest } from '../../../controllers/projects'
import { formatDistanceToNow, parseISO } from 'date-fns'

const Inbox = () => {
  const [notificationData, setNotificationData] = useState([])      
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [btnLoading, setBtnLoading] = useState('')

  useEffect(() => {
    const fetchNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotificationData(res);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg);
    }finally{
      setLoading(false)
    }
  };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);

  }, [])

  const handleResponse = async (projectId, decisionData) => {
    setBtnLoading(decisionData.decision)
    try {
      await respondToRequest(projectId, decisionData)
      setNotificationData(prev => prev.filter(n => n.request_id !== decisionData.id))
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg);
    }finally{
      btnLoading(false)
    }
  }

  return (
    loading ? (
      <div className='text-desktop-h5 w-full h-screen flex justify-center items-center font-bold'>Loading...</div>
    ) : (
      <div className='w-full min-h-screen flex flex-col'>
        
          <h1 className='text-desktop-h4 font-bold p-5'>Notifications</h1>

          <div className='flex flex-col space-y-4'>
              {
                notificationData.length > 0 ? (
                  notificationData.map((notification, index) => (
                    <NotificationCard 
                    key={index} 
                    type={notification.type} 
                    username={notification.actor_username} 
                    projectname={notification.project_title} 
                    created_at={formatDistanceToNow(parseISO(notification.created_at), {addSuffix: true})}
                    response={handleResponse} 
                    requestId={notification.request_id} 
                    projectId={notification.project_id} 
                    btnLoading={btnLoading} 
                    request_status={notification.status}/>
                  ))
                ) : (
                  <div className='flex justify-center items-center'>
                    No notifications as yet
                  </div>
                )
              }
          </div>
        
      </div>
    )
  )
}

export default Inbox