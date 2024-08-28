
const holidays=[{"date":"01-01-2024","tittle":"New Years Day"},
  {"date":"15-01-2024","tittle":"Pongal"},
  {"date":"16-01-2024","tittle":"Thiruvalluvar Day"},
  {"date":"17-01-2024","tittle":"Uzhavar Thirunal"},
  {"date":"25-01-2024","tittle":"Thai Poosam"},
  {"date":"26-01-2024","tittle":"Republic Day"},
  {"date":"29-03-2024","tittle":"Good Friday"},
  {"date":"01-04-2024","tittle":"Annual closing of Accounts for Commercial Banks and Co-operative Banks"},
  {"date":"09-04-2024","tittle":"Telugu New Year Day"},
  {"date":"11-04-2024","tittle":"Ramzan (Idul Fitr)"},
  {"date":"14-04-2024","tittle":"Tamil New Years Day and Dr.B.R.Ambedkars Birthday"},
  {"date":"21-04-2024","tittle":"Mahaveer Jayanthi"},
  {"date":"01-05-2024","tittle":"May Day"},
  {"date":"17-06-2024","tittle":"Bakrid(Idul Azha)"},
  {"date":"17-07-2024","tittle":"Muharram"},
  {"date":"15-08-2024","tittle":"Independence Day"},
  {"date":"26-08-2024","tittle":"Krishna Jayanthi"},
  {"date":"07-09-2024","tittle":"Vinayakar Chathurthi"},
  {"date":"16-09-2024","tittle":"Milad-un-Nabi"},
  {"date":"02-10-2024","tittle":"Gandhi Jayanthi"},
  {"date":"11-10-2024","tittle":"Ayutha Pooja"},
  {"date":"12-10-2024","tittle":"Vijaya Dasami"},
  {"date":"31-10-2024","tittle":"Deepavali"},
  {"date":"25-12-2024","tittle":"Christmas"}]



const month_year = document.querySelector("#month-year")
const calender = document.querySelector("#calender")
const btnleft = document.querySelector("#btnleft")
const btnright = document.querySelector("#btnright")
const modal = document.querySelector("#modal")
const text = document.querySelector("#text")
const inputdata = document.querySelector("#inputdata")
const btndelete = document.querySelector("#btndelete")
const btnsave = document.querySelector("#btnsave")
const btnclose = document.querySelectorAll(".btnclose")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let local = localStorage.getItem("events")?JSON.parse( localStorage.getItem("events")):[]
let index = 0
let touched = null


modal.addEventListener("click",()=>{
  modal.style.display="none"
})
function uploadpage(){
   const date = new Date()
   
   if(index != 0){
    date.setMonth(new Date().getMonth() + index)
  }
   const day = date.getDate()
   const month = date.getMonth()
   const year = date.getFullYear()
   const engmonth = date.toLocaleDateString("en-us",{month:"long"})
   month_year.innerText = `${engmonth} ${year}`
  
   calender.innerHTML=""
   const daysofmonth = new Date(year,month+1,0).getDate()
   const whatday = new Date(year,month,1)
   const firstday = whatday.toLocaleDateString("en-us",{
    weekday:"long",
    day:"numeric",
    month:"numeric",
    year:"numeric"
   })
   const splited = firstday.split(",")[0]
   const spaceday = weekdays.indexOf(splited)
   
   for(let i=1;i<=daysofmonth+spaceday;i++){
    const div = document.createElement("div")
    div.classList.add("day")
    const dateval = i-spaceday<10?"0"+(i-spaceday):i-spaceday
    const monthval = month+1<10?"0"+(month+1):month+1
    const finddate = `${dateval}-${monthval}-${year}`
   
     if(i>spaceday){
      div.innerHTML = i-spaceday
      calender.append(div)
      const eventday = local.find((e)=>e.date==finddate)
      const leavedays = holidays.find((e)=>e.date==finddate)
      if(eventday){
        const div0 = document.createElement("div")
        div0.classList.add("event")
        div0.innerText = eventday.tittle
        div.appendChild(div0)
        div0.style.display="block"
      }
      if(leavedays){
        const div1=document.createElement("div")
        div1.classList.add("holiday")
        div1.innerText=leavedays.tittle
        div.appendChild(div1)
        div1.style.display="block"
      }
      div.addEventListener("click",()=>{
        openmodal(finddate)
      })
      if(i-spaceday==day && index==0){
        div.id="current-day"
      }  
      }
     
    else{
      div.innerHTML = ""
      div.classList.add("plain")
      calender.append(div)
    }
    
   }
}


function buttons(){
  btnleft.addEventListener("click",()=>{
    index--
    uploadpage()
  })
  btnright.addEventListener("click",()=>{
    index++
    uploadpage()
  })

  btnclose.forEach((btn)=>btn.addEventListener("click",()=>{
    addevent.style.display="none"
    viewevent.style.display="none"
    modal.style.display="none"
  }))

  
}

buttons()
uploadpage()

const viewevent = document.querySelector("#viewevent")
const addevent = document.querySelector("#addevent")

function openmodal(date){
  touched = date
  const eventday = local.find((e)=>e.date==touched)
  if(eventday){
    viewevent.style.display="block"
    text.innerText=eventday.tittle
  }
  else{
    addevent.style.display="block"
    
  }
  btndelete.addEventListener("click",()=>{
    local = local.filter((e)=>e.date!=touched)
    localStorage.setItem("events",JSON.stringify(local))
    viewevent.style.display="none"
    modal.style.display="none"
    uploadpage()
  })
  btnsave.addEventListener("click",()=>{
    
   if(inputdata.value){
     const updated = {
      "date":touched,
      "tittle":inputdata.value
     }
     inputdata.value=""
     local.push(updated)
     localStorage.setItem("events",JSON.stringify(local))
     addevent.style.display="none"
     modal.style.display="none"
     uploadpage()
     touched=null
   }
   else{

   }
  })
  modal.style.display="block"
}
