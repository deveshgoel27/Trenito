import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../component/RelatedDoctors';
const Appointment = () => {

  const {docId} = useParams();
  const {doctors,currencySymbol} = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo,setDocInfo] = useState(null)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDatainfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo)
  }

  const getAvailableSlots =  async() => {
     setDocSlots([])
     console.log(docSlots)

     // getting current date
     let today = new Date()

     for(let i = 0; i<7; i++) {
       // getting dat ewith index
       let currDate = new Date(today)
       currDate.setDate(today.getDate() + i)


       // setting end time of thhe date with index
       let endTime = new Date()
       endTime.setDate(today.getDate() + i)
       endTime.setHours(21,0,0,0)

       //setting hours

       if(today.getDate() === currDate.getDate()){
          currDate.setHours(currDate.getHours() > 10 ? currDate.getHours()+1 : 10)
          currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
       } else{
        currDate.setHours(10)
        currDate.setMinutes(0)
       }

       let timeSlots = []

       while(currDate < endTime){
        let formattedTime = currDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        // add slot to array 
        timeSlots.push({
          dateTime : new Date(currDate),
          time : formattedTime
        })

        // increment current time by 30 min

        currDate.setMinutes(currDate.getMinutes() + 30  )
       }


        setDocSlots(prev => ([...prev,timeSlots]))

  }
}


  useEffect(() => {
    fetchDatainfo();
  },[doctors,docId])
  
   
  useEffect(() => {
    getAvailableSlots();
  },[docInfo])

  useEffect(()=>{
      console.log(docSlots)
  },[docSlots])

    return docInfo && (
    <div>
           {/* doctors details  */}
           <div className='flex flex-col sm:flex-row gap-4' >
            <div>
              <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
            </div>
              
              <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                {/* doc info  */}
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo?.name} 
                  <img className='w-5' src={assets.verified_icon} alt="" />
                   </p>

                   <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                    <p>{docInfo?.degree} - {docInfo.speciality}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
                   </div>
                       
                       {/* doctor about  */}
                       <div>
                        <p className='flex items-center gap-1 text-sm font-medium text
                        mt-3' >About <img src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo?.about}</p>
                       </div>

                       <p className='text-gray-500 font-medium mt-4'>
                        Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo?.fees}</span>
                       </p>
              </div>
           </div>

           {/* Booking slots   */}
           <div className=' sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
                  <p>Booking slots</p>
                  <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {
                      docSlots.length>= 0 && docSlots.map((item,index)=>{

                           const firstSlot = item.length > 0 ? item[0] : null;
                           const day = firstSlot ? daysOfWeek[firstSlot.dateTime.getDay()] : daysOfWeek[(new Date().getDay() + index) % 7];
                           const date = firstSlot ? firstSlot.dateTime.getDate() : new Date(new Date().setDate(new Date().getDate() + index)).getDate();
                        return (
                        <div 
                            onClick={()=> setSlotIndex(index)}
                             className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-400'}`} 
                             key={index}
                             > 
                          <p>{day}</p>
                          <p>{date}</p>
                        </div>
                        );
                      })
                    }
                  </div>

                  <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 ' >
                    {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                      <p onClick={()=>setSlotTime(item.time)} className={`text-sm  font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-400'}`} key={index}>
                        {item.time.toLowerCase()}
                      </p>
                    ))}
                  </div>
                  <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' >Book an appointment</button>
           </div>
           {/* listing related doctors */}
           <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}


export default Appointment