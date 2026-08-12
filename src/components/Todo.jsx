import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Todo({data, checkUpdate, deleteTodo, updateTodo}) {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [mode, setMode] = useState('read');
  const [title, setTitle] = useState(data.title);

  const handleCheck = ()=>{
    let value = !isChecked;
    console.log(value);
    setIsChecked(value);
    checkUpdate(data.id, value);
  }
  const handleDelete = ()=>{
    deleteTodo(data.id);
  }
  const changeModeToEdit = ()=>{
    setMode('edit');
  }
  const changeModeToRead = ()=>{
    setMode('read');
  }
  const changeTitle = (e)=>{
    setTitle(e.target.value);
  }
  const todoUpdate = (e)=>{
    e.preventDefault();
    updateTodo(data.id, title);
    setMode('read');
  }
  return (
    <div className='d-flex justify-content-between align-items-center'>
      {
        mode === 'edit' ? 
        <Form className='d-flex gap-1 align-items-center' onSubmit={todoUpdate}>
          <Form.Group controlId="todo">            
            <Form.Control type="text" name="todo" value={title} onChange={changeTitle} />
          </Form.Group>
          <Button type="submit" variant="primary" size="sm">입력</Button>
          <Button type="button" variant="secondary" size="sm" onClick={changeModeToRead}>최소</Button>
        </Form>
        
        : <><Form.Check // prettier-ignore
          type="checkbox"
          checked={isChecked}
          className={isChecked ? 'active':''}
          id={`todo-${data.id}`}
          label={data.title}
          onChange={handleCheck}
        />
        <div className='d-flex gap-1'>
          <Button variant="secondary" size="sm" onClick={changeModeToEdit}>수정</Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button>
        </div>
      </>
      }
      
    </div>    
  )
}
export default Todo;
