import React, { useState, useEffect } from 'react'
import classes from './Notes.module.css'

import { notesApi } from '../../../utils/notes.api';

const NotesList = () => {
  const [todoNotes, setTodoNotes] = useState([{ _id: 1, title: '', description: '' }]);

  const setTitle = (e, _id) => {
    let todo = [...todoNotes];
    let idx = todo.findIndex(obj => obj._id == _id);
    let obj = { _id: todo[idx]._id, title: e.target.value, description: todo[idx].description };
    todo.splice(idx, 1, obj);
    setTodoNotes(todo);
  }
  const setDesc = (e, _id) => {
    let todo = [...todoNotes];
    let idx = todo.findIndex(obj => obj._id == _id);
    let obj = { _id: todo[idx]._id, title: todo[idx].title, description: e.target.value };
    todo.splice(idx, 1, obj);
    setTodoNotes(todo);
  }

  const addTodoNote = e => {
    let idx = todoNotes.length - 1;
    let title = todoNotes[idx].title;
    let description = todoNotes[idx].description;
    let isEmpty = title === '' || description === '';
    if (isEmpty) {
      return;
    }
    addData({ title, description })
  }

  const [change, setChange] = useState(false);

  let [completedNotesData, setCompletedNotesData] = useState([]);
  const [inProgress, setInProgressData] = useState([]);

  useEffect(() => {
    getData();
  }, [change]);

  const addData = async (obj) => {
    let result = await notesApi.addData(obj);
    if (result.data.isSuccess) {
      setChange(prev => !prev);
    }
  }

  const updateStatus = async (_id, status) => {
    let result = await notesApi.updateStatus(_id,status);
    if (result.data.isSuccess) {
      setChange(prev => !prev);
    }
  }

  async function getData() {
    let result = await notesApi.getNotes();
    if (result.data.isSuccess) {
      let notesData = result.data.Data;
      console.log("notesData : ", notesData);
      if (notesData == null || notesData?.notes.length === 0) {
        return;
      }
      setTodoNotes([]);
      setInProgressData([]);
      setCompletedNotesData([]);
      notesData.notes.map((note) => {
        if (note.status === 'todo') {
          setTodoNotes(prev => [...prev, note]);
        } else if (note.status === 'inprogress') {
          setInProgressData(prev => [...prev, note]);
        } else {
          setCompletedNotesData(prev => [...prev, note]);
        }
      })
      setTodoNotes(prev => [...prev, { _id: todoNotes.length, title: '', description: '' }])
    }
  }


  return (
    <>
      <div className={classes.flexbox}>
        <div className={classes.header}>
          <p className={classes.name}>HI, {localStorage.getItem('userName') ?? 'User'} <img className={classes.profile} src='profile.svg' alt='profile pic' height='45px' width='45px' /> </p>
        </div>
        <div className={classes.notesOuter}>
          <div><h1 className={classes.heading}>Projects</h1>
            <p className={classes.floatRight}><img src='filter.svg' alt='filter' /> Filter</p></div>
          <div className={classes.ProjectOuter}>
            <div className={classes.projectBox}>
              <div className={classes.boxHeader}>
                <h2 className={classes.boxHeading}>To Do</h2>
                <p className={classes.count}>{todoNotes.length - 1}</p>
              </div>
              <button className={classes.addBtn} onClick={addTodoNote}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
              </svg>
              </button>
              {todoNotes.map((todo, idx) => (
                <div
                  className={classes.card}
                  key={idx}
                >
                  <input className={classes.inputTextBold} type='text' value={todo.title} placeholder='Enter Title' onChange={e => setTitle(e, todo._id)} />
                  <input className={classes.inputText} type='text' value={todo.description} placeholder='Description' onChange={e => setDesc(e, todo._id)} />
                  {idx !== todoNotes.length - 1 && (<button className={classes.addbutton} onClick={() => updateStatus(todo._id, 'inprogress')}><img src='arrowRight.png' /></button>)}
                  {/* {idx !== todoNotes.length -1 && (<p><i onClick={() => updateStatus(todo._id,'inprogress')} class="arrowRight right"></i></p>)} */}

                </div>
              )
              )}
            </div>



            <div className={classes.projectBox}>
              <div className={classes.boxHeader}>
                <h2 className={classes.boxHeading}>In Progress</h2>
                <p className={classes.count}>{inProgress.length}</p>
              </div>
              <button className={classes.addBtn}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
              </svg>
              </button>
              {
                inProgress.map((inProgressEle, i) => (
                  <div
                    className={classes.card}
                    index={i}
                    key={i}
                  >
                    <input className={classes.inputTextBold}  readOnly value={inProgressEle.title} type='text' placeholder='Enter Your Task Name' />
                    <input className={classes.inputText} readOnly value={inProgressEle.description} type='text' placeholder='Description' />
                    <button className={classes.addbutton} onClick={() => updateStatus(inProgressEle._id, 'completed')}><img src='arrowRight.png' /> </button>
                  </div>
                ))
              }
            </div>

            <div className={classes.projectBox}>
              <div className={classes.boxHeader}>
                <h2 className={classes.boxHeading}>Completed</h2>
                <p className={classes.count}>{completedNotesData.length}</p>
              </div>
              <button className={classes.addBtn}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
              </svg>
              </button>
              {
                completedNotesData.map((inCompletedEle, i) => (
                  <div
                    className={classes.card}
                    index={i}
                    key={i}
                  >
                    <input className={classes.inputTextBold} readOnly value={inCompletedEle.title} type='text' placeholder='Enter Your Task Name' />
                    <input className={classes.inputText} readOnly value={inCompletedEle.description} type='text' placeholder='Description' />
                  </div>
                ))
              }

            </div>
          </div>
        </div>

      </div>
    </>
  )
}


export default NotesList