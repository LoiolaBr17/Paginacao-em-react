import './App.css';
import {useEffect,useState} from 'react'

function App(){

    const [itens, setItens] = useState([])
    const [itemPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(itens.length / itemPerPage)
    const startIndex = currentPage * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentItens = itens.slice(startIndex, endIndex)

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => data)

        setItens(result)
      }
      fetchData()
    }, [])

    return (
        <div className="App">

          {currentItens.map(item => {
            return <div className='item'><span>{item.id}</span><span>{item.title}</span><span>{item.completed}</span></div>
          })}

          <div>
            {Array.from(Array(pages), (item, index) => {
              return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index}</button>
            })}
          </div>


        </div>
    );
}

export default App;
