import "./notification.css";

export default function Notification({alert,setAlert}) {
    // remove alert after 4900ms
    setTimeout(()=>{
        setAlert((prev)=>prev.filter((a)=>(a.msg!==alert.msg)));
    },4900);
  return (
        <div className={`noti_toast ${alert.type ? "":"withdraw"}`} ><i className='fa-brands fa-ethereum'></i> {alert.msg}</div>
  )
}
