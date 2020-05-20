import React, { Component } from "react";

class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  //用arrow function 可以不用bind this
  changeHandler = (e) => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.course.title);
  };

  render() {
    return (
      <div>
        <h1>Courses Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.changeHandler}
            value={this.state.course.title}
          />
          <button type="submit">Add course</button>
        </form>
      </div>
    );
  }
}

export default CoursesPage;
