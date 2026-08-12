import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Todo from './components/Todo';

function App() {
  const [todo, setTodo] = useState([
    {id:1, title:'learn web', checked:false},
    {id:2, title:'get a job', checked:false}        
  ])
  const checkUpdate = (id,value)=>{    
    /*
    console.log(id,value);
    let cloneTodo = [...todo];
    let idx = cloneTodo.findIndex(t=>t.id === id);
    cloneTodo[idx] = {...cloneTodo[idx], checked:value }
    setTodo(cloneTodo);
    */
    setTodo(prev=>prev.map(t=>t.id === id ? {...t, checked:value}: t));
  }
  const addTodo = (value)=>{
    setTodo(prev=>[
      ...prev,
      {id:prev[prev.length-1].id+1 || 1, title:value, checked:false},
    ])
  }
  const deleteTodo = (id)=>{
    console.log(id);
    if(window.confirm('정말 삭제할까요')){
      setTodo(prev=>prev.filter(item=>item.id !== id));
    } else{
      alert('최소되었습니다.');
    }
  }
  const updateTodo = (id,value)=>{
    console.log(id,value);
    setTodo(prev=>prev.map(t=>t.id === id ? {...t, title:value}: t));
  }
  const todos = todo.map(item=>(
    <Todo 
      data={item} 
      key={item.id} 
      checkUpdate={checkUpdate}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
    />
  ))  
  return (
    <div className='container'>
      <h1>Todo List</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        let value = e.target.todo.value.trim();
        value && addTodo(value); 
        e.target.reset();
             
      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할일 입력</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할일을 입력하세요" />
        </Form.Group>
        <Button type="submit" variant="primary">입력</Button>
      </Form>
      <hr />
      <div className='d-flex flex-column gap-1'>
        {todos}      
      </div>
    </div>
  )
}

export default App
