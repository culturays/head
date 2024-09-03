const Pagination = ({postPerPage,totalTxts, totalImgs, paginating }) => {
    const pageNumbers =[]
    for(let i = 1 ; i <= Math.ceil(totalImgs / postPerPage); i++){
        pageNumbers.push( i )
        
    } 
     
   
  return (
    <div>
        <nav>
            <ul> 
              {pageNumbers.map(number=>(           
       <a onClick={()=> paginating(number)} key={number}></a>
            )) } 
            </ul>
        </nav>
    
 
    </div>
  )
}

export default Pagination