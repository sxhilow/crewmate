import React from 'react'
import Button from '../atoms/Button'
import { Link } from 'react-router-dom'

const NotificationCard = ({ 
  type, 
  projectId, 
  username, 
  projectname, 
  created_at, 
  response, 
  requestId, 
  btnLoading,
  request_status 
}) => {

  const renderContent = () => {
    switch (type) {
      case "join_request":       
        
        {
          switch (request_status) {
            case "pending":
              return(
                <>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-medium text-neutral-13'>
                      <Link to={`/user/${username}`} className='text-primary-blue text-desktop-h5 hover:underline'>
                        {username}
                      </Link>
                      {" "}requested to join your project "{projectname}"
                    </span>
                    <span className='text-xs text-neutral-7'>{created_at}</span>
                  </div>

                  <div className='flex justify-end items-center gap-3 mt-3'>
                    <Button
                      className='min-w-20 border-2 p-2 rounded-lg border-primary-blue text-neutral-13 font hover:bg-green-50 transition duration-200'
                      onClick={() => response(projectId, { id: requestId, decision: 'accepted' })}
                    >
                      {btnLoading === 'accepted' ? "Accepting" : "Accept"}
                    </Button>

                    <Button
                      className='min-w-20 border-2 p-2 rounded-lg border-red-500 text-neutral-13 font-medium hover:bg-red-50 transition duration-200'
                      onClick={() => response(projectId, { id: requestId, decision: 'rejected' })}
                    >
                      {btnLoading === 'rejected' ? "Denying" : "Deny"}
                    </Button>
                  </div>
                </>
              )
            case "accepted":
              return(
                <div className='flex justify-between items-center'>
                  <span className='text-lg font text-neutral-13'>
                    You accepted the join request of <Link to={`/user/${username}`} className='text-primary-blue hover:underline'>{username}</Link> 
                      {" "} for <span className="font-bold">{projectname}</span>  
                    
                  </span>
                  <span className='text-xs text-neutral-7'>{created_at}</span>
                </div>
              )
              case "rejected":
                return (
                  <div className='flex justify-between items-center'>
                    <span className='text-lg text-neutral-13'>
                      You rejected the join request of <Link to={`/user/${username}`} className='text-primary-blue hover:underline'>{username}</Link> 
                       {" "} for <span className="font-bold">{projectname}</span>
                    </span>
                    <span className='text-xs text-neutral-7'>{created_at}</span>
                  </div>
                )
          } 

        }      
        

      case "join_request_accepted":
        return (
          <div className='flex justify-between items-center'>
            <span className='text-lg text-neutral-13'>
              Your request to join <span className="font-bold">{projectname}</span> was 
              <span className="text-green-600 font-semibold"> accepted</span> by 
              {" "}<Link to={`/user/${username}`} className='text-primary-blue hover:underline'>{username}</Link>
            </span>
            <span className='text-xs text-neutral-7'>{created_at}</span>
          </div>
        )

      case "join_request_rejected":
        return (
          <div className='flex justify-between items-center'>
            <span className='text-lg text-neutral-13'>
              Your request to join "<span className="font-semibold">{projectname}</span>" was 
              <span className="text-red-600 font-semibold"> rejected</span> by 
              {" "}<Link to={`/user/${username}`} className='text-primary-blue hover:underline'>{username}</Link>
            </span>
            <span className='text-xs text-neutral-7'>{created_at}</span>
          </div>
        )

      case "message":
        return (
          <div className='flex justify-between items-center'>
            <span className='text-lg font text-neutral-13'>
              New message from {" "}
              <Link to={`/user/${username}`} className='text-primary-blue hover:underline'>{username}</Link> 
              {" "}in project "<span className="font-semibold">{projectname}</span>"
            </span>
            <span className='text-xs text-neutral-7'>{created_at}</span>
          </div>
        )

      default:
        return (
          <div className='flex justify-between items-center'>
            <span className='text-lg text-neutral-13'>Unknown notification type</span>
          </div>
        )
    }
  }

  return (
    <div className='border-b p-5'>
      {renderContent()}
    </div>
  )
}

export default NotificationCard
