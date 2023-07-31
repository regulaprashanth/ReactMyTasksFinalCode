import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    task: '',
    category: tagsList[0].optionId,
    tasksList: [],
    activeTag: '',
    activeTagTasksList: [],
  }

  onChangeTaskInput = event => {
    this.setState({task: event.target.value})
  }

  onChangeTagName = event => {
    this.setState({
      category: event.target.value,
    })
  }

  onSubmitNewTask = event => {
    event.preventDefault()
    const {task, category} = this.state
    const newTask = {
      id: uniqueId(),
      taskName: task,
      tag: category,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      task: '',
      category: tagsList[0].displayText,
    }))
  }

  onClickUpdateActiveTag = event => {
    const {tasksList, activeTag} = this.state
    const currentTag =
      activeTag !== event.target.value ? event.target.value : ''
    const selectedTasks = tasksList.filter(
      eachTask => eachTask.tag === event.target.value,
    )
    this.setState({activeTagTasksList: selectedTasks, activeTag: currentTag})
  }

  renderTaskList = () => {
    const {tasksList} = this.state
    return tasksList.length === 0 ? (
      this.renderNoTask()
    ) : (
      <ul className="taskCardList">
        {tasksList.map(eachNewTask => (
          <li key={eachNewTask.optionId} className="taskCard">
            <p className="taskName">{eachNewTask.taskName}</p>
            <p className="taskCategoryBadge">{eachNewTask.tag}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderSelectedTagList = () => {
    const {activeTagTasksList} = this.state
    return activeTagTasksList === 0 ? (
      this.renderNoTask
    ) : (
      <ul className="taskCardList">
        {activeTagTasksList.map(eachSelectedTask => (
          <li key={eachSelectedTask.optionId} className="taskCard">
            <p className="taskName">{eachSelectedTask.taskName}</p>
            <p className="taskCategoryBadge">{eachSelectedTask.tag}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderNoTask = () => (
    <div className="noTasksContainer">
      <p className="noTasksParagraph">No Tasks Added Yet</p>
    </div>
  )

  render() {
    const {task, category, activeTag} = this.state
    return (
      <div className="appContainer">
        <div className="responsiveContainer">
          <form className="taskInputForm" onSubmit={this.onSubmitNewTask}>
            <h1 className="appHeading">Create a task!</h1>
            <label className="label" htmlFor="taskName">
              Task
            </label>
            <input
              className="taskInput"
              id="taskName"
              onChange={this.onChangeTaskInput}
              value={task}
              type="text"
              placeholder="Enter the task here"
            />
            <label className="label" htmlFor="taskTag">
              Tags
            </label>
            <select
              className="categoryInput"
              value={category}
              onChange={this.onChangeTagName}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button className="addTaskButton" type="submit">
              Add Task
            </button>
          </form>

          <div className="tasksDisplayContainer">
            <h1 className="tagsHeading">Tags</h1>
            <ul className="tagsListContainer">
              {tagsList.map(eachTag => (
                <li key={eachTag.optionId}>
                  <button
                    className={
                      activeTag === eachTag.optionId
                        ? 'activeTagButton'
                        : 'normalTagButton'
                    }
                    value={eachTag.optionId}
                    onClick={this.onClickUpdateActiveTag}
                    type="button"
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              ))}
            </ul>
            <h1 className="tasksCardHeading">Tasks</h1>
            {activeTag === ''
              ? this.renderTaskList()
              : this.renderSelectedTagList()}
          </div>
        </div>
      </div>
    )
  }
}
export default MyTasks
