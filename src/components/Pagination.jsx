import React from 'react'

function Pagination({page,pageHandler,dynamicPage}) {
  const getPage = (current,total)=>{
      const pages = []
      if(total<=5){
        for(var i=1;i<=total;i++)
        {
          pages.push(i)
        }
      }
      else{
        if(current<3)
        {
          pages.push(1,2,3,"...",total)
        }
        else if(current>total-2)
        {
          pages.push(1,"..." ,total-2,total-1,total)
        }
        else{
          pages.push(1,"...",current-1,current,current+1,"...",total)
        }
      }
      return pages
  }
  return (
    
    <div className='mt-5 space-x-3 flex justify-center items-center'>
        {dynamicPage===1?<div></div>:<button onClick={()=>pageHandler(page-1)} disabled={page===1} className={`${page===1?"bg-red-400":"bg-red-500"} px-3 py-1 rounded-md cursor-pointer text-white`}>Prev</button>}
          {
            getPage(page,dynamicPage).map((item,index)=>{
              return(
                <span key={index}
                onClick={()=>typeof item==="number" && pageHandler(item)}
                className={`${item===page?"text-red-700 font-bold":""} cursor-pointer`} 
                > 
                  {dynamicPage===1?<div className='text-3xl'>No more Pages</div>:<div>{item}</div>}
                </span>
              )
            })
          }
           {dynamicPage===1?<div></div>:<button onClick={()=>pageHandler(page+1)} disabled={page===dynamicPage} className={`${page===dynamicPage?"bg-red-400":"bg-red-500"} px-3 py-1 rounded-md cursor-pointer text-white`}>Next</button>}
        

    </div>
  )
}

export default Pagination;